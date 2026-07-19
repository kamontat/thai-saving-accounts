const isNumberEqual = (
	a: number,
	b: number,
	precision: number = 4,
): boolean => {
	const factor = 10 ** precision;
	return Math.round(a * factor) === Math.round(b * factor);
};
export default isNumberEqual;
