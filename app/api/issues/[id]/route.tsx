import { AuthOptions } from "@/app/auth/AuthOptions";
import { optionalIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const data = await request.json();
  const validation = optionalIssueSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // check if user exist
  if (data.assignedToUserId) {
    const user = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
    if (!user)
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
  }

  // check if issue exist
  if (data.title | data.description) {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });
    if (!issue)
      return NextResponse.json(
        { error: "Issue doesn't exist" },
        { status: 404 }
      );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      description: data.description,
      assignedToUserId: data.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "Issue doesn't exist" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(deletedIssue);
}
