import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import { useCabins } from "./useCabins";

// const cabins = [
//   { id: 1, name: "001", maxCapacity: 2, regularPrice: 2999, discount: 0 },
//   { id: 2, name: "004", maxCapacity: 8, regularPrice: 9999, discount: 1999 },
//   { id: 3, name: "005", maxCapacity: 12, regularPrice: 6999, discount: 0 },
//   { id: 4, name: "002", maxCapacity: 6, regularPrice: 4999, discount: 399 },
//   { id: 5, name: "003", maxCapacity: 4, regularPrice: 6999, discount: 1299 },
// ];

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  // 1. FILTER
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filteredValue === "all") filteredCabins = cabins;
  if (filteredValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filteredValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // 2. SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
