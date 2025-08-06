import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { ProductsContext } from "../components/providers/ProductsProvider";
import LoadingTruck from "../components/LoadingTruck";

const Home = () => {
  const { products, loading } = useContext(ProductsContext);
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(inputValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  const filteredProducts = products.filter(
    (product) =>
      product &&
      product.title &&
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-[#1E2A78] min-h-screen w-screen flex items-center justify-center">
        <LoadingTruck />
      </div>
    );
  }

  return (
    <div className="bg-[#1E2A78] min-h-screen w-full pt-28 pb-8 px-4 sm:px-14 md:px-28">
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center">
            <p>
              <span className="text-2xl text-gray-300">No items found</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
