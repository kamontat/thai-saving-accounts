import { FORMAT_MODES, type FormatModeName } from "@/constants/format";
import type { Allocation } from "@/types";
import { newFormat } from "@/utils/format";
import { formatNumber } from "@/utils/number";
import { formatProduct } from "@/utils/product";
import { formatRate } from "@/utils/rate";
import { formatMonth } from "../date";

const getFormattedAllocation = (
	allocation: Allocation,
	mode: FormatModeName,
) => ({
	product: formatProduct(allocation.product, mode),
	amount: formatNumber(allocation.amount),
	interestAmount: formatNumber(allocation.interestAmount),
	interestRate: formatRate(allocation.interestRate, mode),
	range: formatMonth(allocation.range, mode),
});

const formatAllocation = newFormat<Allocation>({
	[FORMAT_MODES.text]: (allocation) => {
		const { product, amount, interestAmount, range, interestRate } =
			getFormattedAllocation(allocation, FORMAT_MODES.text);

		return `${product} : ${amount} (${interestAmount} in ${range} @ ${interestRate})`;
	},
	[FORMAT_MODES.json]: (allocation) =>
		getFormattedAllocation(allocation, FORMAT_MODES.json),
});
export default formatAllocation;
