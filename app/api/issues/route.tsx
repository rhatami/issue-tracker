import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/auth/AuthOptions";
import { issueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const data = await request.json();
  const validation = issueSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const createdIssue = await prisma.issue.create({
    data: { title: data.title, description: data.description },
  });

  return NextResponse.json(createdIssue, { status: 201 });
}
