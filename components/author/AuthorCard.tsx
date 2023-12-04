import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface authorCardProps {
  name: string;
  img: string;
  username: string;
}

const AuthorCard = ({ img, name, username }: authorCardProps) => {
  return (
    <Link
      href={`/author/${username}`}
      className="col-span-1 w-full shadow-md rounded-md"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="min-h-[250px] flex flex-col items-center justify-center cursor-pointer">
          <Avatar className="w-20 h-20">
            <AvatarImage src={img} className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-medium">{name}</h2>
          <span className="text-xs text-gray-500">{username}</span>
        </div>
      </div>
    </Link>
  );
};

export default AuthorCard;
