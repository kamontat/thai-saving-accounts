import type { Debugger } from "debug";

const toInfo = (debug: Debugger): Debugger => {
	const info = debug.extend("info");
	info.log = console.info.bind(console);
	return info;
};
export default toInfo;
