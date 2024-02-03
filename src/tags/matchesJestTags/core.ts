import type { JestTags } from '../deriveJestTags/core';


export const matchesJestTags = ( envTags: JestTags, tags: string[] ): boolean => {
  const envTagsEntries = Object.entries( envTags );

  const decision = envTagsEntries.reduce< 'skip' | 'dontSkip' >(
    ( a, [ tagName ] ) => {
      // if accumulator is set to 'skip' -> some other tag from envTags
      // was unmatched -> skip this iteration
      if ( a === 'skip' ) return 'skip';

      // if there exists such tag in tags that is equal to current
      // tag from envTags -> don't skip, otherwise -> skip
      return tags.some( it => it === tagName ) ? 'dontSkip' : 'skip';
    },
    'dontSkip',
  );

  return decision === 'dontSkip';
};
