"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {/* 1 swiper */}
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Lorem ipsum dolor sit, amet consectetur</a>
            </h1>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ipsum at risus euismod lobortis in
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-blue-light py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-10"
            >
              Shop Now
            </a>
          </div>

          <div>
            <Image
              src="https://www.sporter.com/_next/image/?url=https%3A%2F%2Fwww.sporter.com%2Fmedia%2Fwysiwyg%2FTRN24-Natures-Way.jpg&w=384&q=100"
              alt="product"
              style={{borderRadius:"12px", border:"1px solid #000"}}
              width={351}
              height={358}
              unoptimized
            />
          </div>
        </div>
      </SwiperSlide>
      {/* 2 swiper */}
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Lorem ipsum dolor sit amet consectetur.</a>
            </h1>

            <p>
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-blue-light py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-10"
            >
              Shop Now
            </a>
          </div>

          <div>
            <Image
              src="https://www.sporter.com/_next/image/?url=https%3A%2F%2Fwww.sporter.com%2Fmedia%2Fwysiwyg%2FSporter-Vitamins-13-5.jpg&w=384&q=100"
              alt="product"
              style={{borderRadius:"12px", border:"1px solid #000"}}
              width={351}
              height={358}
              unoptimized
            />
          </div>
        </div>
      </SwiperSlide>
      {/* 3 swiper */}
      <SwiperSlide>
        {" "}
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-26 pl-4 sm:pl-7.5 lg:pl-12.5">
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
              <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                30%
              </span>
              <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                Sale
                <br />
                Off
              </span>
            </div>

            <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
              <a href="#">Lorem ipsum dolor sit amet consectetur adipisicing.</a>
            </h1>

            <p>
              Lorem ipsum dolor sit, consectetur elit nunc suscipit non ipsum
              nec suscipit.
            </p>

            <a
              href="#"
              className="inline-flex font-medium text-white text-custom-sm rounded-md bg-blue-light py-3 px-9 ease-out duration-200 hover:bg-blue-dark mt-10"
            
            >
              Shop Now
            </a>
          </div>

          <div>
            <Image
              src="https://www.sporter.com/_next/image/?url=https%3A%2F%2Fwww.sporter.com%2Fmedia%2Fwysiwyg%2FTRN24-Natures-Way.jpg&w=384&q=100"
              alt="product"
              style={{borderRadius:"12px", border:"1px solid #000"}}
              width={351}
              height={358}
              unoptimized
            />
          </div>
        </div>
      </SwiperSlide>
      {/* 4 swiper */}
      
    </Swiper>
  );
};

export default HeroCarousal;
