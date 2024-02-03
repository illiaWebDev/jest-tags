// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import { matchesJestTags } from './core';


describe( 'matchesJestTags', () => {
  type Payload = {
    args: Parameters< typeof matchesJestTags >;
    res: ReturnType< typeof matchesJestTags >
  };
  const payloads: Payload[] = [
    { args: [ {}, [] ], res: true },
    { args: [ {}, [ 'tag1' ] ], res: true },
    { args: [ {}, [ 'tag1', 'tag2' ] ], res: true },
    { args: [ { tag1: true }, [ 'tag1' ] ], res: true },
    { args: [ { tag1: true }, [ 'tag2' ] ], res: false },
    { args: [ { tag1: true, tag2: true }, [ 'tag1' ] ], res: false },
  ];

  payloads.forEach( ( { args, res } ) => (
    test( `(${ JSON.stringify( args ) }) => ${ JSON.stringify( res ) }`, () => (
      expect( matchesJestTags( ...args ) ).toStrictEqual( res )
    ) )
  ) );
} );
