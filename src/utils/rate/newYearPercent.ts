import type { Rate } from "@/types";
import { newMonthByYear } from "../date";
import { newLogger } from "../loggers";
import formatRate from "./formatRate";
import newRate from "./newRate";

const logger = newLogger(["utils", "rate", "newYearPercent"] as const);

/**
 * create new rate object with frequency of 1 year
 * @param amount percentage per year (10 = 10%)
 * @returns rate object
 */
const newYearPercent = (amount: number): Rate => {
	const result = newRate(amount / 100, newMonthByYear(1));
	logger.debugFn(() => ["convert %d%% to %s", amount, formatRate(result)]);
	return result;
};
export default newYearPercent;
