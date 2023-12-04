import SwitchNav from "@/components/admin/SwitchNav";
import EditForm from "@/components/login/EditForm";
import getCurrentUser from "@/lib/user-util";
import { redirect } from "next/navigation";

const profilePage = async () => {
  const user = await getCurrentUser();
  if (user === null) redirect("/");
  const { id, type, password, ...values } = user;

  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="profile" />
        </div>
        <div className="my-4 max-w-[750px] mx-auto border border-black rounded-md p-4">
          <EditForm values={values} id={id} />
        </div>
      </div>
    </section>
  );
};

export default profilePage;
