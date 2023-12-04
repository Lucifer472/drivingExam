import Image from "next/image";
import logo from "@/public/asset/logo.webp";
import Link from "next/link";
import dynamic from "next/dynamic";
import { title } from "@/constant";

const Navbar = () => {
  const SearchBar = dynamic(() => import("@/components/navigation/SearchBar"), {
    ssr: false,
  });
  const Sidebar = dynamic(() => import("@/components/navigation/Sidebar"), {
    ssr: false,
  });
  const DesktopMenu = dynamic(
    () => import("@/components/navigation/DesktopMenu"),
    {
      ssr: true,
    }
  );

  const Progressbar = dynamic(() => import("./Progressbar"), { ssr: false });

  return (
    <header className="h-16 md:h-20 w-full bg-white fixed top-0 border-b border-gray-100 shadow-sm z-50">
      <nav className="flex items-center justify-between w-full h-full relative global-container ">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={logo} width={50} alt="Logo" />
          <h1 className="hidden sm:block text-xl font-medium text-black">
            {title}
          </h1>
        </Link>
        <div className="flex-1 justify-center items-center  gap-4 hidden lg:flex">
          <DesktopMenu />
        </div>
        <div className="flex items-center gap-2">
          <SearchBar />
          <Sidebar />
        </div>
      </nav>
      <Progressbar />
    </header>
  );
};

export default Navbar;
