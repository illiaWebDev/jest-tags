import type { JestTagsTreeNode } from '../types';


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
