import type { Month } from "./month";
import type { Product } from "./product";
import type { Rate } from "./rate";

export interface Allocation {
	product: Product<string>;
	/** Optimal deposit amount */
	amount: number;
	/** Interest amount for the optimal deposit */
	interestAmount: number;
	/** Interest rate for the optimal deposit */
	interestRate: Rate;
	/** Optimal range for the deposit */
	range: Month;
}
