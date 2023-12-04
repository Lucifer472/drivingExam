import { description, keywords, title, url } from "@/constant";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { searchString: string };
}): Promise<Metadata> {
  return {
    title: `${params.searchString[0]} | ${title} Empowering Students`,
    description: description,
    keywords: keywords,
    robots: "index follow",
    twitter: {
      card: "summary_large_image",
      site: title,
      title: `${params.searchString[0]} | ${title} Empowering Students`,
      description: description,
      images: "/meta/images.jpg",
    },
    openGraph: {
      type: "website",
      siteName: `${title} Empowering Students`,
      description: description,
      url: url,
      countryName: "USA",
      images: "/meta/images.jpg",
    },
    metadataBase: new URL(`${url}/search/${params.searchString[0]}`),
    alternates: {
      canonical: `${url}/search/${params.searchString[0]}`,
    },
    publisher: "Truepub Media",
    icons: "/favicon.ico",
  };
}

const search = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default search;
