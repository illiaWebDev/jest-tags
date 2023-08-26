import type { JestTagsTreeNode } from '../types';
import { aggregateJestTags } from '../aggregateJestTags/main';
import { getJestTagsTreeNodeByIndx } from '../getJestTagsTreeNodeByIndx/main';

/**
 * indx should be like '', '0', '0.1', '0.2.0', '0.3.5'\
 * will return root node for empty string
 */
export type GetJestTags = ( indx: string, short?: true ) => string[];

export const deriveGetJestTags = ( n: JestTagsTreeNode ): GetJestTags => {
  const aggregated = aggregateJestTags( n );

  return ( indx, short ) => {
    const maybeNode = getJestTagsTreeNodeByIndx( aggregated, indx );

    return maybeNode === null
      ? []
      : ( ( short && maybeNode.tags ) || maybeNode.fullTags );
  };
};
