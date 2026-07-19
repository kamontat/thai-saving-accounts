import type { ProductTier, Rate } from "@/types";
import newTier from "./newTier";

/**
 * new tier with min and max amount
 * @param name tier name
 * @param rate tier rate
 * @param min tier minimum amount (exclusive)
 * @param max tier maximum amount (inclusive)
 * @returns ProductTier
 */
const newMinMaxTier = (
	name: string,
	rate: Rate,
	min: number,
	max?: number,
): ProductTier => {
	if (min < 0 || (max ?? 0) < 0)
		throw new Error("min and max must be greater than or equal to 0");
	if (max !== undefined && min >= max)
		throw new Error("min must be less than max");

	return newTier(name, rate, (amount) => {
		const cond = amount > min;
		const maxAmount = max ? Math.min(amount - min, max - min) : amount - min;
		return [cond, maxAmount];
	});
};
export default newMinMaxTier;
