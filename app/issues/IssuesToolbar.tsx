import { AuthOptions } from "@/app/auth/AuthOptions";
import { Button } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";

const IssuesToolbar = async () => {
  const session = await getServerSession(AuthOptions);

  return (
    <div className="mb-5">
      {session && (
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      )}
    </div>
  );
};

export default IssuesToolbar;
