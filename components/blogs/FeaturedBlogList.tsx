import BlogCard from "./BlogCard";
import { blog } from "@prisma/client";

interface blogUser extends blog {
  Author: {
    name: string;
    img: string;
  };
}

interface FeaturedBlogListProps {
  className: string;
  title: string;
  blogData: blogUser[];
}

const FeaturedBlogList = ({
  className,
  title,
  blogData,
}: FeaturedBlogListProps) => {
  return (
    <div className={className}>
      <div className="py-2 flex flex-col items-start w-full border-b-2 border-sky-300">
        <h2 className="text-sm sm:text-base md:text-lg">{title}</h2>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {blogData.map((b) => (
          <BlogCard
            key={b.id}
            src={b.img}
            alt={b.title}
            title={b.title}
            author={b.Author.name}
            date={b.updatedAt}
            slug={b.url}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogList;
