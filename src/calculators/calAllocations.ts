import { calculatorsLogger } from "@/constants/loggers";
import type { Allocation, Interest, Month, Product } from "@/types";
import { formatInterest, isBetterInterest } from "@/utils/interest";
import { formatProduct } from "@/utils/product";
import calInterest from "./calInterest";

const logger = calculatorsLogger.extend("calAllocations");

const calAllocations = (
	products: Product<string>[],
	money: number,
	range?: Month,
): Allocation[] => {
	if (money <= 0 || products.length === 0) return [];

	let remain = money;
	const allocations: Allocation[] = [];
	/** Map of product id and opened account */
	const productAccounts = new Map<string, number>();
	while (remain > 0) {
		logger("calculate allocations for remain: %d", remain);

		const possibleProducts = products.filter((product) => {
			const openedAccount = productAccounts.get(product.id) ?? 0;
			return openedAccount < product.maxAccount;
		});

		if (possibleProducts.length === 0) {
			logger("no possible products to allocate remain: %d", remain);
			break;
		}

		const firstProduct = possibleProducts.at(0) as Product<string>;
		const firstInterest = calInterest(firstProduct, remain, range);
		const restProducts = possibleProducts.slice(1);

		/** 0: BestProduct, 1: BestInterest */
		type BestProduct = [Product<string>, Interest];
		const base: BestProduct = [firstProduct, firstInterest];
		const [bestProduct, bestInterest] = restProducts.reduce(
			([best, bestInterest], product) => {
				const currentInterest = calInterest(product, remain, range);
				if (isBetterInterest(currentInterest, bestInterest))
					return [product, currentInterest] as BestProduct;
				return [best, bestInterest] as BestProduct;
			},
			base,
		);

		logger("best product: %s", formatProduct(bestProduct));
		logger("best interest: %s", formatInterest(bestInterest));

		const openedAccount = productAccounts.get(bestProduct.id) ?? 0;
		productAccounts.set(bestProduct.id, openedAccount + 1);

		remain -= bestInterest.optimalAmount;
		allocations.push({
			product: bestProduct,
			amount: bestInterest.optimalAmount,
			interestAmount: bestInterest.interestAmount,
			interestRate: bestInterest.interestRate,
			range: bestInterest.interestRange,
		});
	}

	return allocations;
};
export default calAllocations;
