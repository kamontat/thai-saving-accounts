export interface ObjectKind<Kind extends string> {
	kind: Kind;
}
/** Get the kind of an object */
export type GetObjectKind<Obj> =
	Obj extends ObjectKind<infer Kind> ? Kind : never;

/** Get the value of an object without the kind property */
export type GetObjectValue<Obj> =
	Obj extends ObjectKind<string> ? Omit<Obj, "kind"> : never;
