import { title, url } from "@/constant";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await db.blog.findUnique({
    where: {
      url: params.slug,
    },
    include: {
      Author: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });

  if (data === null || data.Author === null) return {};
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: "index follow",
    metadataBase: new URL(`${url}/blog/${data.url}`),
    alternates: {
      canonical: `${url}/blog/${data.url}`,
    },
    publisher: "Truepub Media",
    icons: "/favicon.ico",
    twitter: {
      card: "summary_large_image",
      site: title,
      title: data.title,
      description: data.description,
      images: data.img,
    },
    openGraph: {
      type: "website",
      siteName: `${title} Empowering Students`,
      description: data.description,
      url: url,
      countryName: "USA",
      images: data.img,
    },
  };
}
const blogs = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-slate-100">{children}</main>;
};

export default blogs;
