"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid Email!"),
  number: z
    .string()
    .min(10, { message: "Please Enter a Valid Mobile Number?" })
    .max(10, { message: "Please Enter a Valid Mobile Number?" })
    .refine((number) => /^\d+$/.test(number), {
      message: "Mobile number must contain only numeric digits.",
    }),
  subject: z.string().min(10, {
    message: "Subject Must be atleast 10 latters Long!",
  }),
  message: z.string().min(50, {
    message: "Message must be atleast 50 Latters Long",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      subject: "",
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Full Name" {...field} />
              </FormControl>
              <FormDescription>This is You&apos;re Full Name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input placeholder="exmple@website.com" {...field} />
              </FormControl>
              <FormDescription>
                This Email Will be used to contact You.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Mobile Number" {...field} />
              </FormControl>
              <FormDescription>
                This is You&apos;re Phone Number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormDescription>Please Enter a Subject.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message ...." {...field} />
              </FormControl>
              <FormDescription>Please Enter a Message.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
