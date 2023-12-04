import { CardImage, description, keywords, title, url } from "@/constant";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = params.username;
  return {
    title: `${username} | ${title}`,
    description: description,
    keywords: keywords,
    metadataBase: new URL(`${url}/author/${username}`),
    alternates: {
      canonical: `${url}/author/${username}`,
    },
    twitter: {
      card: "summary_large_image",
      site: title,
      title: `${username} | ${title}`,
      description: description,
      images: CardImage,
    },
    openGraph: {
      type: "website",
      siteName: `${title} Empowering Students`,
      description: description,
      url: `${url}/author/${username}`,
      countryName: "USA",
      images: CardImage,
    },
  };
}
const author = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default author;
