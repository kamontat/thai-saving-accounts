import type { Interest } from "@/types";
import { toMonthRate } from "@/utils/rate";

/**
 * If interest a is better than interest b
 * @param a interest A
 * @param b interest B
 * @returns true if interest A is better than interest B, otherwise false
 */
const isBetterInterest = (a: Interest, b: Interest): boolean => {
	const aInterestRate = toMonthRate(a.interestRate);
	const bInterestRate = toMonthRate(b.interestRate);
	return aInterestRate > bInterestRate;
};
export default isBetterInterest;
