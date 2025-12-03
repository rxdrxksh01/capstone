import { db } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAuthenticatedUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await db.user.findUnique({
      where: { id: decoded.userId },
    });
  } catch (error) {
    return null;
  }
}
