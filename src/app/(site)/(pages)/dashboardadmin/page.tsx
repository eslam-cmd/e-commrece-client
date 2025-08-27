
import React from "react";
import { Metadata } from "next";
import DashboardAmdin from "@/components/admin/DashboardAdmin";
export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <DashboardAmdin />
    </main>
  );
};

export default SigninPage;
