export const FORMAT_MODES = {
	json: "JSON",
	text: "TXT",
} as const;

export type FormatModeId = keyof typeof FORMAT_MODES;
export type FormatModeName = (typeof FORMAT_MODES)[FormatModeId];
