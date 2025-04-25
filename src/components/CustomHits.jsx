import { useHits, Highlight } from "react-instantsearch";
import Hit from "./Hit";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/index.css";

function CustomHits(props) {
  const { items, sendEvent } = useHits(props);

  if (items.length === 0) {
    return (
      <p className="hits-empty">
        No results found for your past purchases.
      </p>
    );
  }

  return (
    <div className="custom-hits-wrapper">
      <LoadingIndicator />
      <ul className="custom-hits-list">
        {items.map((hit) => (
          <li
            key={hit.objectID}
            className="custom-hits-item"
          >
            <Hit hit={hit} highlight={Highlight} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomHits;
