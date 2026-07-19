/** biome-ignore-all lint/suspicious/noExplicitAny: Msg support input of any type */

import type { Separator } from "@/constants/loggers";

/** A function that returns a log message string */
export type MsgFn = () => any[];

export type LogStrFn = (msg: any, ...params: any[]) => void;
export type LogMsgFn = (msg: MsgFn) => void;

export type LoggerNS<
	NS extends string[],
	SEP extends string = Separator,
> = NS extends [infer First]
	? First extends string
		? First
		: never
	: NS extends [infer First, ...infer Rest]
		? First extends string
			? Rest extends string[]
				? `${First}${SEP}${LoggerNS<Rest, SEP>}`
				: never
			: never
		: NS extends never[]
			? ""
			: string;

export interface Logger<NS extends string[], SEP extends string = Separator> {
	readonly namespace: LoggerNS<NS, SEP>;

	readonly isDebug: boolean;
	debug: LogStrFn;
	debugFn: LogMsgFn;

	readonly isInfo: boolean;
	info: LogStrFn;
	infoFn: LogMsgFn;

	readonly isWarn: boolean;
	warn: LogStrFn;
	warnFn: LogMsgFn;

	readonly isError: boolean;
	error: LogStrFn;
	errorFn: LogMsgFn;

	extend: <NewNS extends string[]>(
		...namespaces: NewNS
	) => Logger<[...NS, ...NewNS], SEP>;
}
