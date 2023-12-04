"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  isNextPage: boolean;
  isSecondNextPage: boolean;
  pageUrl: string;
}
const Pagination = ({
  currentPage,
  isNextPage,
  isSecondNextPage,
  pageUrl,
}: PaginationProps) => {
  const router = useRouter();

  if (currentPage === 1 && !isNextPage) {
    return null;
  }

  return (
    <section className="px-4 pt-6 pb-2 w-full flex flex-col items-center justify-center">
      <div className="py-4 text-black font-semibold text-lg">More Content</div>
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="flex gap-4 items-center justify-end col-span-1">
          {currentPage > 1 && (
            <Button onClick={() => router.push(`${pageUrl}${currentPage - 1}`)}>
              <ArrowLeft />
            </Button>
          )}
          {currentPage > 2 && (
            <Link
              href={`${pageUrl}${currentPage - 2}`}
              className="text-xl font-medium px-4 py-2 bg-slate-100 rounded-md hidden md:block"
            >
              {currentPage - 2}
            </Link>
          )}
          {currentPage > 1 && (
            <Link
              href={`${pageUrl}${currentPage - 1}`}
              className="text-xl font-medium px-4 py-2 bg-slate-100 rounded-md hidden md:block"
            >
              {currentPage - 1}
            </Link>
          )}
        </div>
        <Link
          href={"/"}
          className="text-xl font-medium px-4 py-2 bg-slate-300 rounded-md col-span-1 w-fit"
        >
          {currentPage}
        </Link>
        <div className="flex gap-4 items-center justify-start col-span-1">
          {isNextPage && (
            <Link
              href={`${pageUrl}${currentPage + 1}`}
              className="text-xl font-medium px-4 py-2 bg-slate-100 rounded-md hidden md:block"
            >
              {currentPage + 1}
            </Link>
          )}
          {isSecondNextPage && (
            <Link
              href={`${pageUrl}${currentPage + 2}`}
              className="text-xl font-medium px-4 py-2 bg-slate-100 rounded-md hidden md:block"
            >
              {currentPage + 2}
            </Link>
          )}
          {isNextPage && (
            <Button onClick={() => router.push(`${pageUrl}${currentPage + 1}`)}>
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pagination;
