import { Link } from "react-router-dom";
import useCart from "../utils/useCart";
import "../styles/index.css";

function Cart() {
  const {
    currentCart,
    totalQuantity,
    totalAmount,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeAllItems,
    addPastPurchases,
    clearPastPurchases,
  } = useCart();

  return (
    <div className="cart-page">
      {/* Back navigation */}
      <div className="absolute top-4 left-4 p-6">
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
      <h1 className="text-4xl font-bold my-8">Cart Page</h1>
      <div className="cart-grid">
        {/* Cart items */}
        <div>
          {currentCart.length > 0 ? (
            currentCart.map((item, index) => (
              <div
                key={index}
                className="cart-item-card"
              >
                <div className="cart-item-body">
                  <img
                    src={item["image"]}
                    alt={item["name"]}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <Link
                      to={`/product/${encodeURIComponent(item["objectID"])}`}
                    >
                      <h1 className="cart-item-title">
                        {item["name"]}
                      </h1>
                    </Link>
                    <p className="cart-item-category">{item["category"]}</p>
                    <p className="cart-item-price">
                      ${item["price"].toFixed(2)}
                    </p>
                    <p className="cart-item-quantity">
                      Quantity: {item["quantity"]}
                    </p>
                    <div className="cart-item-actions">
                      <button
                        className="cart-item-button"
                        onClick={() => decrementQuantity(item.objectID)}
                      >
                        -
                      </button>
                      <button
                        className="cart-item-button"
                        onClick={() => incrementQuantity(item.objectID)}
                      >
                        +
                      </button>
                      <button
                        className="cart-item-button"
                        onClick={() => removeItem(item.objectID)}
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
        {/* Cart summary */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>
          <p className="cart-summary-text">Total Items: {totalQuantity}</p>
          <p className="cart-summary-text">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <div className="cart-summary-actions">
            <button
              className="checkout-button"
              onClick={() => {
                addPastPurchases();
                removeAllItems();
              }}
            >
              Proceed to Checkout
            </button>
            <button
              className="clear-past-button"
              onClick={clearPastPurchases}
            >
              Clear Past Purchases
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
