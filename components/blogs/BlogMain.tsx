import Link from "next/link";
import dynamic from "next/dynamic";
import { convertDateFormat } from "@/lib/date-util";
import { Separator } from "@/components/ui/separator";
import { blog } from "@prisma/client";
import Image from "next/image";

interface blogUser extends blog {
  Author: {
    name: string;
    img: string;
  };
  blog: any;
}

const BlogMain = ({ blog, link }: { blog: blogUser; link: string }) => {
  const TableContent = dynamic(
    () => import("@/components/_components/TableContent"),
    {
      ssr: false,
    }
  );

  const blogHeadings = blog.blog.filter((b: any) => b.type === "header");

  const BlogGen = dynamic(() => import("@/components/blogs/BlogGen"), {
    ssr: true,
  });

  return (
    <article className="flex flex-col w-full ">
      <div className="padding">
        <h1 className="text-xl leading-[1.2em] sm:text-3xl md:text-4xl lg:text-6xl lg:leading-[1.5em] font-bold text-left text-gray-700">
          {blog?.title}
        </h1>
      </div>
      <div className="border-y-2 border-black padding">
        <div className="flex gap-2 sm:gap-0 items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full">
              <Image
                src={blog?.Author?.img}
                alt="Author"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <Link
              href={`/author/${blog?.author}`}
              className="text-sm sm:text-md md:text-lg hover:underline"
            >
              {blog?.Author?.name}
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href={link}
              className="hover:underline capitalize hidden xss:block sm:text-sm"
            >
              {blog?.category}
            </Link>
            <Separator orientation="vertical" />
            <time
              className="text-xs sm:text-sm"
              dateTime={convertDateFormat(blog.date)}
            >
              {convertDateFormat(blog.date)}
            </time>
          </div>
        </div>
      </div>
      <TableContent headings={blogHeadings as any} />
      <BlogGen blog={blog.blog} />
    </article>
  );
};

export default BlogMain;
