// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import { initJestTags, defaultInitJestTagsRtrn } from './main';
import { jestTagsEnvVarName } from './deriveJestTags/core';


describe( initJestTags.name, () => {
  test( 'returns default describe and test if env has no tags for jest', () => {
    const res = initJestTags( {} );

    expect( res.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
    expect( res.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
  } );

  test( 'returns default describe and test if tags in env have incorrect shape', () => {
    const incorrectVals = [
      undefined,
      '',
    ];
    const results = incorrectVals.map( it => initJestTags( { [ jestTagsEnvVarName ]: it } ) );

    results.forEach( k => {
      expect( k.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
      expect( k.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
    } );
  } );

  test( 'returns new describe and test if there is at least one tag in env', () => {
    const k = initJestTags( { [ jestTagsEnvVarName ]: 'test1' } );

    expect( k.describeWithTags ).not.toBe( defaultInitJestTagsRtrn.describeWithTags );
    expect( k.testWithTags ).not.toBe( defaultInitJestTagsRtrn.testWithTags );
  } );

  test( 'returns new describe and test if tags for jest have correct shape', () => {
    const k = initJestTags( { [ jestTagsEnvVarName ]: 'someTag;another' } );

    expect( k.describeWithTags ).not.toBe( defaultInitJestTagsRtrn.describeWithTags );
    expect( k.testWithTags ).not.toBe( defaultInitJestTagsRtrn.testWithTags );
  } );
} );
