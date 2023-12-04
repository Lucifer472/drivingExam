import SwitchNav from "@/components/admin/SwitchNav";
import dynamic from "next/dynamic";

const page = async () => {
  const BlogForm = dynamic(() => import("@/components/admin/BlogForm"), {
    ssr: false,
  });
  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="blogs" />
        </div>
        <div className="my-4 max-w-[750px] mx-auto border border-black rounded-md p-4">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="py-2 border-b border-black w-full">
              <h2 className="text-2xl font-medium">Add New Blog Here!</h2>
            </div>
            <BlogForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
