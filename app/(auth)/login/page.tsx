import LoginForm from "@/components/login/LoginForm";
import getCurrentUser from "@/lib/user-util";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (user !== null) {
    redirect("/admin");
  }
  return (
    <section className="w-full h-[1000px] bg-slate-100">
      <div className="global-container bg-white flex items-center justify-center w-full h-full">
        <div className="rounded-md border border-black bg-white flex flex-col px-6 py-4">
          <div className="w-full flex flex-col">
            <h1 className="text-left my-2 text-xl">Login Here!</h1>
            <span className="text-sm text-gray-500">
              Welcome to admin panel of Driving Exam Expert
            </span>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default page;
