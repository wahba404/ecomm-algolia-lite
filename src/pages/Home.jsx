import { useState } from "react";
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
import Hit from "../components/Hit";
import { Link } from "react-router-dom";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

function Home() {
    // Retrieve current cart from local storage
    const [currentCart, setCurrentCart] = useState(
      JSON.parse(localStorage.getItem("cart")) || []
    );
  
    // Calculate the total amount
    const totalQuantity = currentCart.reduce(
      (total, item) => total + item.quantity,
      0
    );

  return (
    <div className="container mx-auto p-8">
      <InstantSearch
        searchClient={searchClient}
        indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
        insights
      >
        <Configure hitsPerPage={12} />
        <div className="mb-4">
          <SearchBox
            classNames={{
              root: "relative",
              input: "w-full p-3 border-2 border-gray-700 rounded",
              submit: "hidden",
              reset: "hidden",
            }}
          />
        </div>
        <CurrentRefinements
          className="flex flex-wrap gap-4 mb-4 hidden md:block"
          classNames={{
            list: "flex",
            item: "items-center bg-gray-200 rounded-full mr-4 p-2 text-sm font-semibold text-gray-700 shadow-lg",
            label:
              "items-center bg-gray-200 rounded-full p-2 text-sm font-semibold text-gray-700",
            category:
              "flex-center bg-gray-200 rounded-full mr-1/2 text-sm font-semibold text-gray-700",
            categoryLabel:
              "flex-center bg-gray-200 rounded-full p-1/2 text-sm font-semibold text-gray-700",
            delete: "px-3 hover:text-red-900 hover:bg-red-100 rounded-full"
          }}
        />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/5 mb-4 lg:mb-0 flex flex-col space-y-4 hidden lg:block">
            <div>
              <h2 className="px-4 text-lg font-semibold ">Category</h2>
              <div className="border border-gray-300 shadow-lg p-4 rounded">
                <RefinementList
                  attribute="category 1"
                  className="mt-4"
                  classNames={{
                    list: "space-y-4",
                    item: "flex items-center space-x-2 text-lg",
                    label: "ml-2",
                    checkbox: "mr-2 h-3",
                    count: "items-center justify-center ml-4 p-1 border rounded-full bg-slate-300 text-gray-700 text-xs",
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="px-4 text-lg font-semibold">Color</h2>
              <div className="border border-gray-300 shadow-lg p-4 rounded">
                <RefinementList
                  attribute="color"
                  className="mt-4"
                  classNames={{
                    list: "space-y-4",
                    item: "flex items-center space-x-2 text-lg",
                    label: "ml-2",
                    checkbox: "mr-2 h-3",
                    count: "items-center justify-center ml-4 p-1 border rounded-full bg-slate-300 text-gray-700 text-xs",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 mt-7 px-5">
            <Hits
              hitComponent={({ hit }) => (
                <Hit hit={hit} highlight={Highlight} />
              )}
              classNames={{
                list: "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-6 gap-5",
                item: "p-2 border-2 border-gray-200 rounded shadow-md",
              }}
            />
            <Pagination
              className="flex justify-center mt-4"
              classNames={{
                list: "flex justify-center px-4",
                item: "px-4",
                selectedItem: "bg-blue-300 rounded",
              }}
            />
          </div>
        </div>
      </InstantSearch>
      <Link
        to="/cart"
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Go to Cart
        {totalQuantity !== 0 && (
      <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
        {totalQuantity}
      </span>
        )}
      </Link>
    </div>
  );
}

export default Home;
