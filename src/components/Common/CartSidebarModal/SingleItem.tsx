import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";

const SingleItem = ({ item, removeItemFromCart }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const apiUrl = "https://e-commrece-backend.vercel.app";

  // ✅ تعريف imageSrc قبل الاستخدام
  const imageSrc = item.image_url?.startsWith("http")
    ? item.image_url
    : `${apiUrl}${
        item.image_url?.startsWith("/") ? item.image_url : `/${item.image_url}`
      }`;

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="w-full flex items-center gap-6">
        <div className="flex items-center justify-center rounded-[10px] bg-gray-3 max-w-[90px] w-full h-22.5 relative overflow-hidden">
          <Image
            src={imageSrc || "/fallback.jpg"}
            alt={item.title}
            fill
            className="object-cover" // ممكن تخليها contain إذا ما تريد تقص أجزاء من الصورة
            unoptimized
          />
        </div>

        <div>
          <h3 className="font-medium text-dark mb-1 ease-out duration-200 hover:text-blue">
            <a href="#">{item.title}</a>
          </h3>
          <p className="text-custom-sm">Price: ${item.price}</p>
        </div>
      </div>

      <button
        onClick={handleRemoveFromCart}
        aria-label="button for remove product from cart"
        className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
      >
        ✕
      </button>
    </div>
  );
};

export default SingleItem;
