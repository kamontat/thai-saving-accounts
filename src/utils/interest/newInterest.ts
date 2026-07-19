import type { GetObjectValue, Interest } from "@/types";

const newInterest = (interest: GetObjectValue<Interest>): Interest => {
	return {
		kind: "interest",
		...interest,
	};
};
export default newInterest;
