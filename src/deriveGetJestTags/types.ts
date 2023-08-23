export type JestTagsTreeNode = {
  tags: string[];
  /**
   * represents full array of tags, including \
   * those of successors
   */
  fullTags?: string[];
  children?: JestTagsTreeNode[]
};
