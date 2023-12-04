import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import textSlice from "@/lib/text-util";
import { convertDateFormat } from "@/lib/date-util";

interface BlogArticleProps {
  link: string;
  img: string | StaticImport;
  title: string;
  authorImg: string | StaticImport | undefined;
  authorName: String | null | undefined;
  updatedAt: Date;
}

const BlogArticle = ({
  link,
  img,
  title,
  authorImg,
  authorName,
  updatedAt,
}: BlogArticleProps) => {
  return (
    <Link href={link} className="py-2">
      <article className="flex flex-col items-start w-full max-w-[300px] relative p-2 [&>h2]:hover:underline hover:shadow">
        <div className="relative w-full h-[200px]">
          <Image src={img} alt="Fallback" fill style={{ objectFit: "cover" }} />
        </div>
        <h2 className="text-lg font-medium h-[60px] mt-2 mb-8">
          {textSlice(title, 60)}
        </h2>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1 items-center">
            <div className="relative w-8 h-8 rounded-full">
              <Image
                src={authorImg as string}
                alt="Author"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-sm text-sky-700">{`By ${authorName}`}</span>
          </div>
          <time className="text-sm text-sky-700">
            {convertDateFormat(updatedAt)}
          </time>
        </div>
      </article>
    </Link>
  );
};

export default BlogArticle;
