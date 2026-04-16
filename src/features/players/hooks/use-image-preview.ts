"use client";

import { useState } from "react";

export function useImagePreview() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // store file for API upload
    setFile(selectedFile);

    // preview UI
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const resetPreview = () => {
    setPreview(null);
    setFile(null);
  };

  return {
    preview,
    file, 
    handleImageChange,
    resetPreview,
  };
}