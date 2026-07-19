import { FORMAT_MODES } from "@/constants/format";
import type { Interest } from "@/types";
import { formatMonth } from "@/utils/date";
import { newFormat } from "@/utils/format";
import { formatCurrency } from "@/utils/number";
import { formatRate } from "@/utils/rate";

const formatInterest = newFormat<Interest>({
	[FORMAT_MODES.text]: (interest) => {
		const amount = formatCurrency(interest.amount);
		const month = formatMonth(interest.interestRange);
		const interestAmount = formatCurrency(interest.interestAmount);
		const interestRate = formatRate(interest.interestRate);

		return `${amount}: ${interestAmount} in ${month} (${interestRate})`;
	},
	[FORMAT_MODES.json]: (interest) => ({
		amount: formatCurrency(interest.amount),
		optimalAmount: formatCurrency(interest.optimalAmount),
		interestRange: formatMonth(interest.interestRange, FORMAT_MODES.json),
		interestAmount: formatCurrency(interest.interestAmount),
		interestRate: formatRate(interest.interestRate, FORMAT_MODES.json),
	}),
});
export default formatInterest;
