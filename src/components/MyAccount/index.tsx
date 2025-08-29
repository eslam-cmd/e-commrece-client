"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import AddressModal from "./AddressModal";

interface User {
  id: number;
  full_name?: string;
  email: string;
}

const LogoutModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
        </div>
        <p className="text-gray-600 mb-6">
          You will be logged out of the system. Are you sure you want to
          continue?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg bg-gray-5 text-gray-7 hover:bg-gray-2 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-red to-red text-white hover:from-red hover:to-red transition duration-200 shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

const MyAccount = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account-details");
  const [addressModal, setAddressModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl =  "https://e-commrece-backend.vercel.app";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn !== "true" || !userEmail) {
      router.push("/signin");
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/api/auth-users?email=${userEmail}`
        );
        const data = await response.json();
        const userData = Array.isArray(data) ? data[0] : data;

        setUser(userData);
        setFullName(userData.full_name || userData.email.split("@")[0]);
        setEmail(userData.email);
      } catch (err) {
        console.error("Failed to load user data:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    router.push("/signin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth-users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name: fullName, email }),
      });

      if (response.ok) {
        setMessage("Data updated successfully");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("An error occurred while updating data");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddressModal = () => setAddressModal(true);
  const closeAddressModal = () => setAddressModal(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error occurred
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/signin")}
            className="px-5 py-2.5 bg-blue text-white rounded-lg hover:bg-blue transition"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb title={"My Account"} pages={["My Account"]} />

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Menu */}
            <div className="lg:w-80 w-full">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <Image
                        src="/images/users/user-04.jpg"
                        alt="Avatar"
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user?.full_name || user?.email?.split("@")[0] || "..."}
                      </h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab("account-details")}
                        className={`w-full text-right flex items-center justify-between p-3 rounded-lg transition ${
                          activeTab === "account-details"
                            ? "bg-blue-light text-blue-light-5"
                            : "text-gray-7 hover:bg-gray-50"
                        }`}
                      >
                        <span>Account Details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("addresses")}
                        className={`w-full text-right flex items-center justify-between p-3 rounded-lg transition ${
                          activeTab === "addresses"
                            ? "bg-blue-light text-blue-light-5"
                            : "text-gray-7 hover:bg-gray-50"
                        }`}
                      >
                        <span>My Data</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setLogoutModal(true)}
                        className="w-full text-right flex items-center justify-between p-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                      >
                        <span>Log out</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "account-details" && user && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-7">
                      Account Details
                    </h2>
                    <p className="text-sm text-gray-500">
                      Edit your personal account information
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-blue-dark to-blue-light text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md disabled:opacity-70 flex items-center"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>

                    {message && (
                      <div
                        className={`mt-4 p-3 rounded-lg ${
                          message.includes("error")
                            ? "bg-red-dark text-red-light-6"
                            : "bg-green-light-2 text-green-dark"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === "addresses" && user && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Account Data
                      </h2>
                      <p className="text-sm text-gray-500">
                        View registered user information
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("account-details")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      My Data
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 transition">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Full Name:
                        </h3>
                        <p className="text-gray-600">
                          {user.full_name || user.email.split("@")[0]}
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 transition">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Email:
                        </h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 transition">
                        <h3 className="font-medium text-gray-900 mb-2">ID:</h3>
                        <p className="text-gray-600">{user.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AddressModal isOpen={addressModal} closeModal={closeAddressModal} />
      <LogoutModal
        isOpen={logoutModal}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModal(false)}
      />
    </>
  );
};

export default MyAccount;
