import React from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { FaLeaf, FaFlask } from "react-icons/fa";
import aboutImg from "../assets/images/imgone.jpeg";

const AboutPage = () => {
  return (
    <>
      <section className="pt-4 lg:py-1 bg-linear-to-br from-green-50 to-emerald-100">
        <SectionHeading
          title="About"
          highlight="Chirveda"
          subtitle="Ancient Wisdom, Modern Wellness — our mission is to bring the purity of nature into your daily care."
        />
        <div className="container mx-auto px-4 sm:px-6 pb-14 md:pb-24 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div
              className="space-y-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              {/* Paragraphs */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <strong className="text-green-700 text-xl sm:text-2xl">
                  Chirveda
                </strong>{" "}
                is a wellness brand rooted in the ancient science of Ayurveda.
                We blend time-tested herbal formulations with modern scientific
                methods to create skincare and haircare solutions that are safe,
                effective, and sustainable.
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Our promise is purity — every product is crafted with natural
                ingredients like Aloe Vera, Amla, and Neem, ensuring holistic
                nourishment for your body and mind.
              </p>

              {/* HIGHLIGHT BOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {/* Box 1 */}
                <div className="bg-linear-to-br from-green-100 to-lime-50 p-6 rounded-xl text-center shadow-lg">
                  <FaLeaf className="text-green-600 text-3xl mb-3 mx-auto" />
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">
                    100% Natural
                  </h4>
                  <p className="text-sm text-gray-600">
                    Pure Ayurvedic Ingredients
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-linear-to-br from-green-100 to-lime-50 p-6 rounded-xl text-center shadow-lg">
                  <FaFlask className="text-green-600 text-3xl mb-3 mx-auto" />
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">
                    Scientifically Tested
                  </h4>
                  <p className="text-sm text-gray-600">
                    Backed by modern research
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="flex justify-center items-center"
              data-aos="fade-left"
              data-aos-duration="1200"
            >
              <img
                src={aboutImg}
                alt="Aloe Vera Gel Product"
                className="rounded-2xl object-contain max-h-[350px] w-full sm:w-4/5 lg:w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
