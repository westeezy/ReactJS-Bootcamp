/* eslint-disable no-unused-expressions */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import MovieTile from './MovieTile';


describe('Components', () => {
  describe('MovieTile', () => {
    let component;
    let props;

    beforeEach(() => {
      const wrapper = React.createClass({
        render: () => {
          return <MovieTile />;
        }
      });
      const element = React.createElement(wrapper, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'movie-tile-container');
      expect(result).to.be.defined;
    });

    it('should compose the rating component', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'stars');
      expect(result).to.be.defined;
    });
  });
});
