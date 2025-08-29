"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

// MUI Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const router = useRouter();
  const { openCartModal } = useCartModalContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");

    setIsLoggedIn(loggedIn);
    if (email) setUserEmail(email);
    if (role) setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleStickyMenu = useCallback(() => {
    setStickyMenu(window.scrollY >= 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, [handleStickyMenu]);

  const options = [
    { label: "All Categories", value: "0" },
    { label: "Protein", value: "1" },
    { label: "Creatine", value: "2" },
    { label: "Vitamin", value: "3" },
    { label: "Nutritional Supplements", value: "4" },
    { label: "Healthy Foods", value: "5" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] bg-white shadow-sm transition-all duration-300 ${
        stickyMenu ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo1.png"
            alt="Logo"
            width={150}
            height={36}
          />
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 w-[500px]">
          <CustomSelect options={options} />
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div
            className="relative cursor-pointer text-gray-700 hover:text-blue-600"
            onClick={openCartModal}
          >
            <ShoppingCartIcon />
            {product.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {product.length}
              </span>
            )}
            <span className="text-sm font-medium ml-1">${totalPrice}</span>
          </div>

          {/* Auth */}
          {!isLoggedIn ? (
            <Link
              href="/signin"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <PersonIcon />
              <span>Sign In</span>
            </Link>
          ) : userRole === "admin" ? (
            <Link
              href="/dashboardadmin"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <PersonIcon />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/my-account"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <PersonIcon />
              <span>My Account</span>
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
