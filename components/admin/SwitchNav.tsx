import { cn } from "@/lib/utils";
import Link from "next/link";
import Logout from "../login/Logout";
import getCurrentUser from "@/lib/user-util";

const SwitchNav = async ({ selected }: { selected: string }) => {
  const user = await getCurrentUser();
  return (
    <div className="w-full flex items-center justify-center py-4">
      <div className="border border-black rounded-sm flex items-center justify-center ">
        {user?.type === "admin" && (
          <Link
            href={"/admin/register"}
            className={cn(
              "px-4 py-2 hover:bg-slate-50 transition-colors",
              selected == "register" ? "bg-slate-50" : ""
            )}
          >
            Register
          </Link>
        )}
        {user?.type === "admin" && (
          <Link
            href={"/admin/remove-author"}
            className={cn(
              "px-4 py-2 hover:bg-slate-50 transition-colors",
              selected == "remove-author" ? "bg-slate-50" : ""
            )}
          >
            Remove Author
          </Link>
        )}
        <Link
          href={"/admin/list"}
          className={cn(
            "px-4 py-2 hover:bg-slate-50 transition-colors",
            selected == "list" ? "bg-slate-50" : ""
          )}
        >
          Blog List
        </Link>
        <Link
          href={"/admin"}
          className={cn(
            "px-4 py-2 hover:bg-slate-50 transition-colors",
            selected == "blogs" ? "bg-slate-50" : ""
          )}
        >
          Add Blogs
        </Link>
        <Link
          href={"/admin/profile"}
          className={cn(
            "px-4 py-2 hover:bg-slate-50 transition-colors",
            selected == "profile" ? "bg-slate-50" : ""
          )}
        >
          Edit Profile
        </Link>
        <Logout className="px-4 py-2 hover:bg-slate-50 transition-colors" />
      </div>
    </div>
  );
};

export default SwitchNav;
