import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";

export default async function HomePage() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const in_progressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openCount}
          closed={closedCount}
          in_progress={in_progressCount}
        />
        <IssueChart
          open={openCount}
          closed={closedCount}
          in_progress={in_progressCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker Dashboard",
  description: "View Summary of Issues and their statuses",
};
