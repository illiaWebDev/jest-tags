import type { JestTagsTreeNode, JestTagsTreeNodeFull } from '../types';

/**
 * main task for aggregate is to create tree in such a way,\
 * that all parent nodes should contain all tags from their \
 * children (so that when we filter by deeple nested tag, \
 * parent does not get filtered out). \
 * But also we want children to contain all tags of their \
 * parents, so that we don't need to duplicate tags manually \
 * in order to reach child. We can call this "reverse expansion"
 */
export function aggregateJestTags( n: JestTagsTreeNode, parentTags: string[] = [] ): JestTagsTreeNodeFull {
  if ( n.children === undefined || n.children.length === 0 ) {
    const fullNode: JestTagsTreeNodeFull = {
      tags: n.tags,
      fullTags: [ ...new Set( n.tags.concat( parentTags ) ) ],
    };

    return fullNode;
  }

  const parentTagsToCalcChildren = [ ...new Set(
    parentTags.concat( n.tags ),
  ) ];
  const nextChildren = n.children.map( child => aggregateJestTags( child, parentTagsToCalcChildren ) );
  const aggregatedTags = [ ...new Set( n.tags.concat( ...nextChildren.map( it => it.fullTags || it.tags ) ) ) ];

  return {
    ...n,
    children: nextChildren,
    fullTags: aggregatedTags,
  };
}
