import AdminLoginPage from "@/components/admin/login";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <AdminLoginPage />
    </main>
  );
};

export default SigninPage;
