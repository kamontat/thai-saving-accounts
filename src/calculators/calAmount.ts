import type { Month, Product } from "@/types";
import { formatInterest } from "@/utils/interest";
import { newLogger } from "@/utils/loggers";
import { toMonthRate } from "@/utils/rate";
import calInterest from "./calInterest";

const logger = newLogger(["calculators", "calAmount"] as const);

/**
 * Calculate the optimal amount for a given product and range.
 *
 * Performance: O(a * n * m) where a is the amount range (maxAmount - minAmount),
 * n is the number of months, and m is the number of tiers in the product
 *
 * @param product product
 * @param range range of months (default to optimal product range)
 * @returns optimal amount
 */
const calAmount = (product: Product<string>, range?: Month): number => {
	let bestAmount = 0;
	let bestInterestRate = 0;

	logger.debugFn(() => ["calculate optimal amount for %s", product.name]);
	let amount = product.minAmount;
	while (true) {
		const interest = calInterest(product, amount, range);
		const monthRate = toMonthRate(interest.interestRate);
		logger.debugFn(() => ["calculate rate: %s", formatInterest(interest)]);
		if (monthRate > bestInterestRate) {
			logger.debug("saved as best rate");
			bestInterestRate = monthRate;
			bestAmount = interest.optimalAmount;
		}

		if (amount === product.maxAmount) break;
		amount = Math.min(amount + product.amountStep, product.maxAmount);
	}

	return bestAmount;
};
export default calAmount;
