import React, { useContext } from "react";
import { cartContext } from "./providers/CartProvider";
import { Link } from "react-router-dom";

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
      </Link>

      <Link className="flex items-center justify-between mb-3">
        <p className="text-green-400 font-bold text-lg">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex items-center space-x-1">
          <span className="text-yellow-400 font-semibold text-sm">
            {product.rating?.rate?.toFixed(1) || "N/A"}
          </span>
          <svg
            className="w-4 h-4 fill-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
          </svg>
          <span className="text-gray-400 text-xs">
            ({product.rating?.count || 0})
          </span>
        </div>
      </Link>

      {!isInCart ? (
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={handleRemoveFromCart}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
};

export default Card;
