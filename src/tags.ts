// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';


export const jestTagsEnvVarName = 'JEST_TEST_TAGS';
export type JestTags = Record< string, 0 | 1 >;

type DescribeParams = Parameters< typeof describe >;
type DescribeReturnType = ReturnType< typeof describe >;

type TestParams = Parameters< typeof test >;
type TestReturnType = ReturnType< typeof test >;

export const matchesJestTags = ( envTags: JestTags, tags: string[] ): boolean => {
  const entries = Object.entries( envTags );

  const decision = entries.reduce< 'skip' | 'dontSkip' >(
    ( a, [ tagName, mode ] ) => {
      if ( a === 'skip' ) return 'skip';

      if ( mode === 0 ) {
        // if we have this tagName in tags -> skip
        return tags.some( it => it === tagName ) ? 'skip' : 'dontSkip';
      }

      // if we do not have this tagName in tags -> skip
      return tags.some( it => it === tagName ) ? 'dontSkip' : 'skip';
    },
    'dontSkip',
  );

  return decision === 'dontSkip';
};

// ===================================================================================

export type InitJestTagsRtrn = {
  describeWithTags: ( tags: string[], blockNameLike: DescribeParams[0], fn: DescribeParams[1] ) => DescribeReturnType;
  testWithTags: (
    ( tags: string[], blockNameLike: TestParams[0], fn: TestParams[1], timeout: TestParams[2] ) => TestReturnType
  );
};

export const defaultInitJestTagsRtrn: InitJestTagsRtrn = {
  describeWithTags: ( _, name, f ) => describe( name, f ),
  testWithTags: ( _, name, f, timeout ) => test( name, f, timeout ),
};

/**
 * NOTE that when working with env, we expect JEST_TEST_TAGS\
 * to be represented as `tag1:0;tag2:1;tag3:0`. Tried\
 * with stringified object, but then for it to be successfuly\
 * parsed it has to be passed in shell as \
 * `JEST_TEST_TAGS='{"tag1":0}'` and this is just dumb, I\
 * don't want to write so many noisy characters (ticks, and \
 * brackets, and whatever).\
 * So `tag1:0;tag2:1;tag3:0` seems pretty short and reasonable
 */
export const initJestTags = ( env: Record< string, string | undefined > ): InitJestTagsRtrn => {
  const { [ jestTagsEnvVarName ]: JEST_TEST_TAGS } = env;
  if ( JEST_TEST_TAGS === undefined ) return defaultInitJestTagsRtrn;

  const pairStrings = JEST_TEST_TAGS.split( ';' ).filter( Boolean );
  const acc: JestTags = {};
  const parsed = pairStrings.reduce(
    ( a, it ) => {
      const [ tag, mode ] = it.split( ':' );
      if ( tag === undefined || ( mode !== '0' && mode !== '1' ) ) return a;

      const nextAcc: typeof acc = { ...a, [ tag ]: mode === '1' ? 1 : 0 };

      return nextAcc;
    },
    acc,
  );
  if ( parsed === acc ) return defaultInitJestTagsRtrn;


  return {
    describeWithTags: ( tags, name, fn ) => (
      matchesJestTags( parsed, tags ) ? describe( name, fn ) : describe.skip( name, fn )
    ),
    testWithTags: ( tags, name, fn, t ) => (
      matchesJestTags( parsed, tags ) ? test( name, fn, t ) : test.skip( name, fn, t )
    ),
  };
};
