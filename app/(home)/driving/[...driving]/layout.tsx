import { CardImage, description, keywords, title, url } from "@/constant";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { driving: string[] };
}): Promise<Metadata> {
  const nameCountry = params.driving[0];
  return {
    title: `${nameCountry.replace(/[-\s]/g, " ")} | ${title}`,
    description: description,
    keywords: keywords,
    metadataBase: new URL(`${url}/${nameCountry}/1`),
    alternates: {
      canonical: `${url}/${nameCountry}`,
    },
    twitter: {
      card: "summary_large_image",
      site: title,
      title: `${nameCountry} | ${title}`,
      description: description,
      images: CardImage,
    },
    openGraph: {
      type: "website",
      siteName: `${title} Empowering Students`,
      description: description,
      url: `${url}/${nameCountry}`,
      countryName: nameCountry,
      images: CardImage,
    },
  };
}

const countryPage = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default countryPage;
