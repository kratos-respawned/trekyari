/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/server/actions/user.action";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Error occurred -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  console.log("Received payload:", payload); // Log the payload
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook event type: ${eventType}, ID: ${id}`);

  if (!id || typeof id !== "string") {
    console.error("Invalid ID received:", id);
    return new Response("Invalid ID received", { status: 400 });
  }

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, phone_numbers } =
        evt.data;
      const pgUser = await createUser({
        clerkId: id,
        firstName: first_name || "",
        lastName: last_name || "",
        email: email_addresses[0]?.email_address || "",
        phoneNumber: phone_numbers?.[0]?.phone_number || "",
        password: null,
        roleId: 1,
      });
      console.log("User created in DB:", pgUser);
      return NextResponse.json({ message: "User created", pgUser });
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, phone_numbers } =
        evt.data;
      const pgUser = await updateUser({
        clerkId: id,
        updateData: {
          firstName: first_name || "",
          lastName: last_name || "",
          email: email_addresses[0]?.email_address || "",
          phoneNumber: phone_numbers?.[0]?.phone_number || "",
        },
      });
      console.log("User updated in DB:", pgUser);
      return NextResponse.json({ message: "User updated", pgUser });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const deletedUser = await deleteUser({ clerkId: id });
      console.log("User deleted from DB:", deletedUser);
      return NextResponse.json({ message: "User deleted", deletedUser });
    }

    console.log(`Unhandled webhook event type: ${eventType}`);
    return NextResponse.json({ message: "OK" });
  } catch (err) {
    console.error(`Error processing ${eventType} event:`, err);
    return new Response(`Error processing ${eventType} event`, { status: 500 });
  }
}
