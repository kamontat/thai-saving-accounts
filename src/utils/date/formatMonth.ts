import { FORMAT_MODES } from "@/constants/format";
import type { Month } from "@/types";
import { newFormat } from "../format";
import { formatNumber } from "../number";

const formatMonth = newFormat<Month>({
	[FORMAT_MODES.text]: (date) => {
		return `${date.value} months`;
	},
	[FORMAT_MODES.json]: (date) => ({
		value: formatNumber(date.value),
		unit: "month",
	}),
});
export default formatMonth;
