import { FORMAT_MODES } from "@/constants/format";
import { LOCALE } from "@/constants/locale";
import { newFormat } from "../format";

const formatDate = newFormat<Date>({
	[FORMAT_MODES.text]: (date) =>
		date.toLocaleDateString(LOCALE, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}),
	[FORMAT_MODES.json]: (date) => ({
		year: date.getUTCFullYear().toFixed(0),
		month: (date.getUTCMonth() + 1).toFixed(0),
		day: date.getUTCDate().toFixed(0),
	}),
});
export default formatDate;
