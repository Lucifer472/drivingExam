import { about, category, driving, url } from "@/constant";
import { getBlogs } from "@/lib/blog-util";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";

export const revalidate = 3600;

// Function and data
async function getAuthors() {
  const data = await db.user.findMany({
    take: 4,
    orderBy: {
      id: "desc",
    },
  });
  return data;
}

function countryOptions(categoryLabel: string) {
  return {
    take: 4,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      category: categoryLabel,
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
  };
}
// Main Function

export default async function Home() {
  const labels = [
    category.labels[0],
    driving.labels[1],
    driving.labels[0],
    category.labels[1],
  ];

  const combinedData = await Promise.all([
    Promise.all(labels.map((l) => getBlogs(countryOptions(l)))),
    getAuthors(),
  ]);

  const [blogData, authors] = combinedData;
  const [careerAdvice, usaBlogData, canadaBlogData, collegueNewData] = blogData;

  const BlogListing = dynamic(() => import("@/components/blogs/BlogListing"), {
    ssr: true,
  });

  const MainBlogShowcase = dynamic(
    () => import("@/components/blogs/MainBlogShowcase"),
    {
      ssr: true,
    }
  );

  const AuthorList = dynamic(
    () => import("@/components/_components/AuthorList"),
    {
      ssr: true,
    }
  );
  const Faq = dynamic(() => import("@/components/_components/Faq"), {
    ssr: false,
  });

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Homepage",
        item: url,
      },
      driving.links.map((l, index) => {
        return {
          "@type": "ListItem",
          position: index + 2,
          name: driving.labels[index],
          item: `${url}/driving/${l}`,
        };
      }),
      category.links.map((l, index) => {
        return {
          "@type": "ListItem",
          position: index + 2 + driving.links.length,
          name: category.labels[index],
          item: `${url}${l}`,
        };
      }),
      about.links.map((l, index) => {
        return {
          "@type": "ListItem",
          position: index + 2 + driving.links.length + category.labels.length,
          name: about.labels[index],
          item: `${url}${l}`,
        };
      }),
    ],
  };
  return (
    <section className="bg-slate-100 w-full h-full ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <div className="global-container flex flex-col gap-4 items-center justify-start bg-white px-4 py-2">
        <BlogListing
          mainTitle={driving.labels[1]}
          subTitle="Featured Seaction"
          blogData={usaBlogData as any}
        />
        <MainBlogShowcase
          title={category.labels[0]}
          link={category.links[0]}
          blogData={careerAdvice as any}
        />
        <BlogListing
          mainTitle={driving.labels[0]}
          subTitle="Featured Seaction"
          blogData={canadaBlogData as any}
          reversed
        />
        <MainBlogShowcase
          title={category.labels[1]}
          link={category.links[1]}
          blogData={collegueNewData as any}
        />
        <Faq />
        <div className="flex flex-col w-full border-b-4 border-sky-300 py-4">
          <h2 className="text-xl lg:text-2xl">Our Author&apos;s</h2>
        </div>
        <AuthorList authors={authors} />
      </div>
    </section>
  );
}
