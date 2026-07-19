import type { FORMAT_MODES, FormatModeName } from "@/constants/format";

type NestedStringRecord = {
	[key: string]: string | string[] | NestedStringRecord | NestedStringRecord[];
};

export type FormatOutput<Mode extends FormatModeName> =
	Mode extends typeof FORMAT_MODES.text ? string : NestedStringRecord;

export type FormatMapper<Value> = {
	[Mode in FormatModeName]: (value: Value) => FormatOutput<Mode>;
};

export type FormatFn<Value> = <
	Mode extends FormatModeName = typeof FORMAT_MODES.text,
>(
	value: Value,
	mode?: Mode,
) => FormatOutput<Mode>;
