import React from "react";
import CartProvider from "./components/providers/CartProvider";
import ProductsProvider from "./components/providers/ProductsProvider";
import UserProvider from "./components/providers/UserProvider";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
};

export default AppProviders;
