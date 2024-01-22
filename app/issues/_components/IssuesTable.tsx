import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { Issue } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon } from "@radix-ui/react-icons";

const headerColumns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "Create Date", value: "createdAt" },
];

export const IssuesTable = ({
  issues,
  currentQuery,
  orderBy,
}: {
  issues: Issue[];
  currentQuery: string;
  orderBy: keyof Issue;
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {headerColumns.map((header) => (
            <Table.ColumnHeaderCell
              key={header.value}
              className={header.value === "title" ? "" : "hidden md:table-cell"}
            >
              <NextLink
                href={
                  currentQuery
                    ? "issues" + currentQuery + "&orderBy=" + header.value
                    : "/issues?orderBy=" + header.value
                }
              >
                {header.label}
                {header.value === orderBy && (
                  <ArrowDownIcon className="inline" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}

          {/* className="hidden md:table-cell" */}
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
