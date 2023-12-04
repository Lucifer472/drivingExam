import toast from "react-hot-toast";
import { byProfile } from "@/constant";

export const profileUpload = async (file: File | null) => {
  if (file) {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(byProfile, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("File upload Succesfully");
        return data.imageUrl;
      } else {
        toast.error("File upload failed");
        return "";
      }
    } catch (error) {
      toast.error("File upload error");
      return "";
    }
  } else {
    toast.error("No File Recevied");
    return "";
  }
};
