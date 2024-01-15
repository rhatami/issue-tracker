import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/ValidationSchemas";

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
