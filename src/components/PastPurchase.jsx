import { useEffect, useState } from "react";
import { Hits, Highlight, Index, useConfigure } from "react-instantsearch";
import CustomHits from "./CustomHits";

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
      const filters = pastPurchases.map((item) => {
        return `objectID:'${item.objectID}'`;
      });
      const combinedFilters = `${filters.join(" OR ")}`;
      setFilterList(combinedFilters);
    }
  }, []);

  return (
    <div className="past-purchases">
      <h2 className="section-title">Past Purchases</h2>
      <div className="divider mb-4" />

      <div className="carousel-wrapper">
        <button
          className="carousel-button carousel-button--left"
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
          className="carousel-container"
        >
          <Index indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}>
            {filterList.length >= 1 ? (
              <>
                <ScopedConfigure filters={filterList} />
                <CustomHits />
                {/* <Hits
                  hitComponent={({ hit }) => (
                    <Hit hit={hit} highlight={Highlight} />
                  )}
                  classNames={{
                    root: "flex justify-start items-start p-4 m-4",
                    list: "flex space-x-2 ",
                    item: "p-1 border-2 border-gray-200 rounded shadow-md flex-shrink-0 w-64",
                  }}
                /> */}
              </>
            ) : (
              <>
                <ScopedConfigure filters={`objectID:-1`} />
                <p className="empty-message">
                  You have no past purchases!
                </p>
              </>
            )}
          </Index>
        </div>
        <button
          className="carousel-button carousel-button--right"
          onClick={() => {
            document
              .getElementById("carousel")
              .scrollBy({ left: 300, behavior: "smooth" });
          }}
        >
          &gt;
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

const ScopedConfigure = ({ filters }) => {
  // console.log("filters", filters); // "objectID:1F000121Khaki OR objectID:5CB6100 OR objectID:1F000121Khaki OR objectID:1G011055WhiteCap"
  useConfigure({
    hitsPerPage: 5,
    page: 0,
    filters: `${filters}`,
  });

  return null; // This component only handles configuration
};

export default PastPurchase;
