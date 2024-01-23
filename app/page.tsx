import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

export default async function Home() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const in_progressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <>
      <IssueSummary
        open={openCount}
        closed={closedCount}
        in_progress={in_progressCount}
      />
      {/* <LatestIssues /> */}
    </>
  );
}
