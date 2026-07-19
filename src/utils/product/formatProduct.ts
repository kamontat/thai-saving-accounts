import { FORMAT_MODES } from "@/constants/format";
import type { Product } from "@/types";
import { newFormat } from "@/utils/format";
import { formatNumber } from "@/utils/number";
import { formatMonth } from "../date";
import formatTier from "./formatTier";

const formatProduct = newFormat<Product<string>>({
	[FORMAT_MODES.text]: (product) => `'${product.name} (${product.type})'`,
	[FORMAT_MODES.json]: (product) => ({
		id: product.id,
		name: product.name,
		type: product.type,
		bank: product.bank,
		tags: product.tags,
		minMonth: formatMonth(product.minMonth, FORMAT_MODES.json),
		maxAccount: formatNumber(product.maxAccount),
		tiers: product.tiers.map((tier) => formatTier(tier, FORMAT_MODES.json)),
	}),
});
export default formatProduct;
