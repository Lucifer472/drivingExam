import { blog } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogLink from "./BlogLink";
import NoBlog from "../_components/NoBlog";

interface authorBlog extends blog {
  Author: {
    name: string;
    img: string;
  };
}

type MainBlogShowcaseProps = {
  title: string;
  link: string;
  blogData: authorBlog[];
};

const MainBlogShowcase = ({ title, link, blogData }: MainBlogShowcaseProps) => {
  const leftBlog = blogData.filter((_, index) => index % 2 === 0);
  const rightBlog = blogData.filter((_, index) => index % 2 !== 0);

  if (leftBlog.length === 0) return <NoBlog />;
  if (rightBlog.length === 0) return <NoBlog />;

  return (
    <section className="bg-white w-full h-full py-2 md:py-4 lg:py-6">
      <div className="global-container w-full flex flex-col">
        <div className="py-4 w-full flex gap-2 items-center">
          <h2 className="whitespace-nowrap text-lg sm:text-xl md:text-2xl">
            {title}
          </h2>
          <div className="w-full h-[3px] bg-sky-300" />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="flex flex-col col-span-1">
            {leftBlog.map((l, index) => (
              <BlogLink l={l} key={index} />
            ))}
          </div>
          <div className="flex flex-col col-span-1">
            {rightBlog.map((l, index) => (
              <BlogLink l={l} key={index} />
            ))}
          </div>
        </div>
        <div className="py-4 w-full flex gap-2 items-center">
          <div className="w-full h-[3px] bg-sky-300 " />
          <Link
            href={`${link}/1`}
            className="whitespace-nowrap text-lg sm:text-xl md:text-2xl flex gap-1 items-center cursor-pointer hover:text-sky-500 [&>div]:hover:-rotate-90"
          >
            View More!
            <div className="relative transition-all">
              <ArrowDown />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainBlogShowcase;
