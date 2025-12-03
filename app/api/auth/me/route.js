import { db } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
