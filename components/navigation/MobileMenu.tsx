"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { driving, about, category } from "@/constant";
import { School, Store } from "lucide-react";

const MobileMenu = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [menu2, setMenu2] = useState<boolean>(false);
  return (
    <div className="max-w-full w-full flex flex-col items-start justify-start">
      <div
        className="px-4 py-2 w-full text-lg border-l border-slate-100 hover:border-sky-500 hover:bg-sky-100 transition-all cursor-pointer flex items-center gap-2"
        onClick={() => setMenu(!menu)}
      >
        <School />
        Driving Knowledge
      </div>
      <div
        className={cn(
          "mt-2 ml-6  flex-col items-start justify-start w-full transition-all",
          menu ? "flex" : "hidden"
        )}
      >
        {driving.labels.map((l, index) => (
          <Link
            key={l}
            href={`/driving/${driving.links[index]}`}
            className="px-4 py-2 w-full text-lg border-l border-slate-100 hover:border-sky-500 hover:bg-sky-100 transition-all cursor-pointer"
          >
            {l}
          </Link>
        ))}
      </div>
      {category.labels.map((l, index) => {
        const Icon = category.icons[index];
        return (
          <Link
            key={l}
            href={`${category.links[index]}/1`}
            className="px-4 py-2 w-full text-lg border-l border-slate-100 hover:border-sky-500 hover:bg-sky-100 transition-all flex items-center gap-2"
          >
            <Icon />
            {l}
          </Link>
        );
      })}
      <div
        className="px-4 py-2 w-full text-lg border-l border-slate-100 hover:border-sky-500 hover:bg-sky-100 transition-all cursor-pointer flex items-center gap-2"
        onClick={() => setMenu2(!menu2)}
      >
        <Store />
        More
      </div>
      <div
        className={cn(
          "mt-2 ml-6  flex-col items-start justify-start w-full transition-all",
          menu2 ? "flex" : "hidden"
        )}
      >
        {about.labels.map((l, index) => (
          <Link
            key={l}
            href={about.links[index]}
            className="px-4 py-2 w-full text-lg border-l border-slate-100 hover:border-sky-500 hover:bg-sky-100 transition-all cursor-pointer"
          >
            {l}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
