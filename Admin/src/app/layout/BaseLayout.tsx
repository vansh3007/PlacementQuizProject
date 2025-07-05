import React from "react";
import CustomSidebar from "@/components/shared/CustomSidebar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomSidebar>{children}</CustomSidebar>;
}
