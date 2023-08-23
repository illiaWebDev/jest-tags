// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import { getJestTagsTreeNodeByIndx } from './main';
import type { JestTagsTreeNode } from '../types';


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
        const incorrectIndxStrings = [
          ' ',
          '      ',
          'a',
          '1.2w',
          'atwq',
          'test',
          '6_0_t',
          '.1.2',
          ' 0',
          ' 2.0',
        ];

        const tree: JestTagsTreeNode = {
          tags: [],
          children: [
            { tags: [] },
            { tags: [] },
            {
              tags: [],
              children: [
                { tags: [] },
              ],
            },
          ],
        };

        incorrectIndxStrings.forEach( str => (
          expect( getJestTagsTreeNodeByIndx( tree, str ) ).toBe( null )
        ) );
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
                      children: [
                        { tags: [] },
                      ],
                    },
                    { tags: [] },
                    { tags: [], children: [ { tags: [] } ] },
                    { tags: [] },
                  ],
                },
                { tags: [] },
              ],
            },
            '0.3.1.5.2',
          ),
        ).toBe( null );
      } );
    } );
  } );
} );
