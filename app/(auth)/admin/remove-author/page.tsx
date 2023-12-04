import AuthorList from "@/components/admin/AuthorList";
import SwitchNav from "@/components/admin/SwitchNav";
import { getAllAuthor } from "@/lib/author-util";
import getCurrentUser from "@/lib/user-util";
import { redirect } from "next/navigation";

const removeAuthor = async () => {
  const user = await getCurrentUser();

  if (user?.type !== "admin") {
    redirect("/");
  }

  const data = await getAllAuthor();

  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="remove-author" />
        </div>
        <div className="my-4 max-w-[1280px] mx-auto border border-black rounded-md p-4">
          <div className="w-full border-b-2 border-black mb-4">
            <span className="text-xl font-medium">Remove Author</span>
          </div>
          <div className="my-2 px-2">
            <AuthorList data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default removeAuthor;
