import type { Month, Product } from "@/types";
import { toMonthRate } from "@/utils/rate";
import calInterest from "./calInterest";

/**
 * Calculate the optimal amount for a given product and range.
 * @param product product
 * @param range range of months (default to optimal product range)
 * @returns optimal amount
 */
const calAmount = (product: Product<string>, range?: Month): number => {
	let bestAmount = 0;
	let bestInterestRate = 0;

	for (let amount = product.minAmount; amount <= product.maxAmount; amount++) {
		const interest = calInterest(product, amount, range);
		const monthRate = toMonthRate(interest.interestRate);
		if (monthRate > bestInterestRate) {
			bestInterestRate = monthRate;
			bestAmount = interest.optimalAmount;
		}
	}
	return bestAmount;
};
export default calAmount;
