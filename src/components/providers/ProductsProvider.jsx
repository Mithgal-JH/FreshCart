import React, { createContext, useState } from "react";
export const ProductsContext = createContext(null);
const ProductsProvider = ({ children }) => {
  const [products] = useState([
    {
      name: "Apple iPhone 15 Pro",
      description:
        "6.1-inch Super Retina XDR display, A17 Pro chip, 48MP camera, Titanium body.",
      img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=600&hei=600&fmt=jpeg&qlt=90&.v=1693011163398",
      price: 999,
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      description:
        "6.8-inch AMOLED 2X, Snapdragon 8 Gen 3, 200MP camera, S Pen included.",
      img: "https://images.samsung.com/ps/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg?imbypass=true",
      price: 1299,
    },
    {
      name: "Sony WH-1000XM5",
      description:
        "Noise-canceling over-ear headphones with 30-hour battery and Hi-Res Audio.",
      img: "https://al-arabi.ps/uploads/product_image/image/6484/124.png",
      price: 399,
    },
    {
      name: "MacBook Air M2",
      description:
        "13.6-inch Liquid Retina, Apple M2 chip, fanless design, ultra-lightweight.",
      img: "https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Air-M2-availability-July-2022-hero_big.jpg.large_2x.jpg",
      price: 1099,
    },
    {
      name: "Logitech MX Master 3S",
      description:
        "Ergonomic wireless mouse with MagSpeed scroll, silent clicks, 8000 DPI.",
      img: "https://www.lttlabs.com/_next/image/?url=https%3A%2F%2Fs3.wasabisys.com%2Flabs-web-static-assets%2Fproduct-admin%2F1732825654114-Logitech--Mx%20Master%203s.png&w=1200&q=75",
      price: 99,
    },
    {
      name: "Google Pixel 8 Pro",
      description:
        "6.7-inch Super Actua display, Google Tensor G3 chip, Pro camera system, 7 years of OS updates.",
      img: "https://m.media-amazon.com/images/I/71h9zq4viSL._AC_SX679_.jpg",
      price: 999,
    },
    {
      name: "Dell XPS 15",
      description:
        "15.6-inch InfinityEdge display, Intel Core processors, NVIDIA GeForce RTX graphics.",
      img: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/pdp/pdp-images/notebook-xps-15-9530-pdp-mod-fuel-creation.psd?wid=1900&hei=787&fmt=png-alpha&qlt=100%2c0&op_usm=1.75%2c0.3%2c2%2c0&resMode=sharp2&pscan=auto&fit=constrain%2c1&align=0%2c0",
      price: 1699,
    },
    {
      name: "Bose QuietComfort Ultra Headphones",
      description:
        "Immersive audio headphones with world-class noise cancellation and personalized sound.",
      img: "https://images-na.ssl-images-amazon.com/images/I/51QeS0jkx-L._AC_UL165_SR165,165_.jpg",
      price: 429,
    },
    {
      name: "Apple Watch Ultra 2",
      description:
        "Rugged titanium case, advanced metrics for athletes, brightest Apple display ever.",
      img: "https://www.apple.com/v/apple-watch-ultra-2/g/images/overview/design/design_action__f6snt21ejg2u_large_2x.jpg",
      price: 799,
    },
    {
      name: "Nintendo Switch – OLED Model",
      description:
        "7-inch OLED screen, adjustable stand, enhanced audio, 64 GB of internal storage.",
      img: "https://snpi.dell.com/snp/images/products/large/en-us~AB926162_V2/AB926162_V2.jpg",
      price: 349,
    },
  ]);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
