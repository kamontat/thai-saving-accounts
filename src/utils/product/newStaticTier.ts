import type { ProductTier, Rate } from "@/types";
import newTier from "./newTier";

/**
 * new tier with static rate
 * @param name tier name
 * @param rate tier rate
 * @returns ProductTier
 */
const newStaticTier = (name: string, rate: Rate): ProductTier => {
	return newTier(name, rate, (amount) => {
		return [true, amount];
	});
};
export default newStaticTier;
