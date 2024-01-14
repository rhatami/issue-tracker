import Link from "next/link";
import { Button } from "@radix-ui/themes";

const issuesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default issuesPage;
