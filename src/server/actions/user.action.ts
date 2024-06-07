"use server";
import { db } from "../db/index";
import { user } from "../db/schema";
import { sql } from "drizzle-orm";

interface UserData {
  id?: number;
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
  id: number;
  updateData: Partial<Omit<UserData, "id">>;
}

interface DeleteParams {
  id: number;
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
    console.log(err);
  }
}

export async function updateUser(params: UpdateParams) {
  try {
    const { id, updateData } = params;
    const updatedUser = await db
      .update(user)
      .set({
        ...updateData,
        password: updateData.password ?? undefined,
      })
      .where(sql`${user.id} = ${id}`)
      .returning()
      .execute();
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(params: DeleteParams) {
  try {
    const { id } = params;
    const deletedUser = await db
      .delete(user)
      .where(sql`${user.id} = ${id}`)
      .returning()
      .execute();
    return deletedUser;
  } catch (err) {
    console.log(err);
  }
}
