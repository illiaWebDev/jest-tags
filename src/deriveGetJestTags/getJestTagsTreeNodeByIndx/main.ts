import type { JestTagsTreeNodeFull } from '../types';


const numberOnlyRegex = /^\d+$/;
/**
 * indx should be like '', '0', '0.1', '0.1.0', '0.2.1' \
 * it shows series of indices to access to retrieve \
 * corresponding value. \
 * **IMPORTANT**: '' means "end of search, return node":
 */
export function getJestTagsTreeNodeByIndx( node: JestTagsTreeNodeFull, indx: string ): typeof node | null {
  if ( indx === '' ) return node;

  const stringNumsArr = indx.split( '.' );
  if ( stringNumsArr.some( it => it.match( numberOnlyRegex ) === null ) ) return null;

  const [ first, ...rest ] = stringNumsArr;
  const numberedFirst = Number( first );

  const children = ( node.children || [] );
  const nextNode = children[ numberedFirst ];

  if ( nextNode === undefined ) return null;

  return getJestTagsTreeNodeByIndx( nextNode, rest.join( '.' ) );
}
