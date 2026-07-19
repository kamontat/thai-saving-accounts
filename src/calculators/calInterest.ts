import { calculatorsLogger } from "@/constants/loggers";
import type { Interest, Month, Product } from "@/types";
import { newMonth, toMonth } from "@/utils/date";
import { newInterest } from "@/utils/interest";
import { formatNumber } from "@/utils/number";
import { newRate, toMonthRate } from "@/utils/rate";

const logger = calculatorsLogger.extend("calInterest");

/**
 * Calculate the interest amount for a given product
 *
 * Performance: O(n * m) where n is the number of months and m is the number of tiers in the product
 *
 * @param product a given product
 * @param money a given money amount
 * @param month how many months the money is deposited (default to minMonth of the product)
 * @returns the interest amount for the given product, money, and month
 */
const calInterest = <ID extends string>(
	product: Product<ID>,
	money: number,
	range?: Month,
): Interest => {
	const months = toMonth(range ?? product.minMonth);
	logger("calculate %s for %d months of %d", product.name, months, money);

	let optimalAmount = 0;
	let optimalInterestAmount = 0;
	for (let month = 1; month <= months; month++) {
		logger("begin month %d", month);
		const result = product.tiers.reduce((output, tier) => {
			const [enabled, amount] = tier.test(money, month, product);
			if (!enabled) {
				logger("tier '%s' is disabled for month %d", tier.name, month);
				return output;
			}

			const monthInterestAmount = amount * toMonthRate(tier.rate);
			optimalInterestAmount += monthInterestAmount;
			logger(
				"current interest amount: %s (total: %s)",
				formatNumber(monthInterestAmount),
				formatNumber(optimalInterestAmount),
			);

			output += amount;
			logger(
				"current amount: %s (total: %s)",
				formatNumber(amount),
				formatNumber(output),
			);
			return output;
		}, 0);

		optimalAmount = Math.max(optimalAmount, result);
	}

	// Guardrail: Optimal amount should never exceed the given money amount
	if (optimalAmount > money)
		throw new Error("Optimal amount exceeds the given money");

	const optimalInterestRate = newRate(
		optimalInterestAmount / optimalAmount,
		newMonth(months),
	);

	return newInterest({
		amount: money,
		optimalAmount,
		interestRange: newMonth(months),
		interestAmount: optimalInterestAmount,
		interestRate: optimalInterestRate,
	});
};
export default calInterest;
