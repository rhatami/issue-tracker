import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Flex, Card } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/app/components";

const issueDetailLoading = () => {
  return (
    <div>
      <Skeleton className="max-w-xl" />
      <Flex gap="5" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="5">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default issueDetailLoading;
