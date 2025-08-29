"use client";
import React from "react";
import { product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";

const SingleGridItem = ({ item }: { item: product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleQuickView = () => {
    dispatch(updateQuickView({ ...item }));
    openModal();
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
        discountedPrice: item.price, // ✅ أضف هذه الخاصية لتوافق النوع
      })
    );
  };
  const apiUrl =  "https://e-commrece-backend.vercel.app";

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Badge - Can add "New" or "Best Seller" badge */}
      {item.section === "newArrival" && (
        <div className="absolute top-3 left-3 bg-green-dark text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          New
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-50 bg-gray-3 overflow-hidden">
        {typeof item.image_url === "string" &&
        item.image_url.startsWith("/products/") ? (
          <Image
            src={`https://e-commrece-backend.vercel.app/${item.image_url}`}
            alt={item.title}
            width={400}
            height={400}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickView}
            className="bg-white text-gray-7 hover:bg-blue-dark hover:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
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
        <Link href={`/product/${item.id}`} className="block">
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1 mb-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 h-12 mb-3">
          {item.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
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

export default SingleGridItem;
