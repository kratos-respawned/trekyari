import { adapter, googleAuthClient } from "@/auth";

export const authorize = async (
  credentials: Partial<Record<"credential", string> | unknown>
) => {
  if (!credentials || !("credential" in credentials)) {
    throw new Error("No credential provided");
  }
  if (typeof credentials.credential !== "string") {
    throw new Error("Credential is not a string");
  }
  const token = credentials!.credential;
  const ticket = await googleAuthClient.verifyIdToken({
    idToken: token,
    audience: process.env.NEXT_PUBLIC_GOOGLE_ID,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Cannot extract payload from signin token");
  }
  const {
    email,
    sub,
    given_name,
    family_name,
    email_verified,
    picture: image,
  } = payload;
  if (!email) {
    throw new Error("Email not available");
  }
  let user = await adapter.getUserByEmail!(email);
  if (!user) {
    user = await adapter.createUser!({
      name: [given_name, family_name].join(" "),
      email,
      image,
      id: sub,
      emailVerified: email_verified ? new Date() : null,
    });
  }
  let account = await adapter.getUserByAccount!({
    provider: "google",
    providerAccountId: sub,
  });
  if (!account && user) {
    await adapter.linkAccount!({
      userId: user.id,
      provider: "google",
      providerAccountId: sub,
      type: "oauth",
    });
  }
  return user;
};
