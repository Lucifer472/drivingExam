import Image from "next/image";
import Link from "next/link";
import FeaturedBlogList from "./FeaturedBlogList";
import textSlice from "@/lib/text-util";
import { blog } from "@prisma/client";
import { convertDateFormat } from "@/lib/date-util";
import NoBlog from "../_components/NoBlog";

interface blogUser extends blog {
  Author: {
    name: string;
    img: string;
  };
}

type BlogListingProps = {
  mainTitle: string;
  blogData: blogUser[];
  subTitle: string;
  reversed?: boolean;
};

const BlogListing = ({
  mainTitle,
  blogData,
  subTitle,
  reversed,
}: BlogListingProps) => {
  const FirstBlog = blogData[0];
  const mainBlogData = blogData.splice(1, 3);

  if (FirstBlog === undefined) return <NoBlog />;
  if (mainBlogData === undefined) return <NoBlog />;
  return (
    <section className="w-full h-full bg-white">
      <div className="global-container w-full flex flex-col">
        <div className="w-full flex flex-col items-start justify-start border-b-4 border-sky-300 py-2 md:py-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-700">
            {mainTitle}
          </h2>
        </div>
        {reversed && (
          <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-5 gap-4 py-4 md:py-8">
            <FeaturedBlogList
              className="col-span-2 flex flex-col w-full"
              title={subTitle}
              blogData={mainBlogData}
            />
            <div className="col-span-3 bg-slate-50 rounded-sm">
              <Link href={`/blog/${FirstBlog.url}`}>
                <article className="w-full flex flex-col cursor-pointer p-2 shadow-sm">
                  <div className="relative w-full h-[160px] md:h-[320px]">
                    <Image
                      src={FirstBlog.img}
                      fill
                      alt={textSlice(FirstBlog.title, 50)}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      loading="eager"
                    />
                  </div>
                  <div className="px-2 md:px-6 py-4 flex flex-col gap-6">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-left hover:underline">
                      {textSlice(FirstBlog.title, 80)}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {FirstBlog.description}
                    </p>
                    <span className="flex items-center gap-4 text-xs sm:text-sm md:text-base text-sky-700 font-light">
                      {`By ${FirstBlog.Author.name}`}
                      <time className="">
                        {convertDateFormat(FirstBlog.date)}
                      </time>
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          </div>
        )}
        {!reversed && (
          <div className="w-full flex flex-col lg:grid lg:grid-cols-5 gap-4 py-4 md:py-8">
            <div className="col-span-3 bg-slate-50 rounded-sm">
              <Link href={`/blog/${FirstBlog.url}`}>
                <article className="w-full flex flex-col cursor-pointer p-2 shadow-sm">
                  <div className="relative w-full h-[160px] md:h-[320px]">
                    <Image
                      src={FirstBlog.img}
                      fill
                      alt={textSlice(FirstBlog.title, 50)}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      loading="eager"
                    />
                  </div>
                  <div className="px-2 md:px-6 py-4 flex flex-col gap-6">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-left hover:underline">
                      {textSlice(FirstBlog.title, 80)}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-700">
                      {FirstBlog.description}
                    </p>
                    <span className="flex items-center gap-4 text-xs sm:text-sm md:text-base text-sky-700 font-light">
                      {`By ${FirstBlog.Author.name}`}
                      <time className="">
                        {convertDateFormat(FirstBlog.date)}
                      </time>
                    </span>
                  </div>
                </article>
              </Link>
            </div>
            <FeaturedBlogList
              className="col-span-2 flex flex-col w-full"
              title={subTitle}
              blogData={mainBlogData}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogListing;
