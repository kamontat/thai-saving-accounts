import { LOCALE } from "@/constants/locale";

const formatNumber = (
	num: number,
	options?: Intl.NumberFormatOptions,
): string => {
	return num.toLocaleString(LOCALE, {
		style: "decimal",
		...options,
	});
};
export default formatNumber;
