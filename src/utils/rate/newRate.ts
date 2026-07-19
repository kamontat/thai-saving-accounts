import type { Month, Rate } from "@/types";

const newRate = (amount: number, freq: Month): Rate => {
	return { kind: "rate", freq, amount };
};
export default newRate;
