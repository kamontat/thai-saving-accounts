import { FORMAT_MODES, type FormatModeName } from "@/constants/format";
import type { FormatFn, FormatMapper, FormatOutput } from "@/types";

const newFormat = <Value>(mapper: FormatMapper<Value>): FormatFn<Value> => {
	const formatter = <Mode extends FormatModeName = typeof FORMAT_MODES.text>(
		value: Value,
		mode: Mode = FORMAT_MODES.text as Mode,
	): FormatOutput<Mode> => {
		switch (mode) {
			case FORMAT_MODES.text:
				return mapper[FORMAT_MODES.text](value) as FormatOutput<Mode>;
			case FORMAT_MODES.json:
				return mapper[FORMAT_MODES.json](value) as FormatOutput<Mode>;
			default:
				throw new Error(`Invalid format mode: ${mode}`);
		}
	};

	return formatter;
};
export default newFormat;
