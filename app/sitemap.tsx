import { about, category, driving, url } from "@/constant";
import { db } from "@/lib/db";
import { MetadataRoute } from "next";

export const revalidate = 0;
const getBlogUrl = async () => {
  const url = db.blog.findMany({
    take: 1000,
    select: {
      url: true,
    },
  });
  return url;
};

const getAuthorUrl = async () => {
  const url = db.user.findMany({
    take: 1000,
    select: {
      username: true,
    },
  });
  return url;
};

//@ts-ignore
export default async function sitemap(): MetadataRoute.Sitemap {
  const data: MetadataRoute.Sitemap = [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  for (let i = 0; i < driving.links.length; i++) {
    const drivingUrl = `${url}/driving/${driving.links[i]}`; // Assuming the URLs follow this pattern
    const sitemapEntry = {
      url: drivingUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
    //@ts-ignore
    data.push(sitemapEntry);
  }

  for (let i = 0; i < category.links.length; i++) {
    const drivingUrl = `${url}${category.links[i]}`; // Assuming the URLs follow this pattern
    const sitemapEntry = {
      url: drivingUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
    //@ts-ignore
    data.push(sitemapEntry);
  }

  for (let i = 0; i < about.links.length; i++) {
    const drivingUrl = `${url}${about.links[i]}`; // Assuming the URLs follow this pattern
    const sitemapEntry = {
      url: drivingUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
    //@ts-ignore
    data.push(sitemapEntry);
  }

  const blogUrl = await getBlogUrl();
  for (let i = 0; i < blogUrl.length; i++) {
    const drivingUrl = `${url}/blog/${blogUrl[i].url}`; // Assuming the URLs follow this pattern
    const sitemapEntry = {
      url: drivingUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
    //@ts-ignore
    data.push(sitemapEntry);
  }

  const authorUsername = await getAuthorUrl();
  for (let i = 0; i < authorUsername.length; i++) {
    const drivingUrl = `${url}/author/${authorUsername[i].username}`; // Assuming the URLs follow this pattern
    const sitemapEntry = {
      url: drivingUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
    //@ts-ignore
    data.push(sitemapEntry);
  }

  return data;
}
