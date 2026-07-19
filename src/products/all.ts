import kkpStartSaving from "./kkp/kkp-start-saving";
import keptGrowSaving from "./krungsri/kept-grow-saving";

export const PRODUCTS = {
	[keptGrowSaving.id]: keptGrowSaving,
	[kkpStartSaving.id]: kkpStartSaving,
} as const;

export type ProductId = keyof typeof PRODUCTS;
