import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMicrosite } from "@/lib/content/microsite";
import { getProductsByMicrosite } from "@/lib/content/products";

const formatZar = (value: number) => `R${value.toLocaleString("en-ZA")}`;

export default async function ShopPage({
  params,
}: {
  params: Promise<{ microsite: string }>;
}) {
  const { microsite } = await params;
  const config = getMicrosite(microsite);
  const productsData = getProductsByMicrosite(microsite);

  if (!config || !productsData) {
    notFound();
  }

  return (
    <main className="container-glambox section-pad">
      <div>
        <h1 className="text-3xl font-semibold heading-accent">
          Products curated for you
        </h1>
        <p className="mt-3 text-[rgb(var(--text-300))]">
          Essentials and rituals aligned with this microsite.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {productsData.products.map((product) => (
          <div
            key={product.id}
            className="card-accent card-hover p-6"
          >
            <div className="image-frame relative h-40 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold heading-accent">
              {product.name}
            </h3>
            <p className="text-sm text-[rgb(var(--text-300))]">
              {product.shortDesc}
            </p>
            <div className="mt-3 text-white">
              {formatZar(product.priceZar)}
            </div>
            <Link
              href={`/explore/${config.id}/shop/${product.id}`}
              className="btn-accent mt-4 inline-flex"
            >
              View product
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
