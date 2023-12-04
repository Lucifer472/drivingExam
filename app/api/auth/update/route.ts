import getCurrentUser from "@/lib/user-util";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    username,
    name,
    bio,
    img,
    gender,
    dob,
    facebook,
    instagram,
    linkedin,
    twitter,
  } = body;

  const user = await getCurrentUser();

  if (user?.id !== id)
    return NextResponse.json({
      Message: "You are not authorized",
      status: 301,
    });

  const author = await db.user.update({
    where: {
      id: id,
    },
    data: {
      username,
      name,
      bio,
      img,
      gender,
      dob,
      facebook,
      instagram,
      linkedin,
      twitter,
    },
  });

  return NextResponse.json({ ...author, password: null });
}
