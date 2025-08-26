"use client";

import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const AdvancedFeedbackFormContent = dynamic(
  () => import("./AdvancedFeedbackFormContent"),
  {
    ssr: false,
    loading: () => <div>Loading feedback form...</div>,
  }
);

export default function AdvancedFeedbackForm() {
  return <AdvancedFeedbackFormContent />;
}
