import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "./providers/CartProvider";

const Card = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(cartContext);
  const isInCart = cart?.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    removeFromCart(product);
  };

  return (
    <div className="bg-gray-800 rounded shadow-lg p-4 text-white flex flex-col justify-between h-full">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-green-400 font-bold mb-4">
          ${product.price.toFixed(2)}
        </p>
      </Link>

      {!isInCart ? (
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={handleRemoveFromCart}
          className="mt-auto w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
};

export default Card;
