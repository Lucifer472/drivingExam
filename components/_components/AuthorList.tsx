import type { user } from "@prisma/client";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";

interface AuthorListProps {
  authors: user[];
}

const AuthorList = ({ authors }: AuthorListProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-2">
      {authors.map((a) => (
        <Link
          key={a.id}
          href={`/author/${a.username}`}
          className="flex items-center justify-start sm:justify-center gap-4 cursor-pointer px-4 py-2 border-gray-200/30 shadow-md rounded-md w-full sm:w-fit"
        >
          <div className="relative w-28 h-28 rounded-full">
            <Image
              src={a.img}
              alt={a.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-medium">{a.name}</h2>
            <span className="text-sm text-gray-500 py-1">Editor</span>
            <Badge className="text-[8px]">{a.username}</Badge>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AuthorList;
