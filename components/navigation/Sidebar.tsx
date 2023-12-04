"use client";
import { cn } from "@/lib/utils";
import { SidebarClose, SidebarIcon } from "lucide-react";
import useSideBarModal from "./SidebarModal";
import MobileMenu from "./MobileMenu";

const Sidebar = () => {
  const sidebarModal = useSideBarModal();
  return (
    <div
      className={cn(
        "flex lg:hidden relative",
        sidebarModal.isOpen ? "overflow-visible" : "overflow-hidden"
      )}
    >
      <SidebarIcon
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={sidebarModal.onOpen}
      />
      <div
        className={cn(
          "h-[100vh] w-[300px] absolute top-[-15px] bg-white border-l-2 border-gray-300/30 transition-[right] duration-300 ease-in-out z-10",
          sidebarModal.isOpen ? "right-0" : "right-[-350px]"
        )}
      >
        <div className="border-b border-gray-300/30 flex items-center justify-between py-4">
          <h1 className="pl-4 text-lg font-medium">Menu bar</h1>
          <div className="pr-2 cursor-pointer">
            <SidebarClose onClick={sidebarModal.onClose} />
          </div>
        </div>
        <aside className="flex flex-col items-start justify-start py-2 gap-4">
          <MobileMenu />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
