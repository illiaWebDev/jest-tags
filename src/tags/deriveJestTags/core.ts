/**
 * expected shape for this var is like this:\
 * `tag1;tag2;tag3`, which means "show me only\
 * those tests that have tags containing tag1 \
 * AND tag2 AND tag3"
 */
export const jestTagsEnvVarName = 'JEST_TEST_TAGS';
export type JestTags = Record< string, true >;
export const defaultJestTags: JestTags = {};

export const deriveJestTags = ( v?: unknown ): JestTags => {
  if ( typeof v !== 'string' ) return defaultJestTags;

  return v.split( ';' ).filter( Boolean ).reduce(
    ( a, tag ) => ( { ...a, [ tag ]: true } ),
    defaultJestTags,
  );
};
