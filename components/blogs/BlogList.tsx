import BlogArticle from "./BlogArticle";

const BlogList = ({ title, data }: { title: string; data: any }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-1 w-full py-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium whitespace-nowrap capitalize">
          {title}
        </h1>
        <div className="w-full border-b-4 border-sky-300" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {data.map((b: any) => (
          <BlogArticle
            key={b.id}
            title={b.title}
            img={b.img}
            link={`/blog/${b.url}`}
            authorImg={b.Author?.img}
            authorName={b.Author?.name}
            updatedAt={b.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
