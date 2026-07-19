export const TAGS = {
	digital: "Digital",
	"high-rate": "High Rate",
	"no-min-deposit": "No Min Deposit",
	"tax-free": "Tax Free",
	insurance: "Insurance",
	senior: "Senior",
} as const;

export type TagId = keyof typeof TAGS;
export type TagName = (typeof TAGS)[TagId];
