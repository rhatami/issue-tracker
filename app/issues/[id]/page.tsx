import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueButtons from "./IssueButtons";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/auth/AuthOptions";
import { Metadata } from "next";

const issueDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getServerSession(AuthOptions);
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>{session && <IssueButtons issue={issue} />}</Box>
    </Grid>
  );
};

export const metadata: Metadata = {
  title: "Issue Details",
  description: "View details of an issue and edit it",
};

export const dynamic = "force-dynamic";
export default issueDetailPage;
