"use client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { Text, TextField, Button, Callout } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Error from "next/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const newIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(issueSchema) });
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected Error occurred!");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default newIssuePage;
