"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryData } from "@/lib/content/gallery";

export default function GalleryGrid({ data }: { data: GalleryData }) {
  const [tag, setTag] = useState("all");

  const tags = useMemo(() => {
    const unique = new Set<string>();
    data.items.forEach((item) => item.tags.forEach((itemTag) => unique.add(itemTag)));
    return Array.from(unique);
  }, [data.items]);

  const items = useMemo(() => {
    if (tag === "all") return data.items;
    return data.items.filter((item) => item.tags.includes(tag));
  }, [data.items, tag]);

  return (
    <div className="container-glambox section-pad">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="badge text-xs">Gallery</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Latest looks</h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            Browse by tag to explore the aesthetic.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => setTag("all")}
            className={`rounded-full border px-4 py-2 ${
              tag === "all"
                ? "border-white/40 text-white"
                : "border-white/10 text-[rgb(var(--text-300))]"
            }`}
          >
            All
          </button>
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              className={`rounded-full border px-4 py-2 ${
                tag === item
                  ? "border-white/40 text-white"
                  : "border-white/10 text-[rgb(var(--text-300))]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
        {items.map((item) => (
          <div key={item.id} className="mb-6 break-inside-avoid">
            <div className="card overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-sm text-[rgb(var(--text-300))]">
                {item.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
