import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  Highlight,
  RefinementList,
  CurrentRefinements,
  Pagination,
} from "react-instantsearch";
import { simple } from "instantsearch.js/es/lib/stateMappings";
import Hit from "../components/Hit";
import PastPurchase from "../components/PastPurchase";
import LoadingIndicator from "../components/LoadingIndicator";
import { RefinementAttributes } from "../config/attributesMapping";
import useCart from "../utils/useCart";
import useAnimatedPlaceholder from "../utils/useAnimatedPlaceholder";
import "../styles/index.css";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY,
);

function Home() {
  const { totalQuantity, clearPastPurchases } = useCart();
  const routing = {stateMapping: simple()};

  // --------------------------------------------------------------------------------
  // Scroll behavior for buttons
  // --------------------------------------------------------------------------------
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // --------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Animated placeholder
  //--------------------------------------------------------------------------------
  // useAnimatedPlaceholder(".ais-SearchBox-input", [
  //   "Polo...",
  //   "Maxi dress...",
  //   "Cardigan...",
  //   "Shorts...",
  //   "ET PHONE HOME...",
  // ]);
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Past Purchase Toggle
  // --------------------------------------------------------------------------------
  const [showPastPurchases, setShowPastPurchases] = useState(true);
  const togglePastPurchases = () => {
    setShowPastPurchases((prevState) => !prevState);
  };
  // --------------------------------------------------------------------------------

  return (
    <div className="container-page">
      <InstantSearch
        searchClient={searchClient}
        indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
        routing={routing}
        insights
      >
        <Configure hitsPerPage={12} />
        <div className="mb-4">
          <SearchBox
            placeholder="Search for products..."
            classNames={{
              root: "relative",
              input: "search-input",
              submit: "hidden",
              reset: "hidden",
            }}
          />
        </div>
        <CurrentRefinements
          className="current-refinements"
          classNames={{
            list: "flex",
            item: "current-refinement-item",
            delete: "current-refinement-delete",
          }}
        />
        <button
              className="btn-secondary mt-6 mb-2"
              onClick={togglePastPurchases}
            >
              {showPastPurchases ? "X" : "Show Past Purchases"}
            </button>
            {showPastPurchases && <PastPurchase />}
            <div className="divider mb-8 mt-4"></div>
            <LoadingIndicator />
        <div className="flex flex-col lg:flex-row">
          <aside className="sidebar">
            <div>
              <h2 className="px-4 text-lg font-semibold">Category</h2>
              <div className="sidebar-container">
                <RefinementList
                  attribute={get(RefinementAttributes, "category")}
                  className="mt-4"
                  classNames={{
                    list: "space-y-4",
                    item: "flex items-center space-x-2 text-lg",
                    label: "ml-2",
                    checkbox: "mr-2 h-3",
                    count:
                      "items-center justify-center ml-4 p-1 border rounded-full bg-slate-300 text-gray-700 text-xs",
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="px-4 text-lg font-semibold">Color</h2>
              <div className="sidebar-container">
                <RefinementList
                  attribute={get(RefinementAttributes, "color")}
                  className="mt-4"
                  classNames={{
                    list: "space-y-4",
                    item: "flex items-center space-x-2 text-lg",
                    label: "ml-2",
                    checkbox: "mr-2 h-3",
                    count:
                      "items-center justify-center ml-4 p-1 border rounded-full bg-slate-300 text-gray-700 text-xs",
                  }}
                />
              </div>
            </div>
          </aside>
          <main className="mt-7 px-5 lg:w-3/4">
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} highlight={Highlight} />
              )}
              classNames={{ list: "hit-list", item: "hit-item" }}
            />
            <Pagination
              className="mt-4 flex justify-center"
              classNames={{
                list: "flex justify-center px-4",
                item: "px-4",
                selectedItem: "bg-primary/50 rounded",
              }}
            />
          </main>
        </div>
      </InstantSearch>
      <Link
        to="/cart"
        className={`${isScrolled ? "top-4" : "top-24"} fixed-cart`}
      >
        Go to Cart
        {totalQuantity !== 0 && (
          <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
            {totalQuantity}
          </span>
        )}
      </Link>
      <button
        className={`${isScrolled ? "top-16" : "top-36"} fixed-clear`}
        onClick={clearPastPurchases}
      >
        Clear Past Purchases
      </button>
    </div>
  );
}

export default Home;
