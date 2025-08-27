"use client";
import React, { useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";
import Link from "next/link";
import { product } from "@/types/product";

const BestSeller = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState<product[]>([]);

  const filteredItems =
    activeFilter === "all"
      ? products
      : products.filter((item) => item.category === activeFilter);
  const apiUrl =  "https://e-commrece-backend.vercel.app";

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

  return (
    <section className="overflow-hidden">
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
              {
                key: "nutritionalsupplements",
                label: "Nutritional supplements",
              },
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

        {/* عرض المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {filteredItems.map((item) => (
            <SingleItem key={item.id} item={item} />
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
