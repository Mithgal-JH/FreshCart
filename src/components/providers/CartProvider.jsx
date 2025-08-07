import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { firestore } from "../../Firebase-config";
import {
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";


export const cartContext = createContext(null);

const CartProvider = ({ children }) => {
  const { userIn, userData } = useContext(UserContext);

  const [cart, setCart] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    let unsubscribe = () => {};

    if (userIn && userData?.email) {
      const cartRef = doc(firestore, "carts", userData.email);

      unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          const cartData = docSnap.data().items || [];
          setCart(cartData);

          const total = cartData.reduce((sum, item) => sum + item.price, 0);
          setTotalCost(total.toFixed(2));
          setCartItemCount(cartData.length);
        } else {
          setDoc(cartRef, { items: [] });
          setCart([]);
          setTotalCost(0);
          setCartItemCount(0);
        }
      });
    } else {
      setCart([]);
      setTotalCost(0);
      setCartItemCount(0);
    }

    return () => unsubscribe();
  }, [userIn, userData]);

  const addToCart = async (product) => {
    const cartRef = doc(firestore, "carts", userData.email);
    await updateDoc(cartRef, {
      items: arrayUnion(product),
    });
  };

  const removeFromCart = async (product) => {
    const cartRef = doc(firestore, "carts", userData.email);
    await updateDoc(cartRef, {
      items: arrayRemove(product),
    });
  };

  const clearCart = async () => {
    if (!userData?.email) return;
    const cartRef = doc(firestore, "carts", userData.email);
    await setDoc(cartRef, { items: [] }); 
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalCost,
        cartItemCount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
