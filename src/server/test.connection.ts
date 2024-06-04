"use server";

import { db } from "./db/index";
import { user } from "./db/schema";
import { eq } from "drizzle-orm";

export async function testConnection() {
  try {
    // Insert a dummy user
    const newUser = await db
      .insert(user)
      .values({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        roleId: 1, // Optional as it defaults to 1
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning(); // Make sure to return the inserted row

    console.log("New user created:", newUser);

    // Fetch the user to confirm insertion
    const users = await db
      .select()
      .from(user)
      .where(eq(user.email, "john.doe@example.com"));
    console.log("Fetched user:", users);
    return { success: "true" };
  } catch (error) {
    console.error("Error:", error);
  }
}
