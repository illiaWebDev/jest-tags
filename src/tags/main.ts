// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test } from '@jest/globals';
import { deriveJestTags, jestTagsEnvVarName, defaultJestTags } from './deriveJestTags';
import { matchesJestTags } from './matchesJestTags';


type DescribeParams = Parameters< typeof describe >;
type DescribeReturnType = ReturnType< typeof describe >;

type TestParams = Parameters< typeof test >;
type TestReturnType = ReturnType< typeof test >;


const noop = () => { /** */ };
const noopBlockFn = () => {
  test.skip( 'jest-test-tags: RbKiVxt2Vq - skip', noop );
};
// ===================================================================================

export type InitJestTagsRtrn = {
  describeWithTags: ( tags: string[], blockNameLike: DescribeParams[0], fn: DescribeParams[1] ) => DescribeReturnType;
  testWithTags: (
    ( tags: string[], blockNameLike: TestParams[0], fn: TestParams[1], timeout?: TestParams[2] ) => TestReturnType
  );
};

export const defaultInitJestTagsRtrn: InitJestTagsRtrn = {
  describeWithTags: ( _, name, f ) => describe( name, f ),
  testWithTags: ( _, name, f, timeout ) => test( name, f, timeout ),
};


export const initJestTags = ( env: Record< string, string | undefined > ): InitJestTagsRtrn => {
  const { [ jestTagsEnvVarName ]: JEST_TEST_TAGS } = env;

  const parsed = deriveJestTags( JEST_TEST_TAGS );
  if ( parsed === defaultJestTags ) return defaultInitJestTagsRtrn;


  return {
    describeWithTags: ( tags, name, fn ) => (
      matchesJestTags( parsed, tags )
        ? describe( name, fn )
        /**
         * it feels that even though we are explicitly skipping,\
         * there is some processing happening of the contents of\
         * BlockFn (second argument of describe). So instead let's\
         * try and pass empty function that does nothing (noop) \
         * and see how that works out. Currently, for some really \
         * db intensive tests, running only test suite might take \
         * 10 seconds, but then skipping reset can take 30+ seconds,\
         * which is really weird.\
         * **IMPORTANT**
         * we can't just use noop fuunc as the jest complains that\
         * describe block requires at least one test. Instead we will\
         * use noopBlockFn, that contains one test, marked with \
         * .skip, and TestFn in that test is noop.
         */
        : describe.skip( name, noopBlockFn )
    ),
    testWithTags: ( tags, name, fn, t ) => (
      matchesJestTags( parsed, tags ) ? test( name, fn, t ) : test.skip( name, fn, t )
    ),
  };
};
