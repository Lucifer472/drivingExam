import { description, keywords, title, url } from "@/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Author Page | ${title} Empowering Students`,
  description: description,
  keywords: keywords,
  robots: "index follow",
  twitter: {
    card: "summary_large_image",
    site: title,
    title: `Author Page | ${title} Empowering Students`,
    description: description,
    images: "/meta/images.jpg",
  },
  openGraph: {
    type: "website",
    siteName: `${title} Empowering Students`,
    description: description,
    url: `${url}/author`,
    countryName: "USA",
    images: "/meta/images.jpg",
  },
  metadataBase: new URL(`${url}/author`),
  publisher: "Truepub Media",
  icons: "/favicon.ico",
};

const blogs = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="bg-slate-100">{children}</main>
    </>
  );
};

export default blogs;
