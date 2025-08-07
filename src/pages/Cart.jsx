import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { cartContext } from "../components/providers/CartProvider";
import { toast } from "react-toastify";
import { UserContext } from "../components/providers/UserProvider";
import { ProductsContext } from "../components/providers/ProductsProvider";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../Firebase-config";

const Cart = () => {
  const { cart, totalCost, clearCart } = useContext(cartContext);
  const { setLoading } = useContext(ProductsContext);
  const { userData } = useContext(UserContext);
  const handleCompletePurchase = async () => {
    if (!userData) {
      return toast.error("You must be logged in to make a purchase.");
    }
    setLoading(true);

    try {
      
      const userDocRef = doc(firestore, "users", userData.uid);

      
      const userDoc = await getDoc(userDocRef);

      
      const oldLifetimeCost = userDoc.data()?.lifetimeTotalCost || 0;
      const newLifetimeCost = oldLifetimeCost + totalCost;


      await setDoc(
        userDocRef,
        { lifetimeTotalCost: newLifetimeCost },
        { merge: true }
      );

  
      const ordersCollectionRef = collection(firestore, "orders");
      const orderData = {
        userId: userData.uid,
        items: cart,
        totalCost: totalCost,
        createdAt: serverTimestamp(),
        status: "Processing",
      };
      await addDoc(ordersCollectionRef, orderData);
      clearCart();
      toast.success("Purchase completed successfully!");
    } catch (error) {
      console.error("Error completing purchase: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <button
                className="mt-4 sm:mt-0 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                onClick={handleCompletePurchase}
              >
                Complete Purchase
              </button>
              <button
                onClick={clearCart}
                className="mt-4 sm:mt-0 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 sm:ml-4"
              >
                Empty Cart
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
