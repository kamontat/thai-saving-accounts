import type { GetObjectValue, Product } from "@/types";
import { newMonth } from "@/utils/date";

type OptionalKey = "minMonth" | "maxAccount" | "minAmount" | "maxAmount";

export type OptionalProduct<ID extends string> = Omit<
	GetObjectValue<Product<ID>>,
	"id" | OptionalKey
> &
	Partial<Pick<Product<ID>, OptionalKey>>;

const newProduct = <ID extends string>(
	id: ID,
	product: OptionalProduct<ID>,
): Product<ID> => {
	return {
		kind: "product",
		id,
		...product,
		minMonth: product.minMonth ?? newMonth(1),
		maxAccount: product.maxAccount ?? Number.POSITIVE_INFINITY,
		minAmount: product.minAmount ?? 1,
		maxAmount: product.maxAmount ?? Number.POSITIVE_INFINITY,
	};
};
export default newProduct;
