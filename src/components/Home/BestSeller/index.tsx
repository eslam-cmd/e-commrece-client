"use client";
import React, { useEffect, useState, useRef } from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";
import Link from "next/link";
import { product } from "@/types/product";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // أيقونات احترافية

const BestSeller = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState<product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://e-commrece-backend.vercel.app";

  const filteredItems =
    activeFilter === "all"
      ? products
      : products.filter((item) => item.category === activeFilter);

  useEffect(() => {
    fetch(`${apiUrl}/api/products?section=bestSeller`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped: product[] = data.slice(0, 6).map((item) => ({
            id: item.id,
            title: item.title,
            reviews: item.reviews ?? 0,
            price: item.price ?? 0,
            discountedPrice: item.discountedPrice ?? item.price ?? 0,
            section: item.section ?? "bestSeller",
            category: item.category ?? "unknown",
            image_url: item.image_url ?? "",
            description: item.description ?? "",
            status: item.status ?? "available",
            quantity: item.quantity ?? 1,
          }));
          setProducts(mapped);
        }
      });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="overflow-hidden relative">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* العنوان */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>

          {/* أزرار الفلترة */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "nutritionalsupplements", label: "Nutritional supplements" },
              { key: "vitamin", label: "Vitamin" },
              { key: "proten", label: "Proten" },
              { key: "creatin", label: "Creatin" },
              { key: "healthyfoods", label: "Healthy foods" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === key
                    ? "bg-dark text-white"
                    : "bg-gray-100 text-dark hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* أزرار التمرير */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
        >
          <FiChevronRight size={20} />
        </button>

        {/* عرض المنتجات كسكرول أفقي */}
        <div
          ref={scrollRef}
          className="flex gap-7.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {filteredItems.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0 w-72">
              <SingleItem item={item} />
            </div>
          ))}
        </div>

        {/* زر عرض الكل */}
        <div className="text-center mt-12.5">
          <Link
            href="/shop-without-sidebar"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;