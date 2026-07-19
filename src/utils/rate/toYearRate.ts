import type { Rate } from "@/types";
import toMonthRate from "./toMonthRate";

const toYearRate = (rate: Rate): number => {
	return toMonthRate(rate) * 12;
};
export default toYearRate;
