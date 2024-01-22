import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required!").max(255, "Title is too long!"),
  description: z.string().min(1, "Description is Required!").max(65535),
});

export const optionalIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required!")
    .max(255, "Title is too long!")
    .optional(),
  description: z
    .string()
    .min(1, "Description is Required!")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "User id is required")
    .max(255)
    .optional()
    .nullable(),
});
