import React, { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../../Firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
export const cartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [totalCost, setTotalCost] = useState(() => {
    try {
      const storedCost = localStorage.getItem("totalCost");
      return storedCost ? JSON.parse(storedCost) : 0;
    } catch {
      return 0;
    }
  });

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const userCartRef = doc(firestore, "carts", user.uid);
        const docSnap = await getDoc(userCartRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          const storedCart = localStorage.getItem("cart");
          if (!storedCart || storedCart === "[]" || cart.length === 0) {
            setCart(data.cart || []);
            setTotalCost(data.totalCost || 0);
            localStorage.setItem("cart", JSON.stringify(data.cart || []));
            localStorage.setItem(
              "totalCost",
              JSON.stringify(data.totalCost || 0)
            );
          }
        }
      };
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalCost", JSON.stringify(totalCost));
  }, [cart, totalCost]);

  useEffect(() => {
    if (user) {
      const userCartRef = doc(firestore, "carts", user.uid);
      setDoc(userCartRef, { cart, totalCost }).catch((err) => {
        console.error("Failed to update Firestore cart:", err);
      });
    }
  }, [cart, totalCost, user]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setTotalCost((prev) => prev + product.price);
  };

  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((item) => item.name !== product.name));
    setTotalCost((prev) => prev - product.price);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        totalCost,
        setTotalCost,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
