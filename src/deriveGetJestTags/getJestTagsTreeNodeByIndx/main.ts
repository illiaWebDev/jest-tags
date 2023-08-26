import type { JestTagsTreeNodeFull } from '../types';


const numberOnlyRegex = /^(0|[1-9]\d*)$/;
/**
 * indx should be like '0', '0.1', '0.1.0', '0.2.1' \
 * it shows series of indices to access to retrieve \
 * corresponding value. \
 * **IMPORTANT**: indx of '0' means "end of search, return node":
 */
export function getJestTagsTreeNodeByIndx( node: JestTagsTreeNodeFull, indx: string ): typeof node | null {
  if ( indx === '0' ) return node;

  const stringNumsArr = indx.split( '.' );
  if ( stringNumsArr.some( it => it.match( numberOnlyRegex ) === null ) ) return null;

  const [ first, second, ...rest ] = stringNumsArr;
  if ( first !== '0' || second === undefined ) return null;

  const nextChild = ( node.children || [] )[ Number( second ) ];
  if ( nextChild === undefined ) return null;

  return getJestTagsTreeNodeByIndx( nextChild, [ '0' ].concat( rest ).join( '.' ) );
}
