import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-10 sm:py-14 lg:py-20 bg-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 🔷 Banner كبير */}
        <div className="relative z-10 overflow-hidden rounded-lg bg-white p-6 sm:p-8 lg:py-16 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12 shadow-md border border-gray-300">
          {/* النص */}
          <div className="max-w-full lg:max-w-[550px] text-center lg:text-left">
            <span className="block font-medium text-lg sm:text-xl text-blue-light mb-2 sm:mb-3">
              Limited Time Offer
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-dark mb-4 sm:mb-5">
              UP TO 30% OFF
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Get premium supplements at unbeatable prices. Fuel your fitness
              journey with top-quality products.
            </p>
            <a
              href="#"
              className="inline-flex font-medium text-sm sm:text-base text-white bg-blue-light py-2.5 sm:py-3 px-5 sm:px-6 rounded-md hover:bg-blue-700 transition"
            >
              Buy Now
            </a>
          </div>

          {/* الصورة */}
          <div className="relative w-full max-w-[250px] sm:max-w-[274px] mx-auto lg:mx-0 mt-6 lg:mt-0">
            <Image
              src="https://www.sporter.com/media/catalog/product/1/0/101529-newup24.jpg"
              alt="Banner"
              width={274}
              height={350}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* ✅ البانرات الجانبية */}
        <div className="grid gap-8 sm:gap-10 grid-cols-1 lg:grid-cols-2">
          {/* Banner 1 */}
          <div className="relative z-10 overflow-hidden rounded-lg bg-white p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-4 sm:gap-6 shadow-sm border border-gray-200 text-center sm:text-right">
            <div className="relative w-[180px] sm:w-[220px] md:w-[250px] flex-shrink-0">
              <Image
                src="https://www.sporter.com/media/catalog/product/1/0/101529-newup24.jpg"
                alt="Banner"
                width={274}
                height={350}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="flex-1">
              <span className="block text-base sm:text-lg text-teal-dark mb-1.5">
                Strawberry Delight
              </span>
              <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-teal-dark mb-2">
                Flat 20% Off
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                Sweet taste, strong results. Perfect for post-workout recovery.
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-sm sm:text-base text-white bg-teal-dark py-2 px-5 rounded-md hover:bg-teal-700 transition"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative z-10 overflow-hidden rounded-lg bg-white p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-4 sm:gap-6 shadow-sm border border-gray-200 text-center sm:text-left">
            <div className="w-[160px] sm:w-[200px] flex-shrink-0">
              <Image
                src="https://www.sporter.com/media/catalog/product/f/r/front-br-png_1.jpg"
                alt="Banner"
                width={274}
                height={350}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex-1">
              <span className="block text-base sm:text-lg text-orange-dark mb-1.5">
                BCAA Power
              </span>
              <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-orange-dark mb-2">
                Up to <span className="text-orange-500">40%</span> Off
              </h2>
              <p className="text-sm text-gray-700 mb-3">
                Reduce fatigue and boost recovery with essential amino acids.
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-sm sm:text-base text-white bg-orange-dark py-2 px-5 rounded-md hover:bg-orange-700 transition"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
