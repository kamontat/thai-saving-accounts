import { FORMAT_MODES } from "@/constants/format";
import type { ProductTier } from "@/types";
import { newFormat } from "@/utils/format";
import { formatRate } from "@/utils/rate";

const formatTier = newFormat<ProductTier>({
	[FORMAT_MODES.text]: (tier) =>
		`'[${tier.name}] ${formatRate(tier.rate, FORMAT_MODES.text)}'`,
	[FORMAT_MODES.json]: (tier) => ({
		name: tier.name,
		rate: formatRate(tier.rate, FORMAT_MODES.json),
	}),
});
export default formatTier;
