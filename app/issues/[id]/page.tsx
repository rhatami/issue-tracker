import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueButtons from "./IssueButtons";
import IssueDetails from "./IssueDetails";

const issueDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <IssueButtons issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export const dynamic = "force-dynamic";
export default issueDetailPage;
