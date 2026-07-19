import type { Month } from "./month";
import type { ObjectKind } from "./object";
import type { Rate } from "./rate";

export interface Interest extends ObjectKind<"interest"> {
	/** Original amount of money */
	amount: number;
	/** Optimal amount for the given interest rate */
	optimalAmount: number;
	/** Month for the given interest amount */
	interestRange: Month;
	/** Interest amount for the given optimal amount */
	interestAmount: number;
	/** Interest rate for the given optimal amount */
	interestRate: Rate;
}
