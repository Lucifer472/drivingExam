import { convertDateFormat } from "@/lib/date-util";
import textSlice from "@/lib/text-util";
import { blog } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface authorBlog extends blog {
  Author: {
    name: string;
    img: string;
  };
}

const BlogLink = ({ l }: { l: authorBlog }) => {
  return (
    <Link href={`/blog/${l.url}`} key={l.id}>
      <article className="flex gap-1 p-2 cursor-pointer">
        <div className="min-w-[120px] h-[60px] sm:min-w-[160px] sm:h-[100px] md:min-w-[220px] md:h-[140px] relative">
          <Image
            src={l.img}
            fill
            alt={textSlice(l.title, 40)}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col items-start border-b-2 border-gray-300 h-[100px] md:h-[140px] justify-between">
          <h2 className="font-semibold text-gray-700 hover:underline text-sm sm:text-base md:text-lg">
            {textSlice(l.title, 45)}
          </h2>
          <div className="w-full flex justify-between pb-2">
            <span className="text-xs sm:text-sm md:text-base font-extralight text-gray-500">
              {`By ${l.Author.name}`}
            </span>
            <time className="text-xs sm:text-sm md:text-base font-extralight text-gray-500">
              {convertDateFormat(l.updatedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogLink;
