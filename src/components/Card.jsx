import { useContext, useEffect, useState } from "react";
import { cartContext } from "./providers/CartProvider";

const Card = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const { cart, removeFromCart, addToCart } = useContext(cartContext);

  useEffect(() => {
    const isProductInCart = cart.some((item) => item.name === product.name);
    setIsInCart(isProductInCart);
  }, [cart]);

  const hanldeBuyButton = () => {
    if (isInCart) removeFromCart(product);
    else addToCart(product);
  };

  return (
    <div
      className="flex flex-col max-w-[18rem] rounded-lg bg-[#E0E7FF] text-gray-900 shadow-lg
 dark:bg-[#1E293B] dark:text-white hover:scale-105 duration-300"
    >
      <div className="relative overflow-hidden bg-cover bg-no-repeat rounded-t-lg">
        <img
          className=" aspect-[16/9] object-cover rounded-t-lg"
          src={product.img}
          alt="product_image"
        />
      </div>

      <div className="p-6 flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-center">{product.name}</h1>
        <p className="text-lg font-bold text-green-400">${product.price}</p>
        <p className="text-base text-center">{product.description}</p>

        <button
          className={`flex items-center justify-center w-full rounded-md text-white text-lg py-2 px-4
${isInCart ? "bg-red-500 hover:bg-red-400" : "bg-blue-600 hover:bg-blue-700"}`}
          onClick={hanldeBuyButton}
        >
          {isInCart ? "Remove" : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Card;
