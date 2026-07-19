import type { Rate } from "@/types";
import { newMonth } from "../date";
import { newLogger } from "../loggers";
import formatRate from "./formatRate";
import newRate from "./newRate";

const logger = newLogger(["utils", "rate", "newMonthRate"] as const);

/**
 * create new rate object with frequency of 1 month
 * @param amount rate amount per month (0.01 = 1%)
 * @returns rate object
 */
const newMonthRate = (amount: number): Rate => {
	const result = newRate(amount, newMonth(1));
	logger.debugFn(() => ["convert rate %d to %s", amount, formatRate(result)]);
	return result;
};
export default newMonthRate;
