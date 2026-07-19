import type { Interest, Month, Product } from "@/types";
import { newMonth, toMonth } from "@/utils/date";
import { newInterest } from "@/utils/interest";
import { newLogger } from "@/utils/loggers";
import { formatNumber } from "@/utils/number";
import { newRate, toMonthRate } from "@/utils/rate";

const logger = newLogger(["calculators", "calInterest"] as const);

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
	logger.debugFn(() => [
		"calculate %s for %d months of %d",
		product.name,
		months,
		money,
	]);

	if (money <= Math.max(0, product.minAmount)) {
		const month = newMonth(months);
		return newInterest({
			amount: money,
			optimalAmount: 0,
			interestRange: month,
			interestAmount: 0,
			interestRate: newRate(0, month),
		});
	}

	let optimalAmount = 0;
	let optimalInterestAmount = 0;
	for (let month = 1; month <= months; month++) {
		logger.debugFn(() => ["begin month %d", month]);
		const result = product.tiers.reduce((acc, tier) => {
			const [enabled, amount] = tier.test(money, month, product);
			if (!enabled) {
				logger.debugFn(() => [
					"tier '%s' is disabled for month %d",
					tier.name,
					month,
				]);
				return acc;
			}

			const monthInterestAmount = amount * toMonthRate(tier.rate);
			optimalInterestAmount += monthInterestAmount;
			logger.debugFn(() => [
				"current interest amount: %s (total: %s)",
				formatNumber(monthInterestAmount),
				formatNumber(optimalInterestAmount),
			]);

			acc += amount;
			logger.debugFn(() => [
				"current amount: %s (total: %s)",
				formatNumber(amount),
				formatNumber(acc),
			]);
			return acc;
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
