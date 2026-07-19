import { calAmount, calInterest } from "@/calculators";
import { appLogger } from "@/constants/loggers";
import { getProductById } from "@/products";
import { toInfo } from "@/utils/loggers";
import { formatInterest } from "./utils/interest";
import { FORMAT_MODES } from "./constants/format";

const logger = toInfo(appLogger.extend("index"));

// const amounts = [
// 	1_000, 2_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000, 2_000_000,
// 	3_000_000, 5_000_000, 10_000_000,
// ];

// const products = [
// 	getProductById("kept-grow-saving"),
// 	getProductById("kkp-start-saving"),
// ];

// products.forEach((product) => {
// 	amounts.forEach((amount) => {
// 		const interest = calInterest(product, amount);
// 		logger(formatInterest(interest));
// 	});
// });

// const product = getProductById("kept-grow-saving");
// const amount = calAmount(product);
// console.log(amount);

logger(
	formatInterest(
		calInterest(getProductById("kept-grow-saving"), 10_000_000),
		FORMAT_MODES.json,
	),
);

// logger(
// 	formatInterest(
// 		calInterest(getProductById("kkp-start-saving"), 10_000_000),
// 		FORMAT_MODES.text,
// 	),
// );

// calAllocations(getProducts(), 10_000_000)
// 	.map((a) => formatAllocation(a, FORMAT_MODES.text))
// 	.forEach((a) => {
// 		logger(JSON.stringify(a, null, 2));
// 	});
