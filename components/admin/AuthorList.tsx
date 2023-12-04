"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { user } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthorList = ({ data }: { data: user[] }) => {
  const router = useRouter();

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return; // User canceled the deletion
    }
    fetch("/api/delete/user", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Message === "Author has been Deleted!") {
          toast.success(data.Message);
          router.refresh();
        } else if (data.Message === "You Are not Authorized!") {
          toast.error(data.Message);
          router.refresh();
        } else {
          toast.error("An Error has Occured");
          router.refresh();
        }
      });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-full grid grid-cols-11 border border-gray-100 rounded-t-sm">
        <div className="col-span-1 border-r border-gray-100 text-center py-2 px-4">
          Index
        </div>
        <div className="col-span-7 border-r border-gray-100 text-center py-2 px-4">
          Name
        </div>
        <div className="col-span-3 text-center py-2 px-4">Action</div>
      </div>
      {data.map((data, index, array) => (
        <div
          className={cn(
            "w-full grid grid-cols-11 border border-gray-100",
            index === array.length - 1 ? "rounded-b-sm" : ""
          )}
          key={index}
        >
          <div className="col-span-1 border-r border-gray-100 text-center py-2 px-4 flex items-center justify-center">
            {index + 1}
          </div>
          <div className="col-span-7 border-r border-gray-100 text-center py-2 px-4 flex items-center justify-center gap-2">
            <Image
              src={data.img}
              alt="Author"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
            {data.name}
          </div>
          <div className="col-span-3 text-center py-2 px-4 flex items-center justify-evenly gap-1">
            <Button
              variant={"destructive"}
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthorList;
