import type { ProductTier, ProductTierTest, Rate } from "@/types";

const newTier = (
	name: string,
	rate: Rate,
	test: ProductTierTest,
): ProductTier => {
	return { kind: "product-tier", name, rate, test };
};
export default newTier;
