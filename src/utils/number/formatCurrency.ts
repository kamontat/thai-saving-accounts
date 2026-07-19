import { LOCALE } from "@/constants/locale";

const formatCurrency = (
	num: number,
	options?: Intl.NumberFormatOptions,
): string => {
	return num.toLocaleString(LOCALE, {
		style: "currency",
		currency: "THB",
		currencyDisplay: "symbol",
		...options,
	});
};
export default formatCurrency;
