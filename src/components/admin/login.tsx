"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiLogIn, FiLoader } from "react-icons/fi";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const apiUrl = "https://e-commrece-backend.vercel.app";
  console.log("الرابط المستخدم:", apiUrl);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`https://e-commrece-backend.vercel.app/api/auth/admin_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // حفظ بيانات الدخول
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isAdmin", "true");

        setMessage({ text: "Login successful!", type: "success" });

        // الانتقال للوحة التحكم مع إعادة تحميل كاملة
        setTimeout(() => {
          router.replace("/dashboardadmin"); // الانتقال
          window.location.reload(); // إعادة تحميل
        }, 800);
      } else {
        setMessage({
          text: data.message || "Invalid login credentials",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "Server connection error", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-blue-100 mt-1">Please login to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-7" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-7" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pr-10 pl-4 py-3 border border-gray-6 rounded-lg focus:ring-2 focus:ring-blue-light focus:border-blue-light transition"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-dark to-blue-light hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg shadow-md transition disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FiLogIn />
                Login
              </>
            )}
          </button>
        </form>

        {/* Message Notification */}
        {message && (
          <div
            className={`px-6 pb-6 ${
              message.type === "success" ? "animate-fade-in" : "animate-shake"
            }`}
          >
            <div
              className={`p-3 rounded-lg text-center ${
                message.type === "success"
                  ? "bg-green-light text-green-dark"
                  : "bg-red-light text-red-dark"
              }`}
            >
              {message.text}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © 2023 Management System. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-5px);
          }
          40%,
          80% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
