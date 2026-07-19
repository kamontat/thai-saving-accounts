/**
 * Get a Date object from day, month, and year.
 * @param day - The day of the month (1-31)
 * @param month - The month (1-12)
 * @param year - The year (e.g., 2026)
 * @returns A Date object representing the specified date
 */
const newDate = (day: number, month: number, year: number): Date => {
	return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

export default newDate;
