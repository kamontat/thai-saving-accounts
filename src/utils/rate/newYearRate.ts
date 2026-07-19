import type { Rate } from "@/types";
import { newMonthByYear } from "../date";
import { newLogger } from "../loggers";
import formatRate from "./formatRate";
import newRate from "./newRate";

const logger = newLogger(["utils", "rate", "newYearRate"] as const);

/**
 * create new rate object with frequency of 1 year
 * @param amount rate amount per year (0.01 = 1%)
 * @returns rate object
 */
const newYearRate = (amount: number): Rate => {
	const result = newRate(amount, newMonthByYear(1));
	logger.debugFn(() => ["convert rate %d to %s", amount, formatRate(result)]);
	return result;
};
export default newYearRate;
