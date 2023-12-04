import SwitchNav from "@/components/admin/SwitchNav";
import getCurrentUser from "@/lib/user-util";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (user?.type !== "admin") return redirect("/admin");

  const RegisterForm = dynamic(
    () => import("@/components/login/RegisterForm"),
    { ssr: false }
  );
  return (
    <section className="bg-slate-100 w-full h-full">
      <div className="global-container w-full h-full bg-white">
        <div className="flex flex-col items-start justify-start w-full">
          <SwitchNav selected="register" />
        </div>
        <div className="my-4 max-w-[750px] mx-auto border border-black rounded-md p-4">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};
export default page;
