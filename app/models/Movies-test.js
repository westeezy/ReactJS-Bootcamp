import { expect } from 'chai';
import Movies from './Movies';

describe('Models', () => {
  describe('Movies', () => {
    let moviesModel;

    beforeEach(() => {
      moviesModel = new Movies();
      moviesModel.movies = [{ title: 'One', rating: '5' }, { title: 'Two' }, { title: 'Abc' }];
    });

    it('should return a cloned copy of movies', () => {
      const result = moviesModel.movies;
      result.push({ title: 'Four' });
      expect(result).to.have.length(4);
      expect(moviesModel.movies).to.have.length(3);
    });

    it('should sort the movies', () => {
      const result = moviesModel.getSorted('title');
      expect(result).to.have.length(3);
      expect(result[0].title).to.equal('Abc');
    });

    it('should not fail on sort with a bad key', () => {
      const result = moviesModel.getSorted('does_not_exist');
      expect(result).to.have.length(3);
    });

    it('should get a movie by search', () => {
      const result = moviesModel.getBySearch('Two');
      expect(result).to.have.length(1);
      expect(result[0].title).to.equal('Two');
    });

    it('should return empty from search with no results', () => {
      const result = moviesModel.getBySearch('does_not_exist');
      expect(result).to.have.length(0);
    });

    it('should be able to update rating by title', () => {
      moviesModel.updateRating('One', '3');
      expect(moviesModel.movies[0].rating).to.equal('3');
    });

    it('should fail gracefully when movie is not found for rating update', () => {
      moviesModel.updateRating('does_not_exist', '3');
      expect(moviesModel.movies[0].rating).to.equal('5');
    });
  });
});

