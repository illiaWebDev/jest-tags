import { describe, test, expect } from '@jest/globals';
import { deriveGetJestTags } from './main';
import type { JestTagsTreeNode } from '../types';


const tag0 = '0';
const tag00 = '0.0';
const tag01 = '0.1';
const tag010 = '0.1.0';
const tag011 = '0.1.1';
const tag0110 = '0.1.1.0';
const tag012 = '0.1.2';
const tag02 = '0.2';

const tree: JestTagsTreeNode = {
  tags: [ tag0 ],
  children: [
    { tags: [ tag00 ] },
    {
      tags: [ tag01 ],
      children: [
        { tags: [ tag010 ] },
        {
          tags: [ tag011 ],
          children: [ { tags: [ tag0110 ] } ],
        },
        { tags: [ tag012 ] },
      ],
    },
    { tags: [ tag02 ] },
  ],
};
const getJestTags = deriveGetJestTags( tree );


describe( 'deriveGetJestTags', () => {
  describe( 'incorrect index string', () => {
    test( 'returns empty array', () => {
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
    test( 'returns fallback value', () => {
      const nonExistingIndexStrings = [
        '1',
        '2',
        '0.4',
        '0.2.1',
        '0.0.0',
        '0.1.1.1',
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
    test( 'returns correctly ', () => {
      {
        const indx = tag0110;
        const path = indx.split( '.' );

        const node01 = ( tree.children || [] )[ Number( path[ 1 ] ) || 0 ];
        const node011 = ( ( node01 && node01.children ) || [] )[ Number( path[ 2 ] ) || 0 ];
        const node0110 = ( ( node011 && node011.children ) || [] )[ Number( path[ 3 ] ) || 0 ];

        expect( getJestTags( indx, true ) ).toBe( node0110 && node0110.tags );
        expect( getJestTags( indx ).slice().sort() ).toEqual(
          [
            tag0,
            tag01,
            tag011,
            tag0110,
          ].slice().sort(),
        );
      }

      {
        const indx = tag01;
        const path = indx.split( '.' );

        const node01 = ( tree.children || [] )[ Number( path[ 1 ] ) || 0 ];

        expect( getJestTags( indx, true ) ).toBe( node01 && node01.tags );
        expect( getJestTags( indx ).slice().sort() ).toEqual(
          [
            tag0,
            tag01,
            tag010,
            tag011,
            tag0110,
            tag012,
          ].sort(),
        );
      }
    } );
  } );
} );
