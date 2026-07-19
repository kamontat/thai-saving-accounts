export const PRODUCT_TYPES = {
	saving: "Saving",
	"fixed-deposit": "Fixed Deposit",
	"long-term": "Long-term",
} as const;

export type ProductTypeId = keyof typeof PRODUCT_TYPES;
export type ProductTypeName = (typeof PRODUCT_TYPES)[ProductTypeId];
