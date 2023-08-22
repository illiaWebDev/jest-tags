// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import {
  // aggregateJestTags,
  // deriveGetJestTags,
  getJestTagsTreeNodeByIndx,
  JestTagsTreeNode,
} from './deriveGetJestTags';


describe( 'deriveGetJestTags:all', () => {
  describe( 'getJestTagsTreeNodeByIndx', () => {
    describe( 'empty string index', () => {
      test( 'returns argument node if indx is empty string', () => {
        const node: JestTagsTreeNode = { tags: [] };

        expect( getJestTagsTreeNodeByIndx( node, '' ) ).toBe( node );
      } );
    } );

    describe( 'null return value', () => {
      test( 'returns null if indx string has incorrect format', () => {
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, 'a' ) ).toBe( null );
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, '1.2w' ) ).toBe( null );
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, 'atwq' ) ).toBe( null );
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, 'test' ) ).toBe( null );
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, '6_0_t' ) ).toBe( null );
      } );

      test( 'returns null if unable to find indx (small tree)', () => {
        expect( getJestTagsTreeNodeByIndx( { tags: [] }, '0.1' ) ).toBe( null );
      } );

      test( 'returns null if unable to find indx (medium tree)', () => {
        expect(
          getJestTagsTreeNodeByIndx(
            {
              tags: [],
              children: [
                {
                  tags: [],
                  children: [
                    { tags: [] },
                  ],
                },
                { tags: [] },
              ],
            },
            '0.1',
          ),
        ).toBe( null );
      } );

      test( 'returns null if unable to find indx (big tree)', () => {
        expect(
          getJestTagsTreeNodeByIndx(
            {
              tags: [],
              children: [
                {
                  tags: [],
                  children: [
                    { tags: [] },
                    {
                      tags: [],
                      children: [],
                    },
                    { tags: [] },
                  ],
                },
                { tags: [] },
              ],
            },
            '0.1',
          ),
        ).toBe( null );
      } );
    } );

    // describe( 'returns null if node cannot be located', () => {
    //   test( 'small', () => {
    //     const result = getJestTagsTreeNodeByIndx( { tags: [] }, '' );
    //   } );
    // } );
    // test( 'getJestTagsTreeNodeByIndx 1', () => {

    // } );
  } );
} );


// {
//   tags: ['1'],
//   children: [
//     {tags: ['1.1']},
//     {tags: ['1.2']},
//   ],
// }
