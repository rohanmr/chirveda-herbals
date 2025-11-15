import React, { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import products from "../data/productsData";
import ProductCard from "../components/Card/ProductCard";
import { useLocation } from "react-router-dom";

const ProductPage = () => {

  const [filteredProducts, setFilteredProducts] = useState(products);

  const { search } = useLocation();


  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const searchQuery = queryParams.get("search")?.toLowerCase() || "";

    if (searchQuery) {
      const filtered = products.filter(product =>
        Object.values(product).some(value =>
          String(value).toLowerCase().includes(searchQuery)
        )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // show all products when search is empty
    }

  }, [search]);



  return (
    <>
      <SectionHeading
        title="Our"
        highlight="Products"
        subtitle="Made with real aloe vera and natural botanicals for healthy, radiant skin that breathes with nature’s glow. "
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => <ProductCard key={item.id} {...item} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
