import prisma from "@/prisma/client";
import { Status, Issue } from "@prisma/client";
import { IssuesTable } from "./_components/IssuesTable";
import IssuesToolbar from "./_components/IssuesToolbar";
import Pagination from "../components/Pagination";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface QueryString {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
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

  const page = parseInt(searchParams.page) || 1;
  const itemsPerPage = 5;
  const numerOfIssues = await prisma.issue.count({
    where: { status: status },
  });

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: { [orderBy]: "asc" },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <Flex direction="column" gap="4">
      <IssuesToolbar />
      <IssuesTable
        currentQuery={currentQuery}
        orderBy={searchParams.orderBy}
        issues={issues}
      />
      <Pagination
        numberOfItems={numerOfIssues}
        itemsPerPage={itemsPerPage}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issues",
  description: "View All Issues and their statuses",
};

export default issuesPage;
