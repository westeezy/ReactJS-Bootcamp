import {IMovieInterface} from '../models/Movie.d.ts';

export interface IAppActionInterface {
  actionType: string,
  data: any //Can be single or Array of IMovieInterface. Union support would be nice
}
