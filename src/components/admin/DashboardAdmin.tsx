'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUsers, FiShoppingBag, FiSettings, FiLogOut, FiHome, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

import UsersPanel from './panels/usersPanel';
import ProductsPanel from './panels/ProductPanel';
import AccountPanel from './panels/AccountPanel';

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('users');
  const [adminEmail, setAdminEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('adminEmail');
    if (role !== 'admin') {
      router.push('/admin-login');
    } else {
      setAdminEmail(email || 'admin@example.com');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/admin-login');
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: <FiUsers className="text-lg" /> },
    { id: 'products', label: 'Products', icon: <FiShoppingBag className="text-lg" /> },
    { id: 'account', label: 'My Account', icon: <FiSettings className="text-lg" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-5 hover:text-gray-7"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <div className="w-8" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static h-full lg:w-72 w-80 bg-white shadow-lg z-40 transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out flex-shrink-0`}
        >
          <div className="h-full flex flex-col p-4 border-r border-gray-200 overflow-y-auto">
            {/* Admin Profile */}
            <div className="flex items-center gap-4 p-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="/images/users/user-04.jpg"
                  alt="admin"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 truncate max-w-[180px]">System Admin</p>
                <p className="text-xs text-gray-6 truncate max-w-[180px]">{adminEmail}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-blue-light text-blue-light-5 font-medium'
                      : 'text-gray-7 hover:bg-gray-1'
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
              className="w-full flex items-center gap-3 px-4 py-3 mt-auto rounded-lg text-red-light hover:bg-red-50 transition text-sm"
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
            <div className="container mx-auto px-6 py-3 text-sm text-gray-4 flex items-center gap-2">
              <FiHome className="text-gray-5" />
              <span>/</span>
              <span className="font-medium text-gray-7">Dashboard</span>
              <span>/</span>
              <span className="text-gray-500">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="container mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                {activeTab === 'users' && <UsersPanel />}
                {activeTab === 'products' && <ProductsPanel />}
                {activeTab === 'account' && <AccountPanel/>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
