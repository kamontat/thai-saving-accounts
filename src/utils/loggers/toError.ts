import type { Debugger } from "debug";

const toError = (debug: Debugger): Debugger => {
	const error = debug.extend("error");
	error.log = console.error.bind(console);
	return error;
};
export default toError;
