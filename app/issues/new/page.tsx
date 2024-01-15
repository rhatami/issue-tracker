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
import ErrorMessage from "@/app/components/errorMessage";
import Spinner from "@/app/components/Spinner";

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
  const [isSubmitting, setSubmitting] = useState(false);

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
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected Error occurred!");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default newIssuePage;
