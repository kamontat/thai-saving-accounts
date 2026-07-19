import type { ObjectKind } from "./object";

/**
 * Represents a month value, typically used for durations or time periods.
 * The month is expressed as a whole number, where 1 represents one month.
 */
export interface Month extends ObjectKind<"month"> {
	value: number;
}
