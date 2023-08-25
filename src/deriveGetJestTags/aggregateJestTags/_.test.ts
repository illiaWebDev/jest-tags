import { test, describe, expect } from '@jest/globals';
import { aggregateJestTags } from './main';
import type { JestTagsTreeNode } from '../types';


describe( 'aggregateJestTags', () => {
  test( 'works for small tree', () => {
    const tag0 = '0';
    const tag00 = '0.0';
    const tag01 = '0.1';
    const tag02 = '0.2';


    const treeChild0: JestTagsTreeNode = { tags: [ tag00 ] };
    const treeChild1: JestTagsTreeNode = { tags: [ tag01 ] };
    const treeChild2: JestTagsTreeNode = { tags: [ tag02 ] };
    const tree: JestTagsTreeNode = {
      tags: [ tag0 ],
      children: [
        treeChild0,
        treeChild1,
        treeChild2,
      ],
    };

    const aggregated = aggregateJestTags( tree );

    // ===================================================================================

    const { tags: rootTags, fullTags: fullRootTags } = aggregated;
    expect( rootTags ).toBe( tree.tags );
    expect( fullRootTags.slice().sort() ).toEqual( [ tag0, tag00, tag01, tag02 ].sort() );


    // ===================================================================================

    const aggregatedChild0 = ( aggregated.children || [] )[ 0 ];
    expect( aggregatedChild0 ).not.toBeUndefined();
    const typedAggregatedChild0 = aggregatedChild0 as NonNullable< typeof aggregatedChild0 >;

    expect( typedAggregatedChild0.fullTags ).toBe( treeChild0.tags );
    expect( typedAggregatedChild0.tags ).toBe( treeChild0.tags );

    // ===================================================================================

    const aggregatedChild1 = ( aggregated.children || [] )[ 1 ];
    expect( aggregatedChild1 ).not.toBeUndefined();
    const typedAggregatedChild1 = aggregatedChild1 as NonNullable< typeof aggregatedChild1 >;

    expect( typedAggregatedChild1.fullTags ).toBe( treeChild1.tags );
    expect( typedAggregatedChild1.tags ).toBe( treeChild1.tags );

    // ===================================================================================

    const aggregatedChild2 = ( aggregated.children || [] )[ 2 ];
    expect( aggregatedChild2 ).not.toBeUndefined();
    const typedAggregatedChild2 = aggregatedChild2 as NonNullable< typeof aggregatedChild2 >;

    expect( typedAggregatedChild2.fullTags ).toBe( treeChild2.tags );
    expect( typedAggregatedChild2.tags ).toBe( treeChild2.tags );
  } );

  test( 'works for medium tree', () => {
    const tag0 = '0';
    const tag00 = '0.0';
    const tag000 = '0.0.0';
    const tag001 = '0.0.1';
    const tag002 = '0.0.2';
    const tag01 = '0.1';
    const tag02 = '0.2';
    const tag020 = '0.2.0';
    const tag021 = '0.2.1';
    const tag022 = '0.2.2';


    const treeChild000: JestTagsTreeNode = { tags: [ tag000 ] };
    const treeChild001: JestTagsTreeNode = { tags: [ tag001 ] };
    const treeChild002: JestTagsTreeNode = { tags: [ tag002 ] };
    const treeChild00: JestTagsTreeNode = {
      tags: [ tag00 ],
      children: [
        treeChild000,
        treeChild001,
        treeChild002,
      ],
    };

    const treeChild01: JestTagsTreeNode = { tags: [ tag01 ] };


    const treeChild020: JestTagsTreeNode = { tags: [ tag020 ] };
    const treeChild021: JestTagsTreeNode = { tags: [ tag021 ] };
    const treeChild022: JestTagsTreeNode = { tags: [ tag022 ] };
    const treeChild02: JestTagsTreeNode = {
      tags: [ tag02 ],
      children: [
        treeChild020,
        treeChild021,
        treeChild022,
      ],
    };

    const tree: JestTagsTreeNode = {
      tags: [ tag0 ],
      children: [
        treeChild00,
        treeChild01,
        treeChild02,
      ],
    };

    const aggregated = aggregateJestTags( tree );

    const { tags: rootTags, fullTags: fullRootTags } = aggregated;
    expect( rootTags ).toBe( tree.tags );
    expect( fullRootTags.slice().sort() ).toEqual(
      [
        tag0,
        tag00,
        tag000,
        tag001,
        tag002,
        tag01,
        tag02,
        tag020,
        tag021,
        tag022,
      ].sort(),
    );

    // ===================================================================================

    const aggregatedChild00 = ( aggregated.children || [] )[ 0 ];
    expect( aggregatedChild00 ).not.toBeUndefined();
    const typedAggregatedChild00 = aggregatedChild00 as NonNullable< typeof aggregatedChild00 >;

    expect( typedAggregatedChild00.fullTags ).toEqual( [ tag00, tag000, tag001, tag002 ].sort() );
    expect( typedAggregatedChild00.tags ).toBe( treeChild00.tags );

    // ===================================================================================

    const aggregatedChild01 = ( aggregated.children || [] )[ 1 ];
    expect( aggregatedChild01 ).not.toBeUndefined();
    const typedAggregatedChild01 = aggregatedChild01 as NonNullable< typeof aggregatedChild01 >;

    expect( typedAggregatedChild01.fullTags ).toEqual( [ tag01 ].sort() );
    expect( typedAggregatedChild01.tags ).toBe( treeChild01.tags );

    // ===================================================================================

    const aggregatedChild02 = ( aggregated.children || [] )[ 2 ];
    expect( aggregatedChild02 ).not.toBeUndefined();
    const typedAggregatedChild02 = aggregatedChild02 as NonNullable< typeof aggregatedChild02 >;

    expect( typedAggregatedChild02.fullTags ).toEqual( [ tag02, tag020, tag021, tag022 ].sort() );
    expect( typedAggregatedChild02.tags ).toBe( treeChild02.tags );
  } );
} );
