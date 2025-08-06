import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../components/providers/ProductsProvider";
import { cartContext } from "../components/providers/CartProvider";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const { cart, addToCart, removeFromCart } = useContext(cartContext);

  if (loading) return <div className="text-white">Loading...</div>;

  const product = products.find((p) => p.id == id);
  const isInCart = cart?.some((item) => item.id == id);

  if (!product) {
    return (
      <div className="text-white text-center mt-28">
        <h1>Product not found 😢</h1>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`Added "${product.title}" to cart!`);
  };

  const handleRemove = () => {
    removeFromCart(product);
    toast.error(`Removed "${product.title}" from cart`);
  };

  return (
    <div className="min-h-screen bg-[#1E2A78] pt-28 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-xl mx-auto bg-[#1E2A78] rounded-lg shadow-lg overflow-hidden p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-80 object-contain mb-6 rounded"
          style={{ maxWidth: "100%" }}
        />

        <h1 className="text-3xl font-bold text-white mb-2 break-words">
          {product.title}
        </h1>

        <p className="text-sm text-gray-300 italic mb-4 break-words">
          Category: {product.category}
        </p>

        <p className="text-gray-100 mb-6 whitespace-pre-line break-words">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-yellow-400">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">Rating:</span>

            <span className="text-yellow-400 font-bold">
              {product.rating?.rate || "N/A"}
            </span>

            <span className="text-gray-300">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>
        </div>

        {!isInCart ? (
          <button
            onClick={handleAdd}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
