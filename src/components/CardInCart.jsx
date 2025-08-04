import React, { useState } from "react";

const CardInCart = ({ product, addToCart, removeFromCart }) => {
  const [clicked, setClicked] = useState(false);

  const hanldeBuyButton = () => {
    if (clicked) {
      addToCart(product);
    } else {
      removeFromCart(product);
    }
    setClicked(!clicked);
  };

  return (
    <div
      class=" flex flex-col max-w-[18rem] rounded-lg bg-gray-500 text-surface shadow-secondary-1 
              dark:bg-surface-dark dark:text-white hover:scale-95 duration-300 "
    >
      <div class="relative overflow-hidden bg-cover bg-no-repeat">
        <img class="rounded-t-lg" src={product.img} alt="product_image" />
      </div>
      <div class="p-6">
        <div className="flex items-center  flex-col">
          <h1 className="text-black ">{product.name}</h1>
          <p class="text-base">{product.description}</p>
        </div>

        <button
          className={`w-full rounded-md text-white text-lg py-1 px-2 ${
            clicked
              ? "bg-blue-500 hover:bg-blue-400"
              : "bg-red-500 hover:bg-red-400"
          }  `}
          onClick={hanldeBuyButton}
        >
          {clicked ? "Buy" : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CardInCart;
