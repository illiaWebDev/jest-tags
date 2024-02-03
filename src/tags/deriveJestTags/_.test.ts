// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import { deriveJestTags, defaultJestTags } from './core';


describe( 'deriveJestTags', () => {
  type Payload = { arg: Parameters< typeof deriveJestTags >[ 0 ]; res: ReturnType< typeof deriveJestTags > };
  const payloads: Payload[] = [
    { arg: {}, res: defaultJestTags },
    { arg: 1, res: defaultJestTags },
    { arg: null, res: defaultJestTags },
    { arg: false, res: defaultJestTags },
    { arg: true, res: defaultJestTags },
    { arg: [], res: defaultJestTags },
    { arg: Date, res: defaultJestTags },
    { arg: '', res: defaultJestTags },
    { arg: 'tag1', res: { tag1: true } },
    { arg: 'tag1;tag2', res: { tag1: true, tag2: true } },
  ];

  payloads.forEach( ( { arg, res } ) => (
    test( `(${ JSON.stringify( arg ) }) => ${ JSON.stringify( res ) }`, () => (
      expect( deriveJestTags( arg ) ).toStrictEqual( res )
    ) )
  ) );
} );
