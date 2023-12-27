"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { driving, category } from "@/constant";
import Editor from "./Editor";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import FaqForm from "./FaqForm";
import { JsonValue } from "@prisma/client/runtime/library";

const blogSchema = z.object({
  title: z.string().min(15, {
    message: "Minimum of 15 Latters are required to post a blog!",
  }),
  url: z.string(),
  keywords: z.string().max(190, {
    message: "Maxmimum of 190 Latters are Allowed!",
  }),
  description: z.string().max(190, {
    message: "Maxmimum of 190 Latters are Allowed!",
  }),
  category: z.string(),
  expiredAt: z.date(),
});

// Mian BLog section

const BlogEdit = ({
  values,
  blogData,
  faqData,
  id,
}: {
  values: {
    title: string;
    url: string;
    keywords: string;
    description: string;
    category: string;
    expiredAt: Date;
  };
  id: number;
  blogData: JsonValue;
  faqData?: JsonValue;
}) => {
  const [data, setData] = useState<any>({});
  const [faq, setFaq] = useState<any>({});
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: values,
  });

  function onSubmit(values: z.infer<typeof blogSchema>) {
    fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ ...values, data, faq, id }),
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Network Reponse was not ok");
          throw new Error("Network response was not ok");
        }
        return response.json(); // This will parse the response as JSON
      })
      .then((data: any) => {
        if (data.status == 200) {
          toast.success("Blog Succesfully updated!");
          form.reset();
        } else {
          toast.error(data.Message);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full pt-4 py-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of the Blogs" {...field} />
              </FormControl>
              <FormDescription>This is the Title of the blog</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Url of the Blogs" {...field} />
              </FormControl>
              <FormDescription>This is the Title of the Url</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input placeholder="Keywords of the Blogs" {...field} />
              </FormControl>
              <FormDescription>
                This are the keywords of the blogs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description of the Blogs" {...field} />
              </FormControl>
              <FormDescription>
                This are the Description of the blogs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.labels.map((l) => (
                      <SelectItem key={l} value={l} className="capitalize">
                        {l}
                      </SelectItem>
                    ))}
                    {driving.labels.map((l) => (
                      <SelectItem key={l} value={l} className="capitalize">
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Please Select Category of the Scholarship
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiredAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Please Select a Expiry Date:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Expiry Date for the new Blog.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full">
          <span className="pb-4 text-xl font-medium">Add Blog</span>
          <div className="w-full border border-slate-200 rounded-md px-10 py-8">
            <Editor setData={setData} initialData={blogData} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <span className="pb-4 text-xl font-medium">Add Faqs</span>
          <div className="w-full border border-slate-200 rounded-md px-10 py-8">
            <FaqForm setData={setFaq} initialData={faqData} />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BlogEdit;
