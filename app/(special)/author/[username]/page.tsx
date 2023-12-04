import Image from "next/image";
import RecentBlog from "@/components/_components/RecentBlog";
import getAuthor from "@/lib/author-util";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { username: string } }) => {
  const result = await getAuthor(decodeURI(params.username));
  if (result === null) return redirect("/");

  const jsonLD = {
    author: {
      "@type": "Person",
      givenName: result.name,
      familyName: result.name,
      birthDate: result.dob,
      gender: result.gender,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <section>
        <div className="global-container w-full bg-white">
          <div className="flex flex-col items-center justify-center gap-6 w-full h-full min-h-[600px]">
            <figure className="relative h-32 w-32 rounded-full">
              <Image
                src={result.img}
                alt={result.name}
                fill
                className="rounded-full h-full w-full object-cover"
              />
            </figure>
            <span className="text-lg font-medium text-black">
              {result.name}
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-gray-500 text-sm">{result.gender}</span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <time className="text-gray-500 text-sm">{result.dob}</time>
            </div>
            <p className="max-w-[600px] text-center text-gray-600">
              {result.bio}
            </p>
            <div className="flex items-center justify-center gap-2">
              <a href={result.facebook} target="_blank">
                <Image
                  src={"/asset/social/facebook.svg"}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </a>
              <a href={result.linkedin} target="_blank">
                <Image
                  src={"/asset/social/link.svg"}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </a>
              <a href={result.instagram} target="_blank">
                <Image
                  src={"/asset/social/inst.svg"}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </a>
              <a href={result.twitter} target="_blank">
                <Image
                  src={"/asset/social/x.svg"}
                  alt="Facebook"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <RecentBlog
        options={{
          take: 3,
          orderBy: {
            updatedAt: "desc",
          },
          where: {
            author: decodeURI(params.username),
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
        }}
      />
    </>
  );
};

export default page;
