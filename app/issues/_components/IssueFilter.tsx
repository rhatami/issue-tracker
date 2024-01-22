"use client";
import { Status } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueFilter = () => {
  return (
    <Flex gap="2">
      <StatusFilter />
    </Flex>
  );
};

const StatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const queryString = status !== "ALL" ? `?status=${status}` : "";
        router.push("/issues" + queryString);
      }}
    >
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFilter;
