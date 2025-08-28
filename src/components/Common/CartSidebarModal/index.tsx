"use client";
import React, { useEffect } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeItemFromCart,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".modal-content")) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, closeCartModal]);

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-transform duration-300 ${
        isCartModalOpen ? "translate-x-0" : "translate-x-full"
      } flex`}
    >
      {/* خلفية داكنة قابلة للنقر للإغلاق */}
      <div
        onClick={closeCartModal}
        className={`flex-1 bg-dark/70 transition-opacity duration-300 ${
          isCartModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* محتوى السلة */}
      <div className="w-full sm:w-[90%] md:w-[400px] lg:w-[500px] bg-white shadow-1 px-4 sm:px-6 lg:px-8 modal-content flex flex-col h-full">
        {/* الرأس */}
        <div className="sticky top-0 bg-white flex items-center justify-between py-4 sm:py-6 lg:py-8 border-b border-gray-300">
          <h2 className="font-medium text-lg sm:text-xl lg:text-2xl text-dark">
            Cart View
          </h2>
          <button
            onClick={closeCartModal}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* العناصر */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4 sm:gap-6">
              {cartItems.map((item, key) => (
                <SingleItem
                  key={key}
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                />
              ))}
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* الفوتر */}
        <div className="border-t border-gray-300 bg-white py-4 sm:py-5 lg:py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-lg sm:text-xl text-dark">
              Subtotal:
            </p>
            <p className="font-medium text-lg sm:text-xl text-dark">
              ${totalPrice}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              onClick={closeCartModal}
              href="/cart"
              className="flex-1 text-center font-medium text-white bg-blue py-3 rounded-md hover:bg-blue-dark transition-colors"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              className="flex-1 text-center font-medium text-white bg-dark py-3 rounded-md hover:bg-opacity-95 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;
