export interface IMovieInterface {
  title: string,
  description?: string,
  year: string,
  cover: string,
  rating: number
}

export interface IMoviesModelInterface { //TODO: not yet used.
  movies: IMovieInterface
}
