/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import MovieList from './MovieList';

describe('Components', () => {
  describe('MovieList', () => {
    let component;
    const props = { movies: [{ title: 'One' }, { title: 'Two' }], user: { name: 'Test' } };

    beforeEach(() => {
      const wrapper = React.createClass({
        render: () => {
          return <MovieList {...props} />;
        }
      });

      const element = React.createElement(wrapper);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-list');
      expect(result).to.be.defined;
    });

    it('should render the entire list of movies passed in', () => {
      const result = TestUtils.scryRenderedDOMComponentsWithClass(component, 'movie-tile-container');
      expect(result).to.be.defined;
      expect(result).to.have.length(2);
    });
  });
});
