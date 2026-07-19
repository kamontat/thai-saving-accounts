import { type Separator, separator } from "@/constants/loggers";
import type { LoggerNS } from "@/types";

const newNamespace = <NS extends string[], SEP extends string = Separator>(
	namespaces: NS,
	sep: SEP = separator as SEP,
): LoggerNS<NS, SEP> => {
	return namespaces.join(sep) as LoggerNS<NS, SEP>;
};
export default newNamespace;
