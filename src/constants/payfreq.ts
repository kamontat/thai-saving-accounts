export const PAYOUT_FREQS = {
	monthly: "1 Month",
	quarterly: "3 Months",
	halfYearly: "6 Months",
	yearly: "1 Year",
} as const;

export type PayoutFreqId = keyof typeof PAYOUT_FREQS;
export type PayoutFreqName = (typeof PAYOUT_FREQS)[PayoutFreqId];
