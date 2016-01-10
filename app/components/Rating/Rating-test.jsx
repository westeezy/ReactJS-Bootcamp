/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Rating from './Rating';


describe('Components', () => {
  describe('Rating', () => {
    let component;
    const props = { stars: 3 };

    beforeEach(() => {
      const wrapper = class Wrapper extends React.Component {
        render() {
          return (
            <Rating stars={props.stars} />
          );
        }
      };
      const element = React.createElement(wrapper, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      expect(result).to.be.defined;
    });

    it('should render the default star count from props', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      const starCount = result.querySelectorAll('.fa-star').length;
      const unfilledCount = result.querySelectorAll('.fa-star-o').length;
      expect(starCount).to.equal(3);
      expect(unfilledCount).to.equal(2);
    });

    xit('should update the star count on click', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      const star = result.querySelectorAll('.fa-star-o')[0];
      TestUtils.Simulate.click(star);
    });
  });
});
