/**
 * env var that should have value like "file1;file2;file3;"\
 * meaning that we want to filter all files that don't match\
 * any of these names, separated by ";"
 */
export const JEST_FNAME_FILTER_TAGS = 'JEST_FNAME_FILTER_TAGS';
export type JestFNameFilterTags = Record< string, true >;
export const defaultJestFNameFilterTags: JestFNameFilterTags = {};
