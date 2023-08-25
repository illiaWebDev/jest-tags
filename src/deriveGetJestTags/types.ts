export type JestTagsTreeNode = {
  tags: string[];
  children?: JestTagsTreeNode[]
};
export type JestTagsTreeNodeFull = Pick< JestTagsTreeNode, 'tags' > & {
  tags: string[];
  /**
   * represents full array of tags, including \
   * those of successors
   */
  fullTags: string[];
  children?: JestTagsTreeNodeFull[]
};
