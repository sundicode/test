"use client";
import TipTap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { FaFileImage } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useFilePreview from "@/hooks/useFilePreview";
import { useEffect, useState } from "react";
import { register } from "module";
import { ScaleLoader } from "react-spinners";
import MedicksApi from "@/utils/axios";
import { toast } from "react-toastify";
type Ttip = {
  slug: string;
  title: string;
  file: FileList;
  description: string;
};
const CreateHealthTip = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const form = useForm<Ttip>({
    mode: "onChange",
  });
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful, form.reset]);

  const submitTask: SubmitHandler<Ttip> = (data: Ttip) => {
    const form = new FormData();
    form.append("file", data.file[0]);
    form.append("description", data.description);
    form.append("slug", data.slug);
    form.append("title", data.title);
    setLoading(true);
    MedicksApi.post("/health", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success("successful created Tip");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form {...form}>
      <form
        className="w-[70%] mx-auto flex flex-col gap-y-5"
        onSubmit={form.handleSubmit(submitTask)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  className="p-[1rem]"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-3 items-center text-primary">
                <FaFileImage size={25} />
                Attach an image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Enter title"
                  className="p-[1rem] hidden"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter unique slug"
                  className="p-[1rem]"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TipTap onChange={field.onChange} description={field.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {Loading ? (
          <ScaleLoader color="#2B33FF" className="mx-auto" />
        ) : (
          <Button type="submit" className="py-3 px-5 bg-primary text-white">
            Create Tip
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateHealthTip;
