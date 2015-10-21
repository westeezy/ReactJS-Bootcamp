/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import MovieDetail from './MovieDetail';

MovieDetail.__Rewire__('MovieStore', {
    getByTitle: () => {
      return {
        title: 'Fake Title',
        year: '2015',
        description: 'Fake Desc',
      };
    }
});

describe('Components', () => {
  describe('MovieDetail', () => {
    let component,
        props = { context: { params: {title: 'Monopoly'} } };

    beforeEach(() => {
      let element = React.createElement(MovieDetail, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-detail-container');
      expect(result).to.be.defined;
    });

    it('should render the movie passed in through props', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-detail-container');
      expect(result.querySelector('.title').innerHTML).to.equal('Fake Title');
      expect(result.querySelector('.year').innerHTML).to.equal('2015');
      expect(result.querySelector('.description').innerHTML).to.equal('Fake Desc');
    });
  });
});
