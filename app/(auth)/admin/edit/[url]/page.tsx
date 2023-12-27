import SwitchNav from "@/components/admin/SwitchNav";
import { getBlog, getFaq } from "@/lib/blog-util";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { url: string } }) => {
  const data = await getBlog({
    where: {
      url: params.url,
    },
  });

  if (data === null) return redirect("/admin");
  const faq = await getFaq(data.id);

  const { blog, title, url, category, description, keywords, expiredAt, id } =
    data;
  const BlogEdit = dynamic(() => import("@/components/admin/BlogEdit"), {
    ssr: false,
  });
  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="" />
        </div>
        <div className="my-4 max-w-[720px] mx-auto border border-black rounded-md p-4">
          <div className="w-full border-b-2 border-black mb-4">
            <span className="text-xl font-medium">Edit Blogs</span>
          </div>
          <div>
            <BlogEdit
              values={{
                title,
                url,
                // @ts-ignore
                category,
                description,
                keywords,
                expiredAt,
              }}
              id={id}
              blogData={{
                time: 1700482255444,
                blocks: blog,
                version: "2.28.2",
              }}
              faqData={
                faq.length !== 0
                  ? {
                      time: 1700482255444,
                      blocks: faq[0].faq,
                      version: "2.28.2",
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
