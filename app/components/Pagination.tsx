"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  numberOfItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({
  numberOfItems: itemsCount,
  itemsPerPage,
  currentPage,
}: Props) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage);
  if (totalPages <= 1) return null; // no pagination needed

  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    // add existing searchParams to our query string
    const params = new URLSearchParams(searchParams);
    // add page number to query string
    params.set("page", page.toString());
    // redirect to new page
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
