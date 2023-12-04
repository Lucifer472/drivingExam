import { convertDateFormat } from "@/lib/date-util";
import textSlice from "@/lib/text-util";
import Image from "next/image";
import Link from "next/link";
interface BlogCardProps {
  src: string;
  alt: string;
  title: string;
  author: string;
  date: Date;
  slug: string;
}

const BlogCard = ({ src, alt, title, author, date, slug }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="flex gap-1 py-6 border-b-2 border-gray-300 cursor-pointer w-full">
        <div className="col-span-1 max-w-fit min-w-[120px] h-[60px] sm:min-w-[150px] sm:h-[90px] relative">
          <Image src={src} fill alt={alt} style={{ objectFit: "cover" }} />
        </div>
        <div className="flex flex-col items-start gap-6 w-full">
          <h3 className="font-medium hover:underline text-xs sm:text-sm md:text-base">
            {textSlice(title, 50)}
          </h3>
          <div className="flex justify-between w-full flex-1">
            <span className="text-xs sm:text-sm md:text-base text-gray-500 font-extralight">
              {`By ${author}`}
            </span>
            <time className="text-xs sm:text-sm md:text-base text-gray-500 font-extralight">
              {convertDateFormat(date)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
