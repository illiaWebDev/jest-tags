import { JEST_FNAME_FILTER_TAGS, defaultJestFNameFilterTags } from './constants';


export function filterJestFNames( paths: string[] ) {
  const { [ JEST_FNAME_FILTER_TAGS ]: tags } = process.env;
  const normalizedTags = typeof tags === 'string' ? tags : '';
  const aggregated = normalizedTags.split( ';' ).filter( Boolean ).reduce(
    ( a, tag ) => ( { ...a, [ tag ]: true as const } ),
    defaultJestFNameFilterTags,
  );

  if ( aggregated === defaultJestFNameFilterTags ) {
    return { filtered: paths.map( test => ( { test } ) ) };
  }


  const keys = Object.keys( aggregated );

  return {
    filtered: paths
      .filter( fName => keys.some( key => fName.indexOf( key ) !== -1 ) )
      .map( test => ( { test } ) ),
  };
}

export default filterJestFNames;
