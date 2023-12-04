import { db } from "@/lib/db";
import getCurrentUser from "@/lib/user-util";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { id } = body;

  const user = await getCurrentUser();
  if (user === null || user.type !== "admin") {
    return NextResponse.json({
      Message: "You Are not Authorized!",
      status: 301,
    });
  }

  try {
    await db.blog.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      Message: "Blog has been Deleted!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      Message: `An Error Has occured: ${error}`,
      status: 400,
    });
  }
}
