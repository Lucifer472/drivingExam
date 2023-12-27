import Link from "next/link";
import dynamic from "next/dynamic";
import { category, driving, url } from "@/constant";
import { getBlog, getFaq } from "@/lib/blog-util";
import FaqSection from "@/components/blogs/FaqSection";
import getCurrentUser from "@/lib/user-util";

const page = async ({ params }: { params: { slug: string } }) => {
  const blog = await getBlog({
    where: {
      url: params.slug,
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

  const faq = await getFaq(blog.id);

  if (blog === null) {
    const NoBlog = dynamic(() => import("@/components/_components/NoBlog"), {
      ssr: true,
    });
    return <NoBlog />;
  }

  if (blog.state === "pending") {
    const user = await getCurrentUser();
    if (user === null || user.type !== "admin") return null;
  }

  const findLink = (link: string): string => {
    if (category.labels.indexOf(link) > -1) {
      const catInd = category.labels.indexOf(link);
      return `${category.links[catInd]}/1`;
    }
    const catIndex = driving.labels.indexOf(link);
    return `/driving/${driving.links[catIndex]}`;
  };

  const categoryLink = findLink(blog.category as string);

  const BlogMain = dynamic(() => import("@/components/blogs/BlogMain"), {
    ssr: true,
  });

  const RecentBlog = dynamic(
    () => import("@/components/_components/RecentBlog"),
    {
      ssr: true,
    }
  );

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: [blog.img],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: [
      {
        "@type": "Person",
        name: blog.Author.name,
        url: `${url}/author/${blog.author}`,
      },
    ],
  };

  const jsonLDBredCrum = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Homepage",
        item: url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${blog?.category}`,
        item: `${url}${categoryLink}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${blog?.title}`,
        item: `${url}/blog/${params.slug}/`,
      },
    ],
  };

  return (
    <div className="bg-white global-container w-full h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLDBredCrum) }}
      ></script>
      <div className="w-full padding border-b border-gray-300/30 flex flex-wrap items-center justify-start">
        <Link href={"/"} className="text-sm text-gray-500 underline">
          Home
        </Link>
        <span className="text-xs mx-1">/</span>
        <Link
          href={categoryLink}
          className="text-sm text-gray-500 underline capitalize"
        >
          {blog?.category}
        </Link>
        <span className="text-xs mx-1">/</span>
        <Link
          href={`/blog/${params.slug}`}
          className="text-sm text-gray-500 underline"
        >
          {blog?.title}
        </Link>
      </div>
      <BlogMain blog={blog as any} link={categoryLink} />
      {faq.length !== 0 && <FaqSection faq={faq[0].faq} />}
      <RecentBlog
        options={{
          take: 3,
          orderBy: {
            updatedAt: "desc",
          },
          where: {
            category: blog?.category,
          },
          include: {
            Author: {
              select: {
                name: true,
                img: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default page;
