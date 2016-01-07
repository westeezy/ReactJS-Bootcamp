/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import MovieList from './MovieList';

describe('Components', () => {
  describe('MovieList', () => {
    let component,
        props = {movies: [{title: 'One'}, {title: 'Two'}], user: {name: 'Test'}};

    beforeEach(() => {
      let wrapper = React.createClass({
        render: () => {
          return <MovieList {...props} />;
        }
      });

      let element = React.createElement(wrapper);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-list');
      expect(result).to.be.defined;
    });

    it('should render the entire list of movies passed in', () => {
      let result = TestUtils.scryRenderedDOMComponentsWithClass(component, 'movie-tile-container');
      expect(result).to.be.defined;
      expect(result).to.have.length(2);
    });
  });
});
