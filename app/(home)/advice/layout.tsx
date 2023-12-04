import { CardImage, description, keywords, title, url } from "@/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Advice Page | ${title}`,
  description: description,
  keywords: keywords,
  metadataBase: new URL(`${url}/advice/1`),
  alternates: {
    canonical: `${url}/advice`,
  },
  twitter: {
    card: "summary_large_image",
    site: title,
    title: `Advice Page | ${title}`,
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

const careerAdvice = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default careerAdvice;
