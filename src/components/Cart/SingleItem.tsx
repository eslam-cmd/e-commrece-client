import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import Image from "next/image";

const SingleItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity - 1 }));
    }
  };

  const apiUrl = "https://e-commrece-backend.vercel.app";

  // ✅ تحديد رابط الصورة الصحيح
  const imageSrc = item.image_url?.startsWith("http")
    ? item.image_url // رابط كامل (Supabase أو خارجي)
    : `https://e-commrece-backend.vercel.app/${
        item.image_url?.startsWith("/") ? item.image_url : `/${item.image_url}`
      }`;

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      {/* صورة المنتج */}
      <div className="min-w-[400px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="relative flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5 overflow-hidden">
              <Image
                src={imageSrc || "/fallback.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <a href="#">{item.title}</a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* السعر */}
      <div className="min-w-[180px]">
        <p className="text-dark">${item.price}</p>
      </div>

      {/* التحكم بالكمية */}
      <div className="min-w-[275px]">
        <div className="w-max flex items-center rounded-md border border-gray-3">
          <button
            onClick={handleDecreaseQuantity}
            aria-label="إنقاص الكمية"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.333 10a.833.833 0 0 1 .833-.833h11.667a.833.833 0 0 1 0 1.666H4.166A.833.833 0 0 1 3.333 10Z" />
            </svg>
          </button>

          <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
            {quantity}
          </span>

          <button
            onClick={handleIncreaseQuantity}
            aria-label="زيادة الكمية"
            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.333 10a.833.833 0 0 1 .833-.833h5.833V3.333a.833.833 0 1 1 1.666 0v5.834h5.834a.833.833 0 1 1 0 1.666h-5.834v5.834a.833.833 0 1 1-1.666 0v-5.834H4.166A.833.833 0 0 1 3.333 10Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* الإجمالي */}
      <div className="min-w-[200px]">
        <p className="text-dark">${item.price * quantity}</p>
      </div>

      {/* زر الحذف */}
      <div className="min-w-[50px] flex justify-end">
        <button
          onClick={handleRemoveFromCart}
          aria-label="حذف المنتج من السلة"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
