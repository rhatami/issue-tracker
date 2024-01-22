"use client";
import { Skeleton, Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const IssueButtons = ({ issue }: { issue: Issue }) => {
  const [error, setError] = useState(false);
  return (
    <Flex direction="column" gap="4">
      <ErrorDialog error={error} setError={setError} />
      <AssignUser issue={issue} setError={setError} />
      <EditButton issueId={issue.id} />
      <DeleteButton issueId={issue.id} setError={setError} />
    </Flex>
  );
};

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

const DeleteButton = ({
  issueId,
  setError,
}: {
  issueId: number;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);
  const deleteHandler = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>
          <TrashIcon />
          Delete Issue
          {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Issue Delete?</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={deleteHandler}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

const AssignUser = ({
  issue,
  setError,
}: {
  issue: Issue;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users list"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
    staleTime: 360000, // 360seconds
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null; // dont render component

  const router = useRouter();
  const selectHandler = async (userId: string) => {
    try {
      if (userId == "-1")
        await axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: null,
        });
      else
        await axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId,
        });
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Select.Root
      onValueChange={(userId) => selectHandler(userId)}
      defaultValue={issue.assignedToUserId || ""}
    >
      <Select.Trigger placeholder="Assign to" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users List</Select.Label>
          <Select.Item value="-1">Unassign</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

const ErrorDialog = ({
  error,
  setError,
}: {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error!</AlertDialog.Title>
        <AlertDialog.Description>An error occured!</AlertDialog.Description>
        <Button
          variant="soft"
          color="gray"
          mt="2"
          onClick={() => setError(false)}
        >
          OK
        </Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default IssueButtons;
