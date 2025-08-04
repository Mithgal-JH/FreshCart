import { useContext } from "react";
import Card from "../components/Card";
import { ProductsContext } from "../components/providers/ProductsProvider";

const Home = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="flex justify-center items-center gap-6 flex-wrap bg-[#1E2A78] min-h-screen h-full w-screen pt-28 pb-8 px-28">
      {products.length > 0 ? (
        products.map((product) => <Card key={product.id} product={product} />)
      ) : (
        <p>
          <span className="text-2xl text-gray-300">No items found</span>
        </p>
      )}
    </div>
  );
};

export default Home;
