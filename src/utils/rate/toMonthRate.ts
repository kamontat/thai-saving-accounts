import type { Rate } from "@/types";
import { toMonth } from "@/utils/date";

const toMonthRate = (rate: Rate): number => {
	return rate.amount / toMonth(rate.freq);
};
export default toMonthRate;
