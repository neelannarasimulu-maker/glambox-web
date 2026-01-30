import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToWishlistButton from "@/components/microsite/AddToWishlistButton";
import { getMicrosite } from "@/lib/content/microsite";
import { getProductById, getProductsByMicrosite } from "@/lib/content/products";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ microsite: string; productId: string }>;
}) {
  const { microsite, productId } = await params;
  const config = getMicrosite(microsite);
  const productsData = getProductsByMicrosite(microsite);
  const product = getProductById(microsite, productId);

  if (!config || !productsData || !product) {
    notFound();
  }

  return (
    <main className="container-glambox section-pad">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="image-frame relative h-80 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="badge text-xs">{product.brand}</p>
          <h1 className="mt-4 text-3xl font-semibold heading-accent">
            {product.name}
          </h1>
          <p className="mt-3 text-[rgb(var(--text-300))]">
            {product.shortDesc}
          </p>
          <div className="mt-4 text-2xl font-semibold text-white">
            {formatZar(product.priceZar)}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-[rgb(var(--text-300))]">
            {product.details.map((detail) => (
              <li key={detail}>• {detail}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToWishlistButton productId={product.id} />
            <Link
              href={`/explore/${config.id}/shop`}
              className="btn-accent-outline"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
