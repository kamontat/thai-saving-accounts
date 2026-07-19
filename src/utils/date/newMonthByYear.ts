import type { Month } from "@/types";
import { newLogger } from "../loggers";
import newMonth from "./newMonth";

const logger = newLogger(["utils", "date", "newMonthByYear"] as const);

/**
 * Convert year to month amount
 */
const newMonthByYear = (year: number): Month => {
	const month = year * 12;
	logger.debugFn(() => ["convert %d year to %d month", year, month]);
	return newMonth(month);
};
export default newMonthByYear;
