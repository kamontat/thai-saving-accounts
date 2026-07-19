import { utilsLogger } from "@/constants/loggers";
import type { Month } from "@/types";
import newMonth from "./newMonth";

const logger = utilsLogger.extend("date:newMonthByYear");

/**
 * Convert year to month amount
 */
const newMonthByYear = (year: number): Month => {
	const month = year * 12;
	logger("convert %d year to %d month", year, month);
	return newMonth(month);
};
export default newMonthByYear;
