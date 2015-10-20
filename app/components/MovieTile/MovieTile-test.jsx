/* eslint-disable no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import MovieTile from './MovieTile';


describe('Components', () => {
  describe('MovieTile', () => {
    let component, props;

    beforeEach(() => {
      let element = React.createElement(MovieTile, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-tile-container');
      expect(result).to.be.defined;
    });

    it('should compose the rating component', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      expect(result).to.be.defined;
    });
  });
});
