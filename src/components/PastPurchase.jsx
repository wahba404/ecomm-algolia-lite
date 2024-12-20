import { useEffect, useState } from "react";
import {
  Hits,
  Highlight,
  Index,
  useConfigure,
} from "react-instantsearch";
import Hit from "./Hit";

const getPastPurchases = () => {
  try {
    return JSON.parse(localStorage.getItem("pastPurchases")) || [];
  } catch (error) {
    console.error("Unable to access localStorage:", error);
    return [];
  }
};

const PastPurchase = () => {
  const [filterList, setFilterList] = useState([]);
  const pastPurchases = getPastPurchases();

  useEffect(() => {
    if (pastPurchases.length > 0) {
      const filters = pastPurchases.reverse().map((item) => {
        return `objectID:${item.objectID}`;
      });
      const combinedFilters = `${filters.join(" OR ")}`;
      setFilterList(combinedFilters);
    }
  }, []);

  return (
    <div className="container mx-auto p-8 ">
      <h2 className="text-xl font-semibold mb-2">Past Purchases</h2>
      <div className="border-b border-gray-300 mb-4"></div>
      <div className="relative w-full">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
          onClick={() => {
            document
              .getElementById("carousel")
              .scrollBy({ left: -300, behavior: "smooth" });
          }}
        >
          &lt;
        </button>
        <div
          id="carousel"
          className="w-full overflow-x-scroll flex justify-start items-start"
        >
          <Index indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}>
          {filterList.length >= 1 ? <><ScopedConfigure filters={filterList} /> 
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} highlight={Highlight} />
              )}
              classNames={{
                root: "flex justify-start items-start p-4 m-4",
                list: "flex space-x-2 ",
                item: "p-1 border-2 border-gray-200 rounded shadow-md flex-shrink-0 w-64",
              }}
            />
            </>
            : 
            <>
            <ScopedConfigure filters={"objectID:-1"} /> 
            <p className="flex justify-center w-full text-center py-8 text-xl font-semibold">You have no past purchases, go get you some!!!</p>
            </>
            }
          </Index>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
          onClick={() => {
            document
              .getElementById("carousel")
              .scrollBy({ left: 300, behavior: "smooth" });
          }}
        >
          &gt;
        </button>
      </div>
      <div className="border-b border-gray-300 mb-4"></div>
    </div>
  );
};

const ScopedConfigure = ({ filters }) => {
// console.log("filters", filters); // "objectID:1F000121Khaki OR objectID:5CB6100 OR objectID:1F000121Khaki OR objectID:1G011055WhiteCap"
  useConfigure({
    hitsPerPage: 4,
    page: 0,
    filters: filters || "", 
  });

  return null; // This component only handles configuration
};

export default PastPurchase;
