import bcrypt from "bcrypt";
import getCurrentUser from "@/lib/user-util";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    username,
    password,
    name,
    bio,
    img,
    gender,
    dob,
    type,
    facebook,
    instagram,
    linkedin,
    twitter,
  } = body;

  const user = await getCurrentUser();

  if (user?.type !== "admin")
    return NextResponse.json({
      Message: "You are not authorized",
      status: 301,
    });

  const hashedPassword = await bcrypt.hash(password, 12);

  const author = await db.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
      bio,
      img,
      gender,
      dob,
      type,
      facebook,
      instagram,
      linkedin,
      twitter,
    },
  });

  return NextResponse.json({ ...author, password: null });
}
