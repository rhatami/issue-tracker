import { AuthOptions } from "@/app/auth/AuthOptions";
import { Button, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

const IssuesToolbar = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueFilter />
      <NewIssueButton />
    </Flex>
  );
};

const NewIssueButton = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) return null;
  return (
    <Button>
      <Link href="/issues/new">New Issue</Link>
    </Button>
  );
};

export default IssuesToolbar;
