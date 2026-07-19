export const BANKS = {
	kkp: "Kiatnakin Phatra (KKP)",
	cimb: "CIMB Thai (CIMB)",
	ttb: "TMBThanachart Bank (TTB)",
	scb: "Siam Commercial Bank (SCB)",
	kbank: "Kasikorn Bank (KBank)",
	uob: "United Overseas Bank (UOB)",
	tcb: "Thai Credit Bank (TCB)",
	ksb: "Bank of Ayudhya (KSB)",
} as const;

export type BankId = keyof typeof BANKS;
export type BankName = (typeof BANKS)[BankId];
