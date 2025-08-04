import { useContext } from "react";
import Card from "../components/Card";
import { cartContext } from "../components/providers/CartProvider";

const Cart = () => {
  const { cart } = useContext(cartContext);
  return (
    <div className="flex justify-center items-center gap-6 flex-wrap bg-[#1E2A78] min-h-screen h-full w-screen pt-28 pb-8 px-28">
      {cart.length > 0 ? (
        cart.map((product) => <Card key={product.id} product={product} />)
      ) : (
        <p>
          <span className="text-2xl text-gray-300">No items in cart</span>
        </p>
      )}
    </div>
  );
};

export default Cart;
