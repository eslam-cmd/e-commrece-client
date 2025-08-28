"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useModalContext } from "@/app/context/QuickViewModalContext";

import {
  FiEye,
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type ProductType = {
  id: string;
  title: string;
  image_url: string;
  price: number;
  category: string;
  description?: string;
  isNew?: boolean;
  section?: string;
};

const NewArrival = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = "https://e-commrece-backend.vercel.app";

  const categories = [
    { key: "all", label: "All" },
    { key: "nutritionalsupplements", label: "Nutritional supplements" },
    { key: "vitamin", label: "Vitamin" },
    { key: "proten", label: "Proten" },
    { key: "creatin", label: "Creatin" },
    { key: "healthyfoods", label: "Healthy foods" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/api/products?section=newArrival`
        );
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 mb-2">
              <FiClock className="text-xl" />
              <span className="font-medium">This Week</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrival</h2>
            <p className="text-gray-500 mt-2 text-lg">
              Discover our latest featured products
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                  activeCategory === key
                    ? "bg-blue-dark text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Scroll */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="relative">
            {/* زر يسار */}
            <button
              onClick={() =>
                document
                  .getElementById("newArrivalScroll")
                  ?.scrollBy({ left: -300, behavior: "smooth" })
              }
              className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* الحاوية */}
            <div
              id="newArrivalScroll"
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {filteredProducts.map((item) => (
                <div key={item.id} className="snap-start flex-shrink-0 w-72">
                  <ProductCard item={item} />
                </div>
              ))}
            </div>

            {/* زر يمين */}
            <button
              onClick={() =>
                document
                  .getElementById("newArrivalScroll")
                  ?.scrollBy({ left: 300, behavior: "smooth" })
              }
              className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 z-10"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-700">
              No products available in this category at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({ item }: { item: ProductType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModalContext();
  const apiUrl = "https://e-commrece-backend.vercel.app";

  const handleQuickView = () => {
    dispatch(
      updateQuickView({
        id: Number(item.id),
        title: item.title,
        reviews: 0,
        price: item.price,
        discountedPrice: item.price,
        section: item.section ?? "newArrival",
        description: item.description ?? "",
        category: item.category,
        image_url: item.image_url,
        status: "available",
        quantity: 1,
      })
    );
    openModal();
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: Number(item.id),
        title: item.title,
        price: item.price,
        quantity: 1,
        image_url: item.image_url,
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        id: Number(item.id),
        title: item.title,
        price: item.price,
        discountedPrice: item.price,
        quantity: 1,
        status: "available",
        image_url: item.image_url,
      })
    );
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Product Badge */}
      {item.section === "newArrival" && (
        <div className="absolute top-3 left-3 bg-green-light text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          New
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-60 w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        {item.image_url?.startsWith("/products/") ? (
          <Image
            src={`${apiUrl}${item.image_url}`}
            alt={item.title}
            width={300}
            height={300}
          />
        ) : (
          <Image
            src={item.image_url || "/fallback.jpg"}
            alt={item.title}
            width={300}
            height={300}
          />
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-700 hover:bg-blue-dark hover:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Quick view"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={handleAddToWishlist}
          
            className="bg-white text-gray-7 hover:bg-red-dark hover:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 opacity-0 group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <FiHeart size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/shop-details/${item.id}`} className="block">
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1 mb-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 h-12 mb-3">
          {item.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`text-sm ${
                i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            {item.price.toLocaleString()}$
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center p-2 bg-blue-dark text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
