"use client";
import React from "react";
import { product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import Image from "next/image";
import Link from "next/link";

// MUI Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const SingleItem = ({ item }: { item: product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const apiUrl = "https://e-commrece-backend.vercel.app";
  const handleQuickViewUpdate = () => {
    dispatch(
      updateQuickView({
        ...item,
        discountedPrice: item.price,
        status: item.status ?? "available",
        quantity: item.quantity ?? 1,
      })
    );
    openModal();
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        image_url: item.image_url,
      })
    );
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: item.id,
        title: item.title,
        price: item.price,
        discountedPrice: item.price,
        quantity: 1,
        status: "available",
        image_url: item.image_url,
      })
    );
  };

  const renderStars = () => {
    const stars = [];
    const rating = 4.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<StarIcon key={i} className="text-yellow-400 text-sm" />);
      } else if (i === Math.ceil(rating) && rating % 1 > 0) {
        stars.push(
          <StarHalfIcon key={i} className="text-yellow-400 text-sm" />
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="text-yellow-400 text-sm" />
        );
      }
    }

    return stars;
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100">
      {item.section === "bestSeller" && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          Best Seller
        </div>
      )}
      <div className="relative w-full h-60 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {typeof item.image_url === "string" ? (
          <Image
            src={
              item.image_url.startsWith("http")
                ? item.image_url // رابط كامل من قاعدة البيانات
                : `${apiUrl}${
                    item.image_url.startsWith("/")
                      ? item.image_url
                      : `/${item.image_url}`
                  }`
            }
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center gap-4">
          <button
            onClick={handleQuickViewUpdate}
            className="bg-white text-gray-7 hover:bg-blue-light hover:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Quick view"
          >
            <VisibilityIcon fontSize="small" />
          </button>
          <button
            onClick={handleItemToWishList}
            className="bg-white text-gray-7 hover:bg-red-dark hover:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 opacity-0 group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <FavoriteBorderIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div className="p-5">
        <Link href={`/products/${item.id}`} passHref>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2 h-10">
          {item.description}
        </p>

        <div className="flex items-center justify-center gap-1 mt-3">
          {renderStars()}
          <span className="text-xs text-gray-500 ml-1">
            ({Math.floor(Math.random() * 100)})
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-gradient-to-r from-blue-dark to-blue-light text-white py-2.5 rounded-lg hover:from-blue-light hover:to-blue-dark transition-transform shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
        >
          <ShoppingCartIcon fontSize="small" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
