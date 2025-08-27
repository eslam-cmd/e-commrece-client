import React from "react";
import Image from "next/image";
const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-20 bg-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 space-y-10">
        {/* 🔷 Banner كبير */}
        <div className="relative z-10 overflow-hidden rounded-lg bg-white py-16 px-8 lg:flex lg:items-center lg:justify-between lg:gap-12 shadow-md border border-gray-3">
          {/* النص */}
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-blue-light mb-3">
              Limited Time Offer
            </span>
            <h2 className="font-bold text-2xl lg:text-4xl text-blue-dark mb-5">
              UP TO 30% OFF
            </h2>
            <p className="text-base text-gray-700 mb-6">
              Get premium supplements at unbeatable prices. Fuel your fitness
              journey with top-quality products.
            </p>
            <a
              href="#"
              className="inline-flex font-medium text-sm text-white bg-blue-light py-3 px-6 rounded-md hover:bg-blue-700 transition"
            >
              Buy Now
            </a>
          </div>

          {/* الصورة */}
          <div className="relative w-[274px] h-[350px] shrink-0">
            <Image
              src="https://www.sporter.com/media/catalog/product/1/0/101529-newup24.jpg"
              alt="Banner"
              width={274}
              height={350}            
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
          <div className="relative z-10 overflow-hidden rounded-lg bg-white py-10 px-6 flex items-center justify-between gap-6 shadow-sm border border-gray-2">
            <div className="relative w-[274px] h-[350px] shrink-0">
              <Image
                src="https://www.sporter.com/media/catalog/product/1/0/101529-newup24.jpg"
                alt="Banner"
                width={274}
                height={350}       
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div className="text-right flex-1">
              <span className="block text-lg text-teal-dark mb-1.5">
                Strawberry Delight
              </span>
              <h2 className="font-bold text-xl lg:text-2xl text-teal-dark mb-2.5">
                Flat 20% Off
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                Sweet taste, strong results. Perfect for post-workout recovery.
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-sm text-white bg-teal-dark py-2.5 px-6 rounded-md hover:bg-teal-dark transition"
              >
                Grab Now
              </a>
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-lg bg-white py-10 px-6 flex items-center justify-between gap-6 shadow-sm border border-gray-2">
            <div className="w-[200px] h-[200px] shrink-0">
              <Image
                src="https://www.sporter.com/media/catalog/product/f/r/front-br-png_1.jpg"
                alt="Banner"
                width={274}
                height={350}              
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <span className="block text-lg text-orange-dark mb-1.5">
                BCAA Power
              </span>
              <h2 className="font-bold text-xl lg:text-2xl text-orange-dark mb-2.5">
                Up to <span className="text-orange-500">40%</span> Off
              </h2>
              <p className="text-sm text-gray-7 mb-4">
                Reduce fatigue and boost recovery with essential amino acids.
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-sm text-white bg-orange-dark py-2.5 px-6 rounded-md hover:bg-orange-dark transition"
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
