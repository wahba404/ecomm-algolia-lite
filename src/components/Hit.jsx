import { useState } from "react";
import { Link } from "react-router-dom";

function Hit({ hit, highlight: Highlight }) {
  const [notification, setNotification] = useState("");

  const handleAddToCart = () => {
    // Retireve current cart from local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const itemInCart = currentCart.find(
      (item) => item.objectID === hit.objectID
    );
    // If the item is already in the cart, increase the quantity
    if (itemInCart) {
      itemInCart.quantity += 1;
    }
    // If the item is not in the cart, add it

    //
    // *** ADJUST ATTRIBUTE NAME HERE. DO NOT CHANGE KEY NAME ***
    //
    else {
      currentCart.push({
        objectID: hit["objectID"],
        name: hit["product name"],
        price: hit["sale price"],
        image: hit["large image url"],
        category: hit["category 1"],
        color: hit["color"],
        quantity: 1,
      });
    }
    // 
    // 

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Display a notification
    setNotification(`Item ${hit.objectID} added to cart`);
    setTimeout(() => {
      setNotification("");
    }, 1000);
  };

  return (
    <article className="flex flex-col items-center p-2 h-full">
      <div className="flex flex-col items-center flex-grow">
        <Link
          to={`/product/${encodeURIComponent(hit.objectID)}`}
          className="flex justify-center w-full"
        >
          {/* ADJUST ATTRIBUTE NAME BELOW */}
          <img
            src={hit["large image url"]}
            alt={hit["product name"]}
            className="w-1/2 max-w-xs h-auto mb-2 rounded object-cover"
          />
          {/*  */}
        </Link>
        {/* ADJUST ATTRIBUTE NAME BELOW */}
        <p className="text-gray-500">{hit["category 1"]}</p>
        {/*  */}

        {/* ADJUST ATTRIBUTE NAME BELOW */}
        {/* <h1 className="text-xl font-bold mb-2">{hit["product name"]}</h1> */}
        <Highlight
          attribute="product name"
          hit={hit}
          tagName="h1"
          className="text-xl h-12 text-center font-bold mb-2 break-words"
        />
        {/*  */}
      </div>
      <div className="flex flex-col items-center w-full  mt-4 md:mt-6 lg:mt-8">

        {/* ADJUST ATTRIBUTE NAME BELOW */}
        <p className="text-lg text-green-600">${hit["sale price"]}</p>
        {/*  */}
        <div className="flex justify-center items-center space-x-2 mt-2">
          <button
            className="bg-green-500 text-white text-sm px-2 py-1 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {notification && (
            <div className="absolute top-24 right-1 mt-2 mr-2 bg-green-500 bg-opacity-75 text-white text-lg px-6 py-4 rounded">
              <Link to="/cart" className="flex">
                {notification}
              </Link>
            </div>
          )}
          <Link to={`/product/${encodeURIComponent(hit.objectID)}`}>
            <button className="bg-gray-500 text-white text-sm px-2 py-1 rounded">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Hit;
