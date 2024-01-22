import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div>Hello</div>
      <Pagination
        numberOfItems={95}
        itemsPerPage={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
