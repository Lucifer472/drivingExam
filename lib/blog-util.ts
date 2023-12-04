import { blogs } from "@/types";
import { db } from "./db";
import { faq } from "@prisma/client";

export const getBlog = async (options: any) => {
  const data = await db.blog.findUnique(options);

  return data as blogs;
};

export const getBlogs = async (options: any) => {
  const data = await db.blog.findMany(options);

  return data as blogs[];
};

export const getFaq = async (blogId: number) => {
  const data = await db.faq.findMany({
    where: {
      blogId: blogId,
    },
  });
  return data as faq[];
};

export const getEditBlogs = async (options: any) => {
  const data = await db.blog.findMany(options);
  return data;
};
