import { ReactNode } from "react";
import { redirect } from "next/navigation";

// This layout will be applied to all admin pages
export default function AdminLayout({ children }: { children: ReactNode }) {
  // Note: Authentication is handled client-side in each page component
  // This layout provides the structure for admin pages

  return <div className="admin-layout">{children}</div>;
}

// Metadata for admin pages
export const metadata = {
  title: "199S Studio CMS - Admin Panel",
  description: "Content Management System for 199S Studio",
  robots: "noindex, nofollow", // Hide from search engines
};
