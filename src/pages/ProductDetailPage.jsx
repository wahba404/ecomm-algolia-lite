import { useEffect, useState } from "react";
import { algoliasearch } from "algoliasearch";
import { liteClient } from "algoliasearch/lite";
import { useParams, Link } from "react-router-dom";
import {
  InstantSearch,
  LookingSimilar,
  Carousel,
  Highlight,
} from "react-instantsearch";
import Hit from "../components/Hit";
import { ProductAttributes } from '../utils/AttributesMapping';

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

  //   useEffect(() => {
  //     console.log(objectID);
  //     }, [objectID]);

  //   useEffect(() => {
  //     console.log(response);
  //     }, [response]);

  const [notification, setNotification] = useState("");

  const handleAddToCart = () => {
    // Retireve current cart from local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const itemInCart = currentCart.find(
      (item) => item.objectID === response?.objectID
    );
    // If the item is already in the cart, increase the quantity
    if (itemInCart) {
      itemInCart.quantity += 1;
    }
    // If the item is not in the cart, add it

    // --------------------------------------------------------------------------------
    // *** ADJUST ATTRIBUTE NAME HERE. DO NOT CHANGE KEY NAME ***
    // --------------------------------------------------------------------------------
    else {
      currentCart.push({
        objectID: response?.[ProductAttributes.objectID],
        name: response?.[ProductAttributes.name],
        price: response?.[ProductAttributes.price],
        image: response?.[ProductAttributes.image],
        category: response?.[ProductAttributes.category],
        color: response?.[ProductAttributes.color],
        quantity: 1,
      });
    // --------------------------------------------------------------------------------
    }
    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Display a notification
    setNotification(`Item ${response?.[ProductAttributes.objectID]} added to cart`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8 relative">
      <div className="absolute top-4 left-4 flex space-x-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Back to Home
        </Link>
        <Link
          to="/cart"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Go to Cart
        </Link>
      </div>
      <article className="flex flex-col items-center">
        {/* ADJUST ATTRIBUTE NAMES BELOW */}
        <img
          src={response?.[ProductAttributes.image] || product.imageUrl}
          alt={response?.[ProductAttributes.name] || product.name}
          className="w-1/2 max-w-xs h-auto mb-4 rounded"
        />
        <h1 className="text-2xl font-bold mb-2">
          {response?.[ProductAttributes.name] || product.name}
        </h1>
        <p className="text-gray-500">
          {response?.[ProductAttributes.category] || product.category}
        </p>
        <p className="text-lg text-green-600">
          ${response?.[ProductAttributes.price] || product.price}
        </p>
        <p className="mt-4 text-gray-700">
          {response?.[ProductAttributes.description] || product.description}
        </p>
        {/*  */}

        <div className="relative flex justify-center items-center space-x-2 mt-2">
          <button
            className="bg-green-500 text-white text-xl px-8 py-1.5 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {notification && (
            <div className="absolute top-full mt-2 w-[64rem] bg-green-500 bg-opacity-75 text-white text-lg px-6 py-4 rounded">
              <Link to="/cart" className="flex">
                {notification}
              </Link>
            </div>
          )}
        </div>
      </article>
      <div className="container mx-auto p-8 mt-4">
        <div className="border-b border-gray-300 mb-4"></div>
        <div className="mt-12 w-full flex justify-start items-start">
          <p className="w-full text-start text-xl font-semibold">
            Similar Products
          </p>
        </div>
        {response?.[ProductAttributes.objectID] ? (
          <InstantSearch
            searchClient={search2}
            indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
          >
            <LookingSimilar
              objectIDs={[response?.[ProductAttributes.objectID]]}
              limit={5}
              itemComponent={({ item }) => (
                <Hit hit={item} highlight={Highlight} />
              )}
              classNames={{
                title: "hidden",
                root: "w-full overflow-x-scroll flex justify-start items-start",
                list: "mt-4 w-full overflow-x-scroll flex justify-start items-start",
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
