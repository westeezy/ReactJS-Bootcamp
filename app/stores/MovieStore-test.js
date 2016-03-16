import { expect } from 'chai';
import MovieStore from './MovieStore';

describe('Stores', () => {
  describe('MovieStore', () => {
    let movieStore;
    const setMovies = () => {
      movieStore.set([{ title: 'One', rating: '5' }, { title: 'Two' }, { title: 'Three' }]);
    };

    beforeEach(() => {
      movieStore = MovieStore;
      setMovies();
    });

    it('should set a list of movies', () => {
      expect(movieStore.getAll()).to.have.length(3);
    });

    it('should get movies by title', () => {
      const result = movieStore.getByTitle('One');
      expect(result.title).to.equal('One');
    });

    it('should sort movies', () => {
      movieStore.sort('title');
      const result = movieStore.getAll();
      expect(result).to.have.length(3);
      expect(result[1].title).to.equal('Three');
    });

    it('should rate a movie', () => {
      movieStore.rate('One', '4');
      const result = movieStore.getByTitle('One');
      expect(result.rating).to.equal('4');
    });
  });
});
