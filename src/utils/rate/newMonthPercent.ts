import type { Rate } from "@/types";
import { newMonth } from "../date";
import { newLogger } from "../loggers";
import formatRate from "./formatRate";
import newRate from "./newRate";

const logger = newLogger(["utils", "rate", "newMonthPercent"] as const);

/**
 * create new rate object with frequency of 1 month
 * @param amount percentage per month (10 = 10%)
 * @returns rate object
 */
const newMonthPercent = (amount: number): Rate => {
	const result = newRate(amount / 100, newMonth(1));
	logger.debugFn(() => ["convert %d%% to %s", amount, formatRate(result)]);
	return result;
};
export default newMonthPercent;
