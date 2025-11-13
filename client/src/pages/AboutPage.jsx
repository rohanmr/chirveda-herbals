import React from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { FaLeaf, FaFlask, FaSpa, FaWater } from "react-icons/fa";
import aboutImg from "../assets/images/chirveda_logo.jpeg";

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
          {/* ABOUT SECTION (LEFT TEXT + RIGHT IMAGE) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div
              className="space-y-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <strong className="text-green-700 text-xl sm:text-2xl">
                  Chirveda
                </strong>{" "}
                is a wellness brand rooted in the ancient science of Ayurveda.
                We blend time-tested herbal formulations with modern scientific
                methods to create skincare and haircare solutions that are safe,
                effective, and sustainable.
              </p>

              {/* HIGHLIGHT BOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-linear-to-br from-green-100 to-lime-50 p-6 rounded-2xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300">
                  <FaLeaf className="text-green-600 text-3xl mb-3 mx-auto" />
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">
                    100% Natural
                  </h4>
                  <p className="text-sm text-gray-600">
                    Pure Ayurvedic Ingredients
                  </p>
                </div>

                <div className="bg-linear-to-br from-green-100 to-lime-50 p-6 rounded-2xl text-center shadow-lg transition-transform transform hover:scale-105 duration-300">
                  <FaFlask className="text-green-600 text-3xl mb-3 mx-auto" />
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">
                    Dermatologically & Scientifically Tested
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
                className="rounded-3xl object-contain max-h-[350px] w-full sm:w-4/5 lg:w-full"
              />
            </div>
          </div>

          {/* BENEFITS SECTION */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Skin Benefits */}
            <div
              className="bg-linear-to-br from-green-100 to-lime-50 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="flex items-center justify-start gap-3 mb-4">
                <FaSpa className="text-green-700 text-3xl" />
                <h3 className="text-xl font-semibold text-green-800">
                  Benefits for Skin
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base sm:text-lg">
                <li>Deeply hydrates and restores skin moisture.</li>
                <li>Soothes irritation and redness with Aloe Vera.</li>
                <li>Promotes a radiant, glowing complexion naturally.</li>
                <li>Helps reduce acne and blemishes gently.</li>
                <li>Non-sticky, lightweight, and paraben-free.</li>
              </ul>
            </div>

            {/* Hair Benefits */}
            <div
              className="bg-linear-to-br from-green-100 to-lime-50 p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="flex items-center justify-start gap-3 mb-4">
                <FaWater className="text-green-700 text-3xl" />
                <h3 className="text-xl font-semibold text-green-800">
                  Benefits for Hair
                </h3>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base sm:text-lg">
                <li>Strengthens hair from root to tip.</li>
                <li>Reduces dandruff and scalp dryness.</li>
                <li>Enhances natural shine and smoothness.</li>
                <li>Prevents hair fall with herbal nourishment.</li>
                <li>Free from harsh chemicals and sulfates.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
