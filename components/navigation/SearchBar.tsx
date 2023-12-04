"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");

  const router = useRouter();
  const handleSearch = () => {
    if (searchInput) {
      router.push(`/search/${searchInput}`);
    } else {
      toast.error("Please Enter Text to Search!");
    }
  };
  return (
    <Popover>
      <PopoverTrigger
        className="px-4 py-2 bg-zinc-200/30 rounded-sm data-[state=open]:pb-3"
        aria-label="Search-button"
      >
        <Search width={30} height={30} color="black" />
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 w-72 md:w-80">
        <Input
          placeholder="Search Here.."
          className="focus:outline-blue-300"
          onKeyUp={(e: any) => setSearchInput(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          variant={"secondary"}
          aria-label="search"
        >
          <Search />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
