import { useEffect, useState } from "react";
import { Index, useConfigure } from "react-instantsearch";
import CustomHits from "./CustomHits";

const getPastPurchases = () => {
  try {
    return JSON.parse(localStorage.getItem("pastPurchases")) || [];
  } catch (error) {
    console.error("Unable to access localStorage:", error);
    return [];
  }
};

const PastPurchase = ({onClose}) => {
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
      <Index indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}>
        {filterList.length >= 1 ? (
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
            <div id="carousel" className="carousel-container">
              <ScopedConfigure filters={filterList} />
              <CustomHits />
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
        ) : (
          <>
          <div className="carousel-wrapper">
            <ScopedConfigure filters={`objectID:-1`} />
            <p className="empty-message">You have no past purchases!</p>
            </div>
          </>
        )}
      </Index>

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
