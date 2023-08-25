import type { JestTagsTreeNode, JestTagsTreeNodeFull } from '../types';


export function aggregateJestTags( n: JestTagsTreeNode ): JestTagsTreeNodeFull {
  if ( n.children === undefined || n.children.length === 0 ) {
    const fullNode: JestTagsTreeNodeFull = {
      tags: n.tags,
      fullTags: n.tags,
    };

    return fullNode;
  }

  const nextChildren = n.children.map( child => aggregateJestTags( child ) );
  const aggregatedTags = [ ...new Set( n.tags.concat( ...nextChildren.map( it => it.fullTags || it.tags ) ) ) ];

  return {
    ...n,
    children: nextChildren,
    fullTags: aggregatedTags,
  };
}
