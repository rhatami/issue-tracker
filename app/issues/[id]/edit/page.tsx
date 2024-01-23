import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { Metadata } from "next";

const EditIssuePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export const metadata: Metadata = {
  title: "Issue Edit",
  description: "Edit the issue",
};

export default EditIssuePage;
