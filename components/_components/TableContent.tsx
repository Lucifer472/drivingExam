"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const TableContent = ({
  headings,
}: {
  headings: {
    id: string;
    data: {
      text: string;
      level: number;
    };
    type: string;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function extractContentFromAnchor(text: any) {
    if (!text.match(/<[^>]*>/g)) return text;
    return text.replace(/<[^>]*>/g, "");
  }

  return (
    <div className="w-full py-4 px-2 max-w-[750px] mx-auto">
      <div className="w-full flex flex-col items-start gap-4 px-4 py-2 bg-gray-300 border-2 border-black">
        <div className="">
          Table of Content [
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 cursor-pointer"
          >
            Show
          </span>
          ]
        </div>
        <div
          className={cn(
            "w-full flex flex-col items-start gap-2 overflow-hidden delay-300 transition-all duration-500 ease-in-out",
            isOpen ? "max-h-[1000px] " : "max-h-0 "
          )}
        >
          {headings.map((h, index) => (
            <Link
              key={h.id}
              href={`#${h.id}`}
              className="flex gap-1 text-blue-600"
            >
              <span>{index + 1}.</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: extractContentFromAnchor(h.data.text),
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableContent;
