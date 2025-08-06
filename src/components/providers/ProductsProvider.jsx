import React, { createContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../Firebase-config";
export const ProductsContext = createContext(null);
const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const productSnapshot = await getDocs(productsCollection);

        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products,loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
