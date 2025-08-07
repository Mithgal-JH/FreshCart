import { useContext, useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import { ProductsContext } from "../components/providers/ProductsProvider";
import LoadingTruck from "../components/LoadingTruck";

const FilterControls = ({
  inputValue,
  onInputChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedRating,
  onRatingChange,
  selectedPrice,
  onPriceChange,
}) => (
  <div className="mb-8 max-w-xl mx-auto flex flex-col gap-4">
    <input
      type="text"
      value={inputValue}
      onChange={onInputChange}
      placeholder="Search for products..."
      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={onCategoryChange}
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="rating-select"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Rating
        </label>
        <select
          id="rating-select"
          value={selectedRating}
          onChange={onRatingChange}
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="0">All Ratings</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="2">2 Stars & Up</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="price-select"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Price
        </label>
        <select
          id="price-select"
          value={selectedPrice}
          onChange={onPriceChange}
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="all">All Prices</option>
          <option value="20">Under $20</option>
          <option value="50">Under $50</option>
          <option value="100">Under $100</option>
          <option value="101">Over $100</option>
        </select>
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {products.length > 0 ? (
      products.map((product) => <Card key={product.id} product={product} />)
    ) : (
      <div className="col-span-full text-center py-10 bg-gray-900 rounded-lg">
        <p className="text-2xl text-gray-300">No items found</p>
        <p className="text-gray-400 mt-2">
          Try adjusting your search or filters.
        </p>
      </div>
    )}
  </div>
);

const Home = () => {
  const { products, loading } = useContext(ProductsContext);

  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("0");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchQuery(inputValue), 300);
    return () => clearTimeout(timerId);
  }, [inputValue]);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product?.title) return false;

      let priceCondition;

      if (selectedPrice === "20") {
        priceCondition = product.price < 20;
      } else if (selectedPrice === "50") {
        priceCondition = product.price < 50;
      } else if (selectedPrice === "100") {
        priceCondition = product.price < 100;
      } else if (selectedPrice === "101") {
        priceCondition = product.price >= 100;
      } else {
        priceCondition = true;
      }

      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;
      const searchMatch = product.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      const ratingMatch = product.rating.rate >= Number(selectedRating);

      return categoryMatch && searchMatch && ratingMatch && priceCondition;
    });
  }, [
    products,
    selectedCategory,
    debouncedSearchQuery,
    selectedRating,
    selectedPrice,
  ]);

  if (loading) {
    return (
      <div className="bg-[#1E2A78] min-h-screen w-screen flex items-center justify-center">
        <LoadingTruck />
      </div>
    );
  }

  return (
    <div className="bg-[#1E2A78] min-h-screen w-full pt-28 pb-8 px-4 sm:px-14 md:px-28">
      <FilterControls
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e.target.value)}
        selectedCategory={selectedCategory}
        onCategoryChange={(e) => setSelectedCategory(e.target.value)}
        categories={categories}
        selectedRating={selectedRating}
        onRatingChange={(e) => setSelectedRating(e.target.value)}
        selectedPrice={selectedPrice}
        onPriceChange={(e) => setSelectedPrice(e.target.value)}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Home;
