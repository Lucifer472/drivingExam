"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "./schema";
import { profileUpload } from "./profileUpload";
import RegisterFormFields from "./RegisterFormFields";

// Form

const RegisterForm = () => {
  const [url, setUrl] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      bio: "",
      img: "",
      gender: "Male",
      dob: "",
      type: "user",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values), // Convert the data to a JSON string
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    })
      .then((data) => {
        if (data) {
          toast.success("user created Successfully!");
          form.reset();
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  }

  // Image upload

  const imageUpload = async (file: File | null) => {
    if (file === null) return null;
    const res = await profileUpload(file);
    res.then((res: string) => {
      setUrl(res);
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      imageUpload(selectedFile);
    }
  };

  useEffect(() => {
    form.setValue("img", url);
  }, [url, form]);

  return (
    <Form {...form}>
      <RegisterFormFields
        form={form}
        handleImageUpload={handleImageUpload}
        onSubmit={onSubmit}
      />
    </Form>
  );
};

export default RegisterForm;
