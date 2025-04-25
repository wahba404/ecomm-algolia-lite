import { useState, useEffect, useCallback } from "react";

export default function useCart() {
  // Retrieve current cart from local storage
  const [currentCart, setCurrentCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Calculate the total number of items and total amount
  const totalQuantity = currentCart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = currentCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Sync state when cart is changed in another tab
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentCart(JSON.parse(localStorage.getItem("cart")) || []);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Persist updated cart to localStorage and state
  const updateCart = useCallback((updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCurrentCart(updatedCart);
  }, []);

  const addToCart = useCallback(
    (item) => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = [...storedCart];
      const existing = updatedCart.find(
        (ci) => ci.objectID === item.objectID
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      updateCart(updatedCart);
    },
    [updateCart]
  );

  const incrementQuantity = useCallback(
    (objectID) => {
      const updatedCart = currentCart.map((item) =>
        item.objectID === objectID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCart(updatedCart);
    },
    [currentCart, updateCart]
  );

  const decrementQuantity = useCallback(
    (objectID) => {
      let updatedCart = currentCart.map((item) => ({ ...item }));
      const index = updatedCart.findIndex((i) => i.objectID === objectID);
      if (index !== -1) {
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          updatedCart.splice(index, 1);
        }
      }
      updateCart(updatedCart);
    },
    [currentCart, updateCart]
  );

  const removeItem = useCallback(
    (objectID) => {
      const updatedCart = currentCart.filter(
        (item) => item.objectID !== objectID
      );
      updateCart(updatedCart);
    },
    [currentCart, updateCart]
  );

  const removeAllItems = useCallback(() => {
    localStorage.removeItem("cart");
    setCurrentCart([]);
  }, []);

  const addPastPurchases = useCallback(() => {
    const pastPurchases =
      JSON.parse(localStorage.getItem("pastPurchases")) || [];
    const merged = [...pastPurchases, ...currentCart];
    localStorage.setItem("pastPurchases", JSON.stringify(merged));
  }, [currentCart]);

  const clearPastPurchases = useCallback(() => {
    localStorage.removeItem("pastPurchases");
    window.location.reload();
  }, []);

  return {
    currentCart,
    totalQuantity,
    totalAmount,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    removeAllItems,
    addPastPurchases,
    clearPastPurchases,
  };
}