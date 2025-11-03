import React from "react";
import SectionHeading from "../components/ui/SectionHeading";
import products from "../data/productsData";
import ProductCard from "../components/Card/ProductCard";

const ProductPage = () => {
  return (
    <>
      <SectionHeading
        title="Our"
        highlight="Products"
        subtitle="Made with real aloe vera and natural botanicals — for healthy, radiant skin that breathes with nature’s glow. "
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
