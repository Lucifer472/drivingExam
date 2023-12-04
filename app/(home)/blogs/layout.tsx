import { CardImage, description, keywords, title, url } from "@/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog Page | ${title}`,
  description: description,
  keywords: keywords,
  metadataBase: new URL(`${url}/blogs/1`),
  alternates: {
    canonical: `${url}/blogs`,
  },
  twitter: {
    card: "summary_large_image",
    site: title,
    title: `blogs | ${title}`,
    description: description,
    images: CardImage,
  },
  openGraph: {
    type: "website",
    siteName: `${title} Empowering Students`,
    description: description,
    url: `${url}/college-news`,
    countryName: "USA",
    images: CardImage,
  },
};

const collegeNews = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default collegeNews;
