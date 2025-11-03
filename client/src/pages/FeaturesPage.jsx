import React from "react";
import SectionHeading from "../components/ui/SectionHeading";
import FeatureCard from "../components/ui/FeatureCard";
import {
  FaLeaf,
  FaSun,
  FaSeedling,
  FaHandHoldingHeart,
  FaTint,
} from "react-icons/fa";

const features = [
  {
    icon: FaLeaf,
    title: "Pure Natural Ingredients",
    description:
      "We use 100% organic Aloe Vera sourced from trusted farms, ensuring purity in every drop.",
    gradient: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    icon: FaSun,
    title: "Boosts Natural Glow",
    description:
      "Rich in vitamins and antioxidants, Aloe Vera revitalizes dull skin for a radiant, youthful appearance.",
    gradient: "bg-gradient-to-br from-yellow-400 to-lime-500",
  },
  {
    icon: FaLeaf,
    title: "Anti-Aging Properties",
    description:
      "Helps reduce fine lines and wrinkles by boosting collagen and elasticity in your skin.",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
  {
    icon: FaSeedling,
    title: "100% Chemical-Free",
    description:
      "Free from parabens, sulfates, and artificial colors — safe for all skin types.",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Skin-Friendly Formula",
    description:
      "Dermatologically tested, gentle, and suitable for all skin types — even sensitive skin.",
    gradient: "bg-gradient-to-br from-teal-500 to-emerald-600",
  },
  {
    icon: FaTint,
    title: "Deep Hydration",
    description:
      "Aloe Vera locks in moisture to keep your skin soft, supple, and hydrated all day long — naturally.",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
];

const FeaturesPage = () => {
  return (
    <>
      <section className="py-4 bg-gray-50">
        <SectionHeading
          title="Why Choose"
          highlight="AloveraCare?"
          subtitle="Experience the purity of nature with our premium Aloe Vera products designed to heal,
                    nourish, and rejuvenate your skin naturally."
        />
        <div className="container mx-auto px-4 pb-10 sm:px-6 lg:px-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesPage;
