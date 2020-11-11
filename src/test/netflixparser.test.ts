import parseTitle from '../netflixparser'

// Configure Jest by following these instructions:
// https://jestjs.io/docs/en/getting-started#using-typescript

describe('parseTitle', () => {
  it('should handle films', () => {
    expect(parseTitle('Vertigo')).toEqual(['Vertigo'])
  })

  it('should handle standard episodes', () => {
    expect(parseTitle('Community: Season 1: Episode 4 Random Film Parody'))
      .toEqual(['Community', 'Season 1', 'Episode 4 Random Film Parody'])
  })

  it('should handle films with colons', () => {
    expect(parseTitle('American Family: the Murderer Next Door'))
      .toEqual(['American Family: the Murderer Next Door'])
  })
})


export { };
