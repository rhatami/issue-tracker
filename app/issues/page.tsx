import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "@/app/components";
import IssuesToolbar from "./_components/IssuesToolbar";
import { Issue, Status } from "@prisma/client";

const issuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  // change invalid statuses to undefined
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({ where: { status: status } });

  return (
    <div>
      <IssuesToolbar />
      <IssuesTable issues={issues} />
    </div>
  );
};

const IssuesTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created At
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                {<IssueStatusBadge status={issue.status} />}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {<IssueStatusBadge status={issue.status} />}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default issuesPage;
