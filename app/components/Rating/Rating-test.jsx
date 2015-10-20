
/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Rating from './Rating';


describe('Components', () => {
  describe('Rating', () => {
    let component,
        props = {stars: 3};

    beforeEach(() => {
      let element = React.createElement(Rating, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      expect(result).to.be.defined;
    });

    it('should render the default star count from props', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars'),
          starCount = result.querySelectorAll('.fa-star').length,
          unfilledCount = result.querySelectorAll('.fa-star-o').length;

      expect(starCount).to.equal(3);
      expect(unfilledCount).to.equal(2);
    });

    it('should update the star count on click', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars'),
          star = result.querySelectorAll('.fa-star-o')[0];
      TestUtils.Simulate.click(star);

      expect(result.querySelectorAll('.fa-star').length).to.equal(4);
    });
  });
});
