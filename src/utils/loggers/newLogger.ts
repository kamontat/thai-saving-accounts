import { debug, error, info, warn } from "node:console";
import _createDebug, { type Debugger, enabled } from "debug";
import { type LogLevel, type Separator, separator } from "@/constants/loggers";
import type { Logger, MsgFn } from "@/types";
import newNamespace from "./newNamespace";

const baseNamespace = ["sav"] as const;
type BaseNS = typeof baseNamespace;

const baseLogMap = {
	debug: debug,
	info: info,
	warn: warn,
	error: error,
} as const;

const createDebug = (level: LogLevel, ns: string) => {
	const debug = _createDebug(ns);
	debug.log = baseLogMap[level];
	return debug;
};

const newLog = (level: LogLevel, namespace: string, sep: string) => {
	const ns = newNamespace([namespace, level], sep);
	const isEnabled = enabled(ns);

	let logger: Debugger | undefined;
	return {
		isEnabled,
		str: (msg: unknown, ...params: unknown[]): void => {
			if (!isEnabled) return; // return early if the logger is not enabled for this namespace
			if (!logger) logger = createDebug(level, ns);
			logger(msg, ...params);
		},
		msg: (msg: MsgFn): void => {
			if (!isEnabled) return; // return early if the logger is not enabled for this namespace
			if (!logger) logger = createDebug(level, ns);
			logger(...msg());
		},
	};
};

const newLogger = <NS extends string[], SEP extends string = Separator>(
	namespaces: NS,
	sep: SEP = separator as SEP,
): Logger<[...BaseNS, ...NS], SEP> => {
	type NewNS = [...BaseNS, ...NS];
	const baseNS = newNamespace<NewNS, SEP>(
		[...baseNamespace, ...namespaces],
		sep,
	);

	const {
		isEnabled: isDebug,
		str: debug,
		msg: debugFn,
	} = newLog("debug", baseNS, sep);
	const {
		isEnabled: isInfo,
		str: info,
		msg: infoFn,
	} = newLog("info", baseNS, sep);
	const {
		isEnabled: isWarn,
		str: warn,
		msg: warnFn,
	} = newLog("warn", baseNS, sep);
	const {
		isEnabled: isError,
		str: error,
		msg: errorFn,
	} = newLog("error", baseNS, sep);

	return {
		namespace: baseNS,
		isDebug,
		debug,
		debugFn,

		isInfo,
		info,
		infoFn,

		isWarn,
		warn,
		warnFn,

		isError,
		error,
		errorFn,

		extend: <NewNS extends string[]>(...newNamespaces: NewNS) => {
			type ExtendedNS = [...NS, ...NewNS];
			return newLogger([...namespaces, ...newNamespaces] as ExtendedNS, sep);
		},
	};
};
export default newLogger;
