import React from "react";
import Hero from "../components/Hero/Hero";
import SectionHeading from "../components/ui/SectionHeading";

const HomePage = () => {
  return (
    <>
      <Hero />
      <SectionHeading
        title="Our"
        highlight="Natural Care"
        subtitle=" Experience holistic skincare solutions — from Aloe Vera therapy to complete natural rejuvenation."
      />
    </>
  );
};

export default HomePage;
