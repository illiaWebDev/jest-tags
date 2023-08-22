export type JestTagsTreeNode = {
  tags: string[];
  /**
   * represents full array of tags, including \
   * those of successors
   */
  fullTags?: string[];
  children?: JestTagsTreeNode[]
};

const numberOnlyRegex = /^\d+$/;
/**
 * indx should be like '', '0', '0.1', '0.1.0', '0.2.1' \
 * it shows series of indices to access to retrieve \
 * corresponding value. \
 * **IMPORTANT**: '' means "end of search, return node":
 */
export function getJestTagsTreeNodeByIndx( node: JestTagsTreeNode, indx: string ): typeof node | null {
  if ( indx === '' ) return node;

  const stringNumsArr = indx.split( '.' ).filter( Boolean );
  if ( stringNumsArr.some( it => it.match( numberOnlyRegex ) === null ) ) return null;

  const [ first, ...rest ] = stringNumsArr;
  const numberedFirst = Number( first );

  const children = ( node.children || [] );
  const nextNode = children[ numberedFirst ];

  if ( nextNode === undefined ) return null;

  return getJestTagsTreeNodeByIndx( nextNode, rest.join( '.' ) );
}

export function aggregateJestTags( n: JestTagsTreeNode ): typeof n {
  if ( n.children === undefined || n.children.length === 0 ) return n;

  const nextChildren = n.children.map( child => aggregateJestTags( child ) );
  const aggregatedTags = [ ...new Set( n.tags.concat( ...nextChildren.map( it => it.fullTags || it.tags ) ) ) ];

  return {
    ...n,
    children: nextChildren,
    fullTags: aggregatedTags,
  };
}

/**
 * indx should be like '', '0', '0.1', '0.2.0', '0.3.5'
 */
export type GetJestTags = ( indx: string, short?: true ) => string[];

export const deriveGetJestTags = ( n: JestTagsTreeNode ): GetJestTags => {
  const aggregated = aggregateJestTags( n );

  return ( indx, full ) => {
    const maybeNode = getJestTagsTreeNodeByIndx( aggregated, indx );

    return maybeNode === null
      ? []
      : ( ( full && maybeNode.fullTags ) || maybeNode.tags );
  };
};
