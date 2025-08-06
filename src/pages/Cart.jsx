import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { cartContext } from "../components/providers/CartProvider";
import LoadingTruck from "../components/LoadingTruck";

const Cart = () => {
  const { cart, totalCost } = useContext(cartContext);

  if (cart === null) {
    return (
      <div className="flex justify-center items-center bg-[#1E2A78] min-h-screen w-screen">
        <LoadingTruck />
      </div>
    );
  }

  return (
    <div className="bg-[#1E2A78] min-h-screen w-full pt-28 pb-8 px-4 sm:px-14 md:px-28">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Your Shopping Cart
        </h1>

        {cart.length > 0 ? (
          <>
            <div className="mt-12 bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center max-w-2xl mx-auto mb-4">
              <div className="text-white text-2xl font-bold">
                Total: <span className="text-green-400">${totalCost}</span>
              </div>
              <button className="mt-4 sm:mt-0 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Proceed to Checkout
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cart.map((product) => (
                <Card key={product.id} product={product} hideAddToCart={true} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center bg-gray-900 rounded-lg p-10 max-w-lg mx-auto">
            <p className="text-2xl text-gray-300 mb-6">Your cart is empty!</p>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
