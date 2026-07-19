import type { Month } from "@/types";

const newMonth = (value: number): Month => {
	return { kind: "month", value };
};

export default newMonth;
