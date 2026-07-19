import { BANKS } from "@/constants/banks";
import { PAYOUT_FREQS } from "@/constants/payfreq";
import { TAGS } from "@/constants/tags";
import { PRODUCT_TYPES } from "@/constants/types";
import { newDate, newMonth } from "@/utils/date";
import { newMinMaxTier, newProduct } from "@/utils/product";
import { newYearPercent } from "@/utils/rate";

const kkpStartSaving = newProduct("kkp-start-saving", {
	name: "KKP Start Saving",
	description: "บัญชีออมทรัพย์ เปิดผ่านแอป TrueMoney Wallet ให้ดอกเบี้ยสูงสุด 1.20% ต่อปี",
	type: PRODUCT_TYPES.saving,
	bank: BANKS.kkp,
	payoutFreq: PAYOUT_FREQS.halfYearly,
	url: new URL(
		"https://bank.kkpfg.com/th/personal-banking/deposit/savings-account/kkp-start-saving",
	),
	tags: [TAGS["high-rate"], TAGS.digital],
	updatedAt: newDate(18, 7, 2026),

	minMonth: newMonth(1),
	maxAccount: 1,
	maxAmount: 1_000_000,
	amountStep: 5_000,
	tiers: [
		newMinMaxTier("Tier 1", newYearPercent(0.5), 0, 10_000),
		newMinMaxTier("Tier 2", newYearPercent(1.2), 10_000, 50_000),
		newMinMaxTier("Tier 3", newYearPercent(1.1), 50_000, 3_000_000),
		newMinMaxTier("Tier 3", newYearPercent(0.5), 3_000_000),
	],
});
export default kkpStartSaving;
