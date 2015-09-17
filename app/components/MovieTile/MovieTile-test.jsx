/* globals beforeEach, expect */
/* eslint-disable no-unused-expressions, no-unused-vars */

import React from 'react/addons';
import TestUtils from 'react/lib/ReactTestUtils';
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
  });
});

/* eslint-enable no-unused-expressions */
