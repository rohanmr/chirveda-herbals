import React from "react";
import Hero from "../components/Hero/Hero";
import SectionHeading from "../components/ui/SectionHeading";
import products from "../data/productsData";
import ProductCard from "../components/Card/ProductCard";
import HeroCarousel from "../components/ui/HeroCarousel";
import FirstVisitPopup from "../components/FirstVisitPopup";    

const HomePage = () => {
  return (
    <>
      {/* <Hero /> */}
      <FirstVisitPopup />
      <HeroCarousel />
      <SectionHeading
        title="Our"
        highlight="Natural Cares"
        subtitle=" Experience holistic skincare solutions — from Aloe Vera therapy to complete natural rejuvenation."
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

export default HomePage;
