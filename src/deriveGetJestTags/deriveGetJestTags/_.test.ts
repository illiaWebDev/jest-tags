import { describe, test, expect } from '@jest/globals';
import { deriveGetJestTags } from './main';
import type { JestTagsTreeNode } from '../types';


const smallTree: JestTagsTreeNode = {
  tags: [ '0' ],
  children: [
    { tags: [ '00' ] },
    { tags: [ '01' ] },
    { tags: [ '02' ] },
  ],
};
const mediumTree: JestTagsTreeNode = {
  tags: [ '0' ],
  children: [
    { tags: [ '00' ] },
    {
      tags: [ '01' ],
      children: [
        { tags: [ '010' ] },
        {
          tags: [ '011' ],
          children: [ { tags: [ '0110' ] } ],
        },
        { tags: [ '012' ] },
      ],
    },
    { tags: [ '02' ] },
  ],
};

describe( 'deriveGetJestTags', () => {
  describe( 'incorrect index string', () => {
    test( 'returns empty array', () => {
      const rootTags: JestTagsTreeNode[ 'tags' ] = [ 'a' ];
      const tree: JestTagsTreeNode = { tags: rootTags };
      const getJestTags = deriveGetJestTags( tree );
      const incorrectIndexStrings = [
        'a',
        '.1',
        ' 1',
        ' 1.2',
        ' 0',
        'asdasdsd',
        '-___',
      ];
      incorrectIndexStrings.forEach( str => {
        const results = getJestTags( str );
        const resultShort = getJestTags( str, true );

        expect( results ).toEqual( [] );
        expect( resultShort ).toEqual( [] );
      } );
    } );
  } );

  describe( 'correct, but non-exisitng index string', () => {
    test( 'returns fallback value (small tree)', () => {
      const getJestTags = deriveGetJestTags( smallTree );

      const nonExistingIndexStrings = [
        '1',
        '2',
        '0.4',
        '0.2.1',
        '0.0.0',
      ];
      nonExistingIndexStrings.forEach( str => {
        const results = getJestTags( str );
        const resultShort = getJestTags( str, true );

        expect( results ).toEqual( [] );
        expect( resultShort ).toEqual( [] );
      } );
    } );

    test( 'returns fallback value (medium tree)', () => {
      const getJestTags = deriveGetJestTags( mediumTree );

      const nonExistingIndexStrings = [
        '1',
        '2',
        '0.4',
        '0.1.1.1',
        '0.2.1',
        '0.0.0',
      ];
      nonExistingIndexStrings.forEach( str => {
        const results = getJestTags( str );
        const resultShort = getJestTags( str, true );

        expect( results ).toEqual( [] );
        expect( resultShort ).toEqual( [] );
      } );
    } );
  } );

  describe( 'correct, existing index string', () => {
    test( 'returns correctly (medium tree)', () => {
      const getJestTags = deriveGetJestTags( mediumTree );

      {
        const path = [ 0, 1, 1, 0 ] as const;
        const indx = path.join( '.' );
        const results = getJestTags( indx );
        const resultShort = getJestTags( indx, true );

        const node01 = ( mediumTree.children || [] )[ path[ 1 ] ];
        const node011 = ( ( node01 && node01.children ) || [] )[ path[ 2 ] ];
        const node0110 = ( ( node011 && node011.children ) || [] )[ path[ 3 ] ];

        expect( resultShort ).toBe( node0110 && node0110.tags );
        expect( results ).toEqual( node0110 && node0110.tags );
      }

      {
        const path = [ 0, 1 ] as const;
        const indx = path.join( '.' );
        const results = getJestTags( indx );
        const resultShort = getJestTags( indx, true );

        const node01 = ( mediumTree.children || [] )[ path[ 1 ] ];

        expect( resultShort ).toBe( node01 && node01.tags );
        expect( results.slice().sort() ).toEqual(
          [
            '01',
            '010',
            '011',
            '0110',
            '012',
          ].sort(),
        );
      }
    } );
  } );
} );
