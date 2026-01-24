"use client";

import { useEffect, useState } from "react";

const wishlistKey = "glambox.wishlist";

const readWishlist = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(wishlistKey);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
};

const writeWishlist = (items: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(wishlistKey, JSON.stringify(items));
};

export default function AddToWishlistButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const items = readWishlist();
    setSaved(items.includes(productId));
  }, [productId]);

  const handleClick = () => {
    const items = readWishlist();
    if (items.includes(productId)) {
      const next = items.filter((item) => item !== productId);
      writeWishlist(next);
      setSaved(false);
      return;
    }
    writeWishlist([...items, productId]);
    setSaved(true);
  };

  return (
    <button type="button" onClick={handleClick} className="btn-primary">
      {saved ? "Saved to wishlist" : "Add to wishlist"}
    </button>
  );
}
