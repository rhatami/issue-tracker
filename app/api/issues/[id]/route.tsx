import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  const data = await request.json();
  const validation = issueSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Issue doesn't exist" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title: data.title, description: data.description },
  });

  return NextResponse.json(updatedIssue);
}
