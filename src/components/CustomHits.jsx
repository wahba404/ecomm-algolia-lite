import { useHits, Highlight } from "react-instantsearch";
import Hit from "./Hit";

function CustomHits(props) {
    const { items, sendEvent } = useHits(props);

  if (items.length === 0) {
    return (
      <p className="flex justify-center w-full text-center py-8 text-xl font-semibold">
        No results found for your past purchases.
      </p>
    );
  }

  return (
    <div className="flex justify-start items-start p-4 m-4">
      <ul className="flex space-x-2">
        {items.map((hit) => (
          <li
            key={hit.objectID}
            className="p-1 border-2 border-gray-200 rounded shadow-md flex-shrink-0 w-64"
          >
            <Hit hit={hit} highlight={Highlight} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomHits;