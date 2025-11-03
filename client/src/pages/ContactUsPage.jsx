import React from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <>
      <section className="py-4 bg-linear-to-b from-green-50 to-white">
        <SectionHeading
          title="Get In Touch with"
          highlight="Chirveda Herbals"
          subtitle="Have questions about our natural products? We’d love to hear from you — let’s grow wellness
         together!"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {/* CONTACT FORM */}
            <div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-green-100"
              data-aos="fade-right"
            >
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center md:text-left">
                Send Us a Message
              </h3>

              <form className="space-y-6" id="contactForm">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
                    placeholder="Enter your email (optional)"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white resize-none"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-r cursor-pointer from-green-600 to-lime-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-lime-700 shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  🌱 Send Message
                </button>
              </form>
            </div>

            {/* MAP + CONTACT INFO */}
            <div className="space-y-6" data-aos="fade-left">
              {/* Google Map */}
              <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70906734862!2d73.69815159747594!3d18.524870612447533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1761842095540!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Our Location
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      123 xyz, Pune, MH 411001
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Email Address
                    </h4>
                    <p className="text-gray-600">
                      <a
                        href="mailto:chirveda@gmail.com"
                        className="text-green-600 hover:underline"
                      >
                        chirveda@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                    <FaClock className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Sunday: 9:00 AM - 8:00 PM
                    </p>
                    <p className="text-green-600 font-semibold mt-1">
                      Open 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
