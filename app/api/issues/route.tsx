import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const issueSchema = z.object({
  title: z.string().min(1, "Title is required!").max(255 , "Title is too long!"),
  description: z.string().min(1, "Description is Required!"),
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = issueSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const createdIssue = await prisma.issue.create({
    data: { title: data.title, description: data.description },
  });

  return NextResponse.json(createdIssue, { status: 201 });
}
