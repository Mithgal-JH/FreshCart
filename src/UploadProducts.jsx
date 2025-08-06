import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "./Firebase-config";

const UploadProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const handleUpload = () => {
    const productsCollectionRef = collection(firestore, "products");
    products.forEach(async (product) => {
      const docRef = await addDoc(productsCollectionRef, product);
    });
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload products to firebase</button>
    </div>
  );
};

export default UploadProducts;
