import { BANKS } from "@/constants/banks";
import { PAYOUT_FREQS } from "@/constants/payfreq";
import { TAGS } from "@/constants/tags";
import { PRODUCT_TYPES } from "@/constants/types";
import { newDate, newMonthByYear } from "@/utils/date";
import { newProduct, newTier } from "@/utils/product";
import { newYearPercent } from "@/utils/rate";

const keptGrowSaving = newProduct("kept-grow-saving", {
	name: "Kept Grow Savings",
	description: "บัญชีเก็บเงินก้อน ดอกเบี้ยสูง",
	type: PRODUCT_TYPES.saving,
	bank: BANKS.ksb,
	payoutFreq: PAYOUT_FREQS.monthly,
	url: new URL("https://www.keptbykrungsri.com/grow-savings"),
	tags: [TAGS["high-rate"]],
	updatedAt: newDate(18, 7, 2026),

	minMonth: newMonthByYear(2),
	maxAccount: 1,
	minAmount: 1,
	maxAmount: 2_000_000,

	tiers: [
		newTier("Tier 1", newYearPercent(1.25), (amount, month, { maxAmount }) => {
			const appliedAmount = Math.min(amount, maxAmount);
			const cond = month <= 18;
			return [cond, appliedAmount];
		}),
		newTier("Tier 2", newYearPercent(1.35), (amount, month, { maxAmount }) => {
			const appliedAmount = Math.min(amount, maxAmount);
			const cond = month > 18 && month <= 24;
			return [cond, appliedAmount];
		}),
	],
});
export default keptGrowSaving;
