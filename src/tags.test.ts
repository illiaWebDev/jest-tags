// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import { matchesJestTags, initJestTags, jestTagsEnvVarName, defaultInitJestTagsRtrn } from './tags';


describe( 'Jest tags filtering', () => {
  describe( 'matchesTags', () => {
    test( 'returns true for empty env tags obj', () => {
      expect( matchesJestTags( {}, [] ) ).toBe( true );
      expect( matchesJestTags( {}, [ 'a' ] ) ).toBe( true );
    } );

    test( 'returns true if restricted tag is absent', () => {
      expect( matchesJestTags( { restricted: 0 }, [ 'allowed' ] ) ).toBe( true );
    } );

    test( 'returns false if restricted tag is present', () => {
      const name = 'restricted';
      expect( matchesJestTags( { [ name ]: 0 }, [ name ] ) ).toBe( false );
    } );

    test( 'returns false if required tag is absent', () => {
      expect( matchesJestTags( { required: 1 }, [ 'some' ] ) ).toBe( false );
    } );

    test( 'returns true if required tag is present', () => {
      const required = 'required';
      expect( matchesJestTags( { [ required ]: 1 }, [ required ] ) ).toBe( true );
    } );

    test( 'returns false if restricted tag is present, even though required one is also present', () => {
      const required = 'required';
      const restricted = 'restricted';
      expect( matchesJestTags( { [ required ]: 1, [ restricted ]: 0 }, [ required, restricted ] ) ).toBe( false );
    } );
  } );

  describe( 'init', () => {
    test( 'returns default describe and test if env has no tags for jest', () => {
      const res = initJestTags( {} );

      expect( res.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
      expect( res.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
    } );

    test( 'returns default describe and test if tags in env have incorrect shape', () => {
      const incorrectVals = [
        '{}',
        'asdasdasd',
        'test;2',
        'test:;test2:qw',
      ];
      const results = incorrectVals.map( it => initJestTags( { [ jestTagsEnvVarName ]: it } ) );

      results.forEach( k => {
        expect( k.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
        expect( k.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
      } );
    } );

    test( 'returns default describe and test if tags for jest in env are empty', () => {
      const k = initJestTags( { [ jestTagsEnvVarName ]: '' } );

      expect( k.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
      expect( k.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
    } );

    test( 'returns default describe and test if tags in env have no valid pairs', () => {
      const k = initJestTags( { [ jestTagsEnvVarName ]: 'test:true;test2:5' } );

      expect( k.describeWithTags ).toBe( defaultInitJestTagsRtrn.describeWithTags );
      expect( k.testWithTags ).toBe( defaultInitJestTagsRtrn.testWithTags );
    } );

    test( 'returns new describe and test if tags for jest have correct shape', () => {
      const k = initJestTags( { [ jestTagsEnvVarName ]: 'someTag:0;another:1' } );

      expect( k.describeWithTags ).not.toBe( defaultInitJestTagsRtrn.describeWithTags );
      expect( k.testWithTags ).not.toBe( defaultInitJestTagsRtrn.testWithTags );
    } );
  } );
} );
