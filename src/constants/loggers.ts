export const separator = ":" as const;

export const logLevel = {
	debug: "DBG",
	info: "INF",
	warn: "WRN",
	error: "ERR",
} as const;

export type Separator = typeof separator;
export type LogLevel = keyof typeof logLevel;
