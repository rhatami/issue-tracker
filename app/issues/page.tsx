import prisma from "@/prisma/client";
import { Status, Issue } from "@prisma/client";
import { IssuesTable } from "./_components/IssuesTable";
import IssuesToolbar from "./_components/IssuesToolbar";

interface QueryString {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const issuesPage = async ({ searchParams }: QueryString) => {
  // change invalid statuses to undefined
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const currentQuery = status ? "?status=" + status : "";

  const orderBy =
    searchParams.orderBy &&
    ["title", "status", "createdAt"].includes(searchParams.orderBy)
      ? searchParams.orderBy
      : "createdAt";
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: { [orderBy]: "asc" },
  });

  return (
    <div>
      <IssuesToolbar />
      <IssuesTable
        currentQuery={currentQuery}
        orderBy={searchParams.orderBy}
        issues={issues}
      />
    </div>
  );
};

export default issuesPage;
