import { debug } from "debug";

export const appLogger = debug("sav");

export const calculatorsLogger = appLogger.extend("calculators");
export const productsLogger = appLogger.extend("products");
export const utilsLogger = appLogger.extend("utils");
