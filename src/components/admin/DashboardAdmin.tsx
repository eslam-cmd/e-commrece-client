"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX,
  
} from "react-icons/fi";
import Image from "next/image";

import UsersPanel from "./panels/usersPanel";
import ProductsPanel from "./panels/ProductPanel";
import AccountPanel from "./panels/AccountPanel";
import Link from "next/link";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("users");
  const [adminEmail, setAdminEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("adminEmail");
    if (role !== "admin") {
      router.push("/admin-login");
    } else {
      setAdminEmail(email || "admin@example.com");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/admin-login");
  };

  const tabs = [
    { id: "users", label: "Users", icon: <FiUsers className="text-lg" /> },
    {
      id: "products",
      label: "Products",
      icon: <FiShoppingBag className="text-lg" />,
    },
    {
      id: "account",
      label: "My Account",
      icon: <FiSettings className="text-lg" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center mt-19">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          E-Commerce
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link style={{display:"flex"}} href="/" className="text-gray-6 hover:text-blue-light">
          <FiHome />
            Back to Home Page
          </Link>
          
          <button
            onClick={handleLogout}
            className="text-red-light hover:text-red-dark"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-600"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col px-4 py-3 gap-3 md:hidden">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              <FiHome/>
              Back to Homepage
            </Link>
           
            <button
              onClick={handleLogout}
              className="text-red-light hover:text-red-dark"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full w-full max-w-xs bg-white shadow-lg z-40 transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full flex flex-col p-4 border-r border-gray-200 overflow-y-auto">
            {/* Admin Profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="/images/users/user-04.jpg"
                  alt="admin"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="truncate">
                <p className="font-semibold text-gray-800">System Admin</p>
                <p className="text-xs text-gray-500">{adminEmail}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 h-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-auto w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-dark hover:bg-red-light-2 transition text-sm"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumb - Desktop */}
          <div className="bg-gray-100 border-b hidden lg:block">
            <div className="px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
              <FiHome className="text-gray-500" />
              <span>/</span>
              <span className="font-medium text-gray-700">Dashboard</span>
              <span>/</span>
              <span className="text-gray-500">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-full mx-auto">
              <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                {activeTab === "users" && <UsersPanel />}
                {activeTab === "products" && <ProductsPanel />}
                {activeTab === "account" && <AccountPanel />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
