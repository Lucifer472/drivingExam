"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from "./schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { profileUpload } from "./profileUpload";

const EditForm = ({
  values,
  id,
}: {
  values: {
    username: string;
    name: string;
    bio: string;
    img: string;
    dob: string;
    gender: "Male" | "Female";
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  id: number;
}) => {
  const router = useRouter();
  const [url, setUrl] = useState<string>(values.img);

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: values,
  });

  function onSubmit(values: z.infer<typeof editSchema>) {
    fetch("/api/auth/update", {
      method: "POST",
      body: JSON.stringify({ ...values, id }), // Convert the data to a JSON string
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    })
      .then((data) => {
        if (data) {
          toast.success("user updated Successfully!");
          router.refresh();
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  }

  // Image upload

  const imageUpload = async (file: File | null) => {
    if (file === null) return null;
    await profileUpload(file).then((res: string) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col w-full items-center">
          <label
            id="img"
            className="relative w-32 h-32 border border-gray-50 rounded-full"
          >
            <Image
              src={url}
              alt="Profile Pic"
              fill
              className="rounded-full object-cover"
            />
            <Input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              name="img"
              id="img"
            />
          </label>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="ihardiksadhu" {...field} />
              </FormControl>
              <FormDescription>
                This will not be visible to user it is only for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio Here!" {...field} />
              </FormControl>
              <FormDescription>
                Enter a brief description of yourself or your profile. This is
                an opportunity to share information about your interests,
                background, or anything you&apos;d like to tell others.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Specify your gender, whether you identify as male or female.
                This information is used for identification or personalization
                purposes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth:</FormLabel>
              <FormControl>
                <Input placeholder="DD/MM/YYYY" {...field} />
              </FormControl>
              <FormDescription>
                Enter your date of birth in the format DD/MM/YYYY. This helps us
                ensure that you meet age requirements for certain features or
                services.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook:</FormLabel>
              <FormControl>
                <Input placeholder="Facebook" {...field} />
              </FormControl>
              <FormDescription>
                Provide your Facebook profile link or username if you&apos;d
                like to connect with others on this platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram:</FormLabel>
              <FormControl>
                <Input placeholder="Instagram" {...field} />
              </FormControl>
              <FormDescription>
                Share your Instagram username or profile link to connect with
                others and share your visual experiences.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn:</FormLabel>
              <FormControl>
                <Input placeholder="LinkedIn" {...field} />
              </FormControl>
              <FormDescription>
                Include your LinkedIn profile URL or username to connect with
                professional contacts and showcase your career achievements.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter:</FormLabel>
              <FormControl>
                <Input placeholder="Twitter" {...field} />
              </FormControl>
              <FormDescription>
                Share your Twitter handle or profile link to connect with others
                and stay updated with your latest tweets and news.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditForm;
