import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-20 sm:pt-24 lg:pt-30 xl:pt-40 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-5">
          {/* العمود الأول: السلايدر */}
          <div className="w-full xl:max-w-[757px]">
            <div className="relative z-10 rounded-[10px] bg-white overflow-hidden">
              {/* خلفية الأشكال */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1 object-contain"
                width={534}
                height={520}
              />
              <HeroCarousel />
            </div>
          </div>

          {/* العمود الثاني: البطاقات */}
          <div className="w-full xl:max-w-[393px]">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              {/* البطاقة الأولى */}
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="font-semibold text-dark text-lg sm:text-xl mb-4 sm:mb-6">
                    <a href="#">Lorem ipsum.</a>
                  </h2>
                  <p className="font-medium text-dark-4 text-sm sm:text-base mb-1.5">
                    Lorem ipsum dolor sit, amet.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-lg sm:text-xl text-red">
                      $699
                    </span>
                    <span className="font-medium text-base sm:text-lg text-dark-4 line-through">
                      $999
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="https://www.sporter.com/media/catalog/product/f/r/front-daily-multivitamins.jpg"
                    alt="product"
                    width={110}
                    height={140}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* البطاقة الثانية */}
              <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="font-semibold text-dark text-lg sm:text-xl mb-4 sm:mb-6">
                    <a href="#">Lorem, ipsum.</a>
                  </h2>
                  <p className="font-medium text-dark-4 text-sm sm:text-base mb-1.5">
                    Lorem ipsum dolor sit amet.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-lg sm:text-xl text-red">
                      $699
                    </span>
                    <span className="font-medium text-base sm:text-lg text-dark-4 line-through">
                      $999
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="https://www.sporter.com/media/catalog/product/s/t/strawberry_1_10.jpg"
                    alt="product"
                    width={110}
                    height={140}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مميزات الهيرو */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
