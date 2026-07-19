import type { Debugger } from "debug";

const toWarn = (debug: Debugger): Debugger => {
	const warn = debug.extend("warn");
	warn.log = console.warn.bind(console);
	return warn;
};
export default toWarn;
