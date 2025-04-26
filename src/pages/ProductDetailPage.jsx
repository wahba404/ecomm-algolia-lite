import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import get from "lodash/get";
import { algoliasearch } from "algoliasearch";
import { liteClient } from "algoliasearch/lite";
import {
  InstantSearch,
  LookingSimilar,
  Highlight,
} from "react-instantsearch";
import Hit from "../components/Hit";
import { ProductAttributes } from "../config/attributesMapping";
import useCart from "../utils/useCart";
import '../styles/index.css';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

const search2 = liteClient(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);

// --------------------------------------------------------------------------------
// dummy default product data
const product = {
  id: 1,
  name: "Sample Product",
  category: "Sample Category",
  description: "This is a detailed description of the sample product.",
  price: 29.99,
  imageUrl: "https://via.placeholder.com/300",
};
// --------------------------------------------------------------------------------

function ProductDetailPage() {
  const { id } = useParams();
  const objectID = decodeURIComponent(id);
  const [response, setResponse] = useState(null);
  const [notification, setNotification] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchClient.getObject({
          indexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME,
          objectID: objectID,
          attributesToRetrieve: ["*"],
        });
        setResponse(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [objectID]);

  const handleAddToCart = () => {
    const item = {
      objectID: get(response, ProductAttributes.objectID),
      name: get(response, ProductAttributes.name),
      price: get(response, ProductAttributes.price),
      image: get(response, ProductAttributes.image),
      category: get(response, ProductAttributes.category),
      color: get(response, ProductAttributes.color),
    };

    addToCart(item);

    setNotification(`Item ${get(response, ProductAttributes.objectID)} added to cart`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="container-page relative">
      {/* Navigation links with reusable primary button style */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link
          to="/"
          className="btn-primary"
        >
          Back to Home
        </Link>
        <Link
          to="/cart"
          className="btn-primary"
        >
          Go to Cart
        </Link>
      </div>
      <article className="flex flex-col items-center">
        {/* Main product image */}
        <img
          src={get(response, ProductAttributes.image) || product.imageUrl}
          alt={get(response, ProductAttributes.name) || product.name}
          className="w-1/2 max-w-xs h-auto mb-4 rounded"
        />
        {/* Product details */}
        <h1 className="product-title">
        {get(response, ProductAttributes.name) || product.name}
        </h1>
        <p className="product-category0">
        {get(response, ProductAttributes.category) || product.category}
        </p>
        <p className="product-price">
        ${get(response, ProductAttributes.price)?.toFixed(2) || product.price}
        </p>
        <p className="product-description">
        {get(response, ProductAttributes.description) || product.description}
        </p>
        {/* Add to Cart button and notification */}
        <div className="relative flex justify-center items-center space-x-2 mt-2">
          <button
            className="btn-success"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {notification && (
            <div className="notification">
              <Link to="/cart" className="flex">
                {notification}
              </Link>
            </div>
          )}
        </div>
      </article>
      <div className="container-page mt-4">
        <div className="divider mb-4"></div>
        <h2 className="text-xl font-semibold mt-12">Similar Products</h2>
        {get(response, ProductAttributes.objectID) ? (
          <InstantSearch
            searchClient={search2}
            indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
          >
            <LookingSimilar
              objectIDs={[get(response, ProductAttributes.objectID)]}
              limit={5}
              itemComponent={({ item }) => (
                <Hit hit={item} highlight={Highlight} />
              )}
              classNames={{
                title: "hidden",
                root: "w-full overflow-x-scroll flex",
                list: "mt-4 w-full overflow-x-scroll flex",
                item: "mr-4 p-1 border-2 border-gray-200 rounded shadow-md flex-shrink-0 w-64",
              }}
            />
          </InstantSearch>
        ) : (
          <p>No similar products found</p>
        )}
      </div>
    </div>
  );
}
export default ProductDetailPage;
