import { useContext, useState } from "react";
import Card from "../components/Card";
import { ProductsContext } from "../components/providers/ProductsProvider";

const Home = () => {
  const { products } = useContext(ProductsContext);
  const [searchQuery, setSearchQuery] = useState("");

  const newProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#1E2A78] min-h-screen w-full pt-28 pb-8 px-4 sm:px-14 md:px-28">
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-center items-center gap-6 flex-wrap">
        {newProducts.length > 0 ? (
          newProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p>
            <span className="text-2xl text-gray-300">No items found</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
