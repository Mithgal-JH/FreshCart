import React from "react";

const CardDetails = ({ product }) => {
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-8 p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-h-96 object-contain mb-6 rounded"
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
      <p className="text-sm text-gray-500 italic mb-4">
        Category: {product.category}
      </p>

      <p className="text-gray-700 mb-6 whitespace-pre-line">
        {product.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold text-blue-600">
          ${product.price.toFixed(2)}
        </span>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Rating:</span>
          <span className="text-yellow-500 font-bold">
            {product.rating?.rate || "N/A"}
          </span>
          <span className="text-gray-500">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>
      </div>

      <button
        onClick={() => alert(`Added ${product.title} to cart!`)}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CardDetails;
