"use client";
import React, { useEffect, useState } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";
import Image from "next/image";
import Breadcrumb from "../Common/Breadcrumb";
import SingleGridItem from "../Shop/SingleGridItem";
import { product } from "@/types/product"; // ✅ استيراد النوع الموحد

const ShopWithoutSidebar = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "nutritionalsupplements", label: "Nutritional Supplements" },
    { value: "vitamin", label: "Vitamins" },
    { value: "proten", label: "Protein" },
    { value: "creatin", label: "Creatine" },
    { value: "healthyfoods", label: "Healthy Foods" },
  ];
  const apiUrl =  "https://e-commrece-backend.vercel.app";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/products`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const normalizedProducts: product[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            section: item.section,
            price: item.price,
            category: item.category,
            image_url: item.image_url,
            reviews: item.reviews ?? 0,
            status: "available",
            quantity: 1,
            discountedPrice: item.discountedPrice ?? item.price,
          }));
          setProducts(normalizedProducts);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        title="Browse All Products"
        pages={["Shop", "All Products"]}
      />

      <section className="py-8 lg:py-12 xl:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Shop Controls */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FiLoader className="animate-spin text-3xl text-blue-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Image
                src="/images/empty-state.svg"
                alt="No products found"
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No matching products found
              </h3>
              <p className="text-gray-500">
                Try changing your search filters or check back later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <SingleGridItem item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopWithoutSidebar;
