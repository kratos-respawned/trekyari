"use server";
import { db } from "../db/index"; // Adjust the import path as needed
import { user } from "../db/schema"; // Adjust the import path as needed
import { sql } from "drizzle-orm";

interface UserData {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string | null;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UpdateParams {
  clerkId: string;
  updateData: Partial<Omit<UserData, "clerkId">>;
}

interface DeleteParams {
  clerkId: string | undefined;
}

export async function createUser(userData: UserData) {
  try {
    const newUser = await db
      .insert(user)
      .values({
        ...userData,
        password: userData.password ?? "",
      })
      .returning()
      .execute();
    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}

export async function updateUser(params: UpdateParams) {
  try {
    const { clerkId, updateData } = params;
    const updatedUser = await db
      .update(user)
      .set({
        ...updateData,
        password: updateData.password ?? undefined,
      })
      .where(sql`${user.clerkId} = ${clerkId}`)
      .returning()
      .execute();
    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}

export async function deleteUser(params: DeleteParams) {
  try {
    const { clerkId } = params;
    const deletedUser = await db
      .delete(user)
      .where(sql`${user.clerkId} = ${clerkId}`)
      .returning()
      .execute();
    return deletedUser;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
}
