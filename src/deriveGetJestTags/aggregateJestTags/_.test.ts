import { test, describe, expect } from '@jest/globals';
import { aggregateJestTags } from './main';
import type { JestTagsTreeNode } from '../types';
import { getJestTagsTreeNodeByIndx } from '../getJestTagsTreeNodeByIndx/main';


describe( 'aggregateJestTags', () => {
  test( 'works for small tree', () => {
    const tag0 = '0';
    const tag00 = '0.0';
    const tag01 = '0.1';
    const tag02 = '0.2';


    // const treeChild0: JestTagsTreeNode = { tags: [ tag00 ] };
    // const treeChild1: JestTagsTreeNode = { tags: [ tag01 ] };
    // const treeChild2: JestTagsTreeNode = { tags: [ tag02 ] };
    const tree: JestTagsTreeNode = {
      tags: [ tag0 ],
      children: [
        { tags: [ tag00 ] },
        { tags: [ tag01 ] },
        { tags: [ tag02 ] },
      ],
    };

    const aggregated = aggregateJestTags( tree );

    // ===================================================================================

    {
      const { tags, fullTags } = aggregated;
      expect( tags ).toBe( tree.tags );
      expect( fullTags.slice().sort() ).toEqual( [ tag0, tag00, tag01, tag02 ].sort() );
    }


    // ===================================================================================

    {
      const child = ( aggregated.children || [] )[ 0 ];
      expect( child ).not.toBeUndefined();
      const typed = child as NonNullable< typeof child >;

      expect( typed.tags ).toStrictEqual( [ tag00 ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual( [ tag0, tag00 ].slice().sort() );
    }

    // ===================================================================================

    {
      const child = ( aggregated.children || [] )[ 1 ];
      expect( child ).not.toBeUndefined();
      const typed = child as NonNullable< typeof child >;

      expect( typed.tags ).toStrictEqual( [ tag01 ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual( [ tag0, tag01 ].slice().sort() );
    }

    // ===================================================================================

    {
      const child = ( aggregated.children || [] )[ 2 ];
      expect( child ).not.toBeUndefined();
      const typed = child as NonNullable< typeof child >;

      expect( typed.tags ).toStrictEqual( [ tag02 ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual( [ tag0, tag02 ].slice().sort() );
    }
  } );

  test( 'works for big tree', () => {
    const tag0 = '0';
    const tag00 = '0.0';
    const tag000 = '0.0.0';
    const tag001 = '0.0.1';
    const tag002 = '0.0.2';
    const tag0020 = '0.0.2.0';

    const tag01 = '0.1';

    const tag02 = '0.2';
    const tag020 = '0.2.0';
    const tag0200 = '0.2.0.0';
    const tag02000 = '0.2.0.0.0';
    const tag0201 = '0.2.0.1';
    const tag021 = '0.2.1';
    const tag022 = '0.2.2';


    const tree: JestTagsTreeNode = {
      tags: [ tag0 ],
      children: [
        {
          tags: [ tag00 ],
          children: [
            { tags: [ tag000 ] },
            { tags: [ tag001 ] },
            {
              tags: [ tag002 ],
              children: [ { tags: [ tag0020 ] } ],
            },
          ],
        },
        {
          tags: [ tag01 ],
        },
        {
          tags: [ tag02 ],
          children: [
            {
              tags: [ tag020 ],
              children: [
                {
                  tags: [ tag0200 ],
                  children: [
                    { tags: [ tag02000 ] },
                  ],
                },
                { tags: [ tag0201 ] },
              ],
            },
            { tags: [ tag021 ] },
            { tags: [ tag022 ] },
          ],
        },
      ],
    };

    const aggregated = aggregateJestTags( tree );

    {
      const path = tag0;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          path,
          tag00,
          tag000,
          tag001,
          tag002,
          tag0020,
          tag01,
          tag02,
          tag020,
          tag0200,
          tag02000,
          tag0201,
          tag021,
          tag022,
        ].slice().sort(),
      );
    }

    {
      const path = tag00;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          path,
          tag000,
          tag001,
          tag002,
          tag0020,
        ].slice().sort(),
      );
    }

    {
      const path = tag000;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag00,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag001;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag00,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag002;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag00,
          path,
          tag0020,
        ].slice().sort(),
      );
    }

    {
      const path = tag0020;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag00,
          tag002,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag01;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;
      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag02;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          path,
          tag020,
          tag0200,
          tag02000,
          tag0201,
          tag021,
          tag022,
        ].slice().sort(),
      );
    }

    {
      const path = tag020;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          path,
          tag0200,
          tag02000,
          tag0201,
        ].slice().sort(),
      );
    }

    {
      const path = tag0200;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          tag020,
          path,
          tag02000,
        ].slice().sort(),
      );
    }

    {
      const path = tag02000;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          tag020,
          tag0200,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag0201;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          tag020,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag021;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          path,
        ].slice().sort(),
      );
    }

    {
      const path = tag022;
      const node = getJestTagsTreeNodeByIndx( aggregated, path );
      expect( node ).toBeTruthy();

      const typed = node as NonNullable< typeof node >;

      expect( typed.tags.slice().sort() ).toEqual( [ path ] );
      expect( typed.fullTags.slice().sort() ).toStrictEqual(
        [
          tag0,
          tag02,
          path,
        ].slice().sort(),
      );
    }
  } );
} );
