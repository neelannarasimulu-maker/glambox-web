import hair from "@/content/products/hair.products.json";
import nails from "@/content/products/nails.products.json";
import wellness from "@/content/products/wellness.products.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  priceZar: number;
  image: string;
  shortDesc: string;
  details: string[];
  tags: string[];
};

export type ProductsData = {
  microsite: string;
  currency: string;
  products: Product[];
};

const productsByMicrosite: Record<string, ProductsData> = {
  hair,
  nails,
  wellness,
};

export const getProductsByMicrosite = (microsite: string) =>
  productsByMicrosite[microsite];

export const getProductById = (microsite: string, productId: string) =>
  productsByMicrosite[microsite]?.products.find(
    (product) => product.id === productId,
  );
