"use client";

import { useState } from "react";

export function useImagePreview() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const resetPreview = () => {
    setPreview(null);
  };

  return {
    preview,
    handleImageChange,
    resetPreview,
  };
}