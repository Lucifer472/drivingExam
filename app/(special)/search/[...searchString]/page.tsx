import NoBlog from "@/components/_components/NoBlog";
import Pagination from "@/components/_components/Pagination";
import BlogList from "@/components/blogs/BlogList";
import currentPage from "@/components/_components/CurrentPage";
import { getBlogs } from "@/lib/blog-util";

const getBlogBySearch = async (search: string, page: number) => {
  const pageSize = 12;
  const data = await getBlogs({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      title: {
        contains: search,
      },
      state: {
        not: "pending",
      },
    },
    include: {
      Author: {
        select: {
          name: true,
          img: true,
        },
      },
    },
  });
  // Calculate if there is a next-next page (isNextNextPage) by fetching one additional result and checking if it exists.
  const NextPageData = await getBlogs({
    skip: page * pageSize,
    take: 1,
    where: {
      title: {
        contains: search,
      },
      state: {
        not: "pending",
      },
    },
  });

  const NextNextPageData = await getBlogs({
    skip: (page + 1) * pageSize,
    take: 1,
    where: {
      title: {
        contains: search,
      },
      state: {
        not: "pending",
      },
    },
  });

  const isNextPage = NextPageData.length === 1;
  const isNextNextPage = NextNextPageData.length === 1;

  if (data.length === 0) return null;
  return { data, isNextPage, isNextNextPage };
};

const page = async ({ params }: { params: { searchString: string[] } }) => {
  const searchTerm = decodeURI(params.searchString[0]);
  const currentPageNumber = currentPage(decodeURI(params.searchString[1]));

  const data = await getBlogBySearch(searchTerm, currentPageNumber);

  if (data == null) return <NoBlog />;
  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container flex flex-col gap-4 py-4 bg-white">
        <BlogList title={`Result for ${searchTerm}`} data={data.data} />
        <Pagination
          currentPage={currentPageNumber}
          isNextPage={data.isNextPage}
          isSecondNextPage={data.isNextNextPage}
          pageUrl={`/search/${searchTerm}/`}
        />
      </div>
    </section>
  );
};

export default page;
