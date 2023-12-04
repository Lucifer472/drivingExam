import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const LinkBtn = ({
  link,
  label,
  className,
  isIcon,
}: {
  link: string;
  label: string;
  className: string;
  isIcon?: boolean;
}) => {
  return (
    <Link href={link}>
      <Button
        className={`${className} px-2 sm:px-4 md:px-6 py-4 text-sm sm:text-base md:text-lg`}
      >
        {label}
        {isIcon ? <ArrowRightIcon className="w-6 h-6" /> : ""}
      </Button>
    </Link>
  );
};

export default LinkBtn;
