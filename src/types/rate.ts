import type { Month } from "./month";
import type { ObjectKind } from "./object";

/**
 * Represents a rate value, typically used for interest rates or other percentage-based values.
 * The rate is expressed as a decimal number, where 1.0 represents 100%.
 */
export interface Rate extends ObjectKind<"rate"> {
	freq: Month;
	amount: number;
}
