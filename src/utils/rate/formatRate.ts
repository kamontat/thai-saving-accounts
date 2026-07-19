import { FORMAT_MODES } from "@/constants/format";
import { LOCALE } from "@/constants/locale";
import type { Rate } from "@/types";
import { newFormat } from "@/utils/format";
import { formatNumber } from "@/utils/number";
import { formatMonth } from "../date";
import toYearRate from "./toYearRate";

const formatRate = newFormat<Rate>({
	[FORMAT_MODES.text]: (rate) => {
		const yearly = toYearRate(rate);
		const amount = yearly.toLocaleString(LOCALE, {
			style: "percent",
			minimumSignificantDigits: 3,
			maximumSignificantDigits: 5,
		});
		return `${amount}/year`;
	},
	[FORMAT_MODES.json]: (rate) => ({
		amount: formatNumber(rate.amount),
		freq: formatMonth(rate.freq, FORMAT_MODES.json),
	}),
});

export default formatRate;
