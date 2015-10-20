/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Header from './Header';


describe('Components', () => {
  describe('Header', () => {
    let component,
        props = {};

    beforeEach(() => {
      let element = React.createElement(Header, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      expect(result).to.be.defined;
    });

    xit('should update the search query when user enteres one', () => {
      //TODO: Test + Stub Page.js
    });

    xit('should fire a sort action on user sort', () => {
      //TODO: Test + Spy AppActions
    });

    xit('should reset a search back to input box', () => {
      //TODO: Test + Stub Page.js
    });
  });
});
