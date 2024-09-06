"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Editor from "@/components/editor/editor";
import { HeadingInput } from "./HeadingInput";
import { useFormContext } from "@/app/context/FormContext"; // Adjust the import path
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

interface ContentFormProps {
  user: User;
}

const ContentForm:React.FC<ContentFormProps> = ({ user }) => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>(window.localStorage.getItem('postTitle') || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { trigger, setContentInContext, categories, thumbnail, summary } = useFormContext();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/post", {
        title,
        content,
        categories,
        thumbnail,
        summary
      }).then((res) => {
        toast.success('Article publised successfully!')
        router.push(`/post/${user.username}/${res.data.post.id}`)
      }).finally(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle errors (e.g., show an error message)
    }
  };

  useEffect(() => {
    if (trigger) {
      handleSubmit(onSubmit)();
    }
  }, [trigger]);

  useEffect(() => {
    setValue("content", content);
    setValue("title", title);
    setContentInContext(content);
  }, [content, title]);

  useEffect(() => {
    window.localStorage.setItem('postTitle', title)
  }, [title])

  return (
    <div className="mt-6 flex w-full flex-col space-y-10">
      <div className="flex gap-4">
        <HeadingInput
          type="text"
          placeholder="Title"
          disabled={isLoading}
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={200}
        />
      </div>

      <Editor onChange={setContent} />
    </div>
  );
};

ContentForm.displayName = "ContentForm";
export default ContentForm;
