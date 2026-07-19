const toRoundNumber = (num: number, decimal: number): number => {
	const factor = 10 ** decimal;
	return Math.round(num * factor) / factor;
};
export default toRoundNumber;
