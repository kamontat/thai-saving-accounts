import type { BankName } from "@/constants/banks";
import type { PayoutFreqName } from "@/constants/payfreq";
import type { TagName } from "@/constants/tags";
import type { ProductTypeName } from "@/constants/types";
import type { Month } from "./month";
import type { ObjectKind } from "./object";
import type { Rate } from "./rate";

export type ProductTierTestResult = [boolean, number];

/**
 * Represents a condition function for a product tier.
 * @param amount - The amount to evaluate the condition against.
 * @param month - The month to evaluate the condition against.
 * @returns A boolean indicating whether the condition is met, optionally accompanied by a number representing the applied amount.
 */
export type ProductTierTest = (
	amount: number,
	month: number,
	product: Product<string>,
) => ProductTierTestResult;

export interface ProductTier extends ObjectKind<"product-tier"> {
	name: string;
	rate: Rate;
	test: ProductTierTest;
}

export interface Product<ID extends string> extends ObjectKind<"product"> {
	id: ID;
	name: string;
	description: string;
	type: ProductTypeName;
	bank: BankName;
	payoutFreq: PayoutFreqName;
	url: URL;
	updatedAt: Date;
	tags: TagName[];

	/** Minimum month requirement for best outcome (default = 1M) */
	minMonth: Month;
	/** Maximum account limit for the product (default = Infinity) */
	maxAccount: number;
	/** Minimum optimal amount for the product (default = 0) */
	minAmount: number;
	/** Maximum optimal amount for the product */
	maxAmount: number;
	/** amount steps for calculating optimal amount (default = 1) */
	amountStep: number;

	tiers: ProductTier[];
}
