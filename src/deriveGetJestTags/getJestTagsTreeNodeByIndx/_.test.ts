import { describe, test, expect } from '@jest/globals';
import { getJestTagsTreeNodeByIndx } from './main';
import type { JestTagsTreeNodeFull } from '../types';


describe( 'getJestTagsTreeNodeByIndx', () => {
  describe( 'empty string index', () => {
    test( 'returns argument node if indx is an empty string', () => {
      const node: JestTagsTreeNodeFull = { tags: [], fullTags: [] };

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

      const tree: JestTagsTreeNodeFull = {
        tags: [],
        fullTags: [],
        children: [
          { tags: [], fullTags: [] },
          { tags: [], fullTags: [] },
          {
            tags: [],
            fullTags: [],
            children: [
              { tags: [], fullTags: [] },
            ],
          },
        ],
      };

      incorrectIndxStrings.forEach( str => (
        expect( getJestTagsTreeNodeByIndx( tree, str ) ).toBe( null )
      ) );
    } );

    test( 'returns null if unable to find indx (small tree)', () => {
      expect( getJestTagsTreeNodeByIndx( { tags: [], fullTags: [] }, '0.1' ) ).toBe( null );
    } );

    test( 'returns null if unable to find indx (medium tree)', () => {
      expect(
        getJestTagsTreeNodeByIndx(
          {
            tags: [],
            fullTags: [],
            children: [
              {
                tags: [],
                fullTags: [],
                children: [
                  { tags: [], fullTags: [] },
                ],
              },
              { tags: [], fullTags: [] },
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
            fullTags: [],
            children: [
              {
                tags: [],
                fullTags: [],
                children: [
                  { tags: [], fullTags: [] },
                  {
                    tags: [],
                    fullTags: [],
                    children: [
                      { tags: [], fullTags: [] },
                    ],
                  },
                  { tags: [], fullTags: [] },
                  { tags: [], fullTags: [], children: [ { tags: [], fullTags: [] } ] },
                  { tags: [], fullTags: [] },
                ],
              },
              { tags: [], fullTags: [] },
            ],
          },
          '0.3.1.5.2',
        ),
      ).toBe( null );
    } );
  } );

  describe( 'correct return value', () => {
    test( 'correctly returns (small tree)', () => {
      const tree: JestTagsTreeNodeFull = {
        tags: [],
        fullTags: [],
        children: [
          { tags: [], fullTags: [] },
        ],
      };

      expect( getJestTagsTreeNodeByIndx( tree, '0' ) ).toBe( ( tree.children || [] )[ 0 ] );
    } );

    test( 'correctly returns (medium tree)', () => {
      const tree: JestTagsTreeNodeFull = {
        tags: [],
        fullTags: [],
        children: [
          { tags: [], fullTags: [] },
          {
            tags: [],
            fullTags: [],
            children: [
              { tags: [], fullTags: [] },
            ],
          },
          { tags: [], fullTags: [] },
        ],
      };

      const node1 = ( tree.children || [] )[ 1 ];
      const node2 = ( node1 === undefined || node1.children === undefined ? [] : node1.children )[ 0 ];
      expect( getJestTagsTreeNodeByIndx( tree, '1.0' ) ).toBe( node2 );
    } );

    test( 'correctly returns (big tree)', () => {
      const tree: JestTagsTreeNodeFull = {
        tags: [],
        fullTags: [],
        children: [
          { tags: [], fullTags: [] },
          {
            tags: [],
            fullTags: [],
            children: [
              { tags: [], fullTags: [] },
              { tags: [], fullTags: [] },
              {
                tags: [],
                fullTags: [],
                children: [
                  {
                    tags: [],
                    fullTags: [],
                    children: [
                      { tags: [], fullTags: [] },
                      { tags: [], fullTags: [] },
                      { tags: [], fullTags: [] },
                    ],
                  },
                ],
              },
            ],
          },
          { tags: [], fullTags: [] },
        ],
      };

      const indices = [ 1, 2, 0, 2 ] as const;
      const node1 = ( tree.children || [] )[ indices[ 0 ] ];
      const node2 = ( node1 === undefined || node1.children === undefined ? [] : node1.children )[ indices[ 1 ] ];
      const node3 = ( node2 === undefined || node2.children === undefined ? [] : node2.children )[ indices[ 2 ] ];
      const node4 = ( node3 === undefined || node3.children === undefined ? [] : node3.children )[ indices[ 3 ] ];

      expect( getJestTagsTreeNodeByIndx( tree, indices.join( '.' ) ) ).toBe( node4 );
    } );
  } );
} );
