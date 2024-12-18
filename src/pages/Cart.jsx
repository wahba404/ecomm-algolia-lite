import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  // Retrieve current cart from local storage
  const [currentCart, setCurrentCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Calculate the total amount
  const totalAmount = currentCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //   Decrement quantity
  const decrementQuantity = (index) => {
    const newCart = [...currentCart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCurrentCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //  Increment quantity
  const incrementQuantity = (index) => {
    const newCart = [...currentCart];
    newCart[index].quantity += 1;
    setCurrentCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //  Remove item from cart
  const removeItem = (index) => {
    const newCart = [...currentCart];
    newCart.splice(index, 1);
    setCurrentCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //   Remove all items from cart
  const removeAllItems = () => {
    setCurrentCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 bg-white shadow-md rounded-lg p-6">
        <Link to="/" className="text-blue-500">
          Back to Home
        </Link>
      </div>
      <h1 className="text-4xl font-bold my-8">Cart Page</h1>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {currentCart.length > 0 ? (
            currentCart.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
              >
                <div className="flex items-center p-4">
                  <img
                    src={item["image"]}
                    alt={item["name"]}
                    className="w-32 h-32 object-cover rounded mr-4"
                  />
                  <div className="flex flex-col justify-between">
                    <Link
                      to={`/product/${encodeURIComponent(item["objectID"])}`}
                    >
                      <h1 className="text-2xl font-bold mb-2">
                        {item["name"]}
                      </h1>
                    </Link>
                    <p className="text-gray-500">{item["category"]}</p>
                    <p className="text-lg text-green-600">${item["price"]}</p>
                    <p className="mt-2 text-gray-700">
                      Quantity: {item["quantity"]}
                    </p>
                    <div className="flex mt-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => decrementQuantity(index)}
                      >
                        -
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => incrementQuantity(index)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <p className="text-lg mb-2">Total Items: {currentCart.length}</p>
          <p className="text-lg mb-2">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
            onClick={removeAllItems}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;