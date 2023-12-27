import getCurrentUser from "@/lib/user-util";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (user === null) {
    return NextResponse.json({ Message: "Please Login Again!", status: 401 });
  }
  const {
    title,
    url,
    keywords,
    description,
    data,
    category,
    expiredAt,
    faq,
    id,
  } = await req.json();

  const block = data.blocks;
  let img = " ";
  for (const e of block) {
    if (e.type === "image") {
      img = e.data.file.url;
      break;
    }
  }

  try {
    const blog = await db.blog.update({
      where: {
        id: id,
      },
      data: {
        title,
        url: url.replace(/\s+/g, "-"),
        author: user.username,
        img,
        keywords,
        description,
        blog: block,
        category,
        expiredAt,
        state: user.type === "user" ? "pending" : "approve",
      },
    });

    try {
      const isFaq = await db.faq.findUnique({
        where: {
          blogId: id,
        },
      });
      if (isFaq === null) {
        await db.faq.create({
          data: { blogId: id, faq: faq.blocks },
        });
      } else {
        await db.faq.update({
          where: {
            blogId: id,
          },
          data: { faq: faq.blocks },
        });
      }
    } catch (error) {
      console.log("No FAQ PROVIDED");
    }

    if (blog) {
      return NextResponse.json({
        Message: "Blog Succesfully Updated!",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      Message: "An Error has Occured!",
      data: error,
      status: 301,
    });
  }
}
