import { useState } from "react";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { ProductAttributes } from "../config/attributesMapping";
import useCart from "../utils/useCart";
import "../styles/index.css";

function Hit({ hit, highlight: Highlight }) {
  const [notification, setNotification] = useState("");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      objectID: hit[ProductAttributes.objectID],
      name: hit[ProductAttributes.name],
      price: get(hit, ProductAttributes.price),
      image: hit[ProductAttributes.image],
      category: get(hit, ProductAttributes.category),
      color: get(hit, ProductAttributes.color),
    };

    addToCart(item);

    setNotification(`Item ${hit[ProductAttributes.objectID]} added to cart`);
    setTimeout(() => {
      setNotification("");
    }, 1000);
  };

  return (
    <article className="hit-card">
      <div className="hit-content">
        <Link
          to={`/product/${encodeURIComponent(hit[ProductAttributes.objectID])}`}
          className="flex justify-center w-full"
        >
          <img
            src={hit[ProductAttributes.image]}
            alt={hit[ProductAttributes.name]}
            className="hit-img"
          />
        </Link>
        <p className="hit-category">{get(hit, ProductAttributes.category)}</p>
        {/* <h1 className="text-xl font-bold mb-2">{hit[ProductAttributes.name]}</h1> */}
        <Highlight
          attribute={ProductAttributes.name}
          hit={hit}
          tagName="h1"
          className="hit-title"
        />
      </div>

      <div className="hit-footer">
        <p className="hit-price">
          ${get(hit, ProductAttributes.price).toFixed(2)}
        </p>
        <div className="hit-actions">
          <button
            className="hit-btn-add"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {notification && (
            <div className="notification-fixed">
              <Link to="/cart" >
                {notification}
              </Link>
            </div>
          )}
          <Link
            to={`/product/${encodeURIComponent(
              hit[ProductAttributes.objectID]
            )}`}
          >
            <button className="hit-btn-view">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Hit;
