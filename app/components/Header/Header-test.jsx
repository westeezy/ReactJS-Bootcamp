/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Header from './Header';

Header.__Rewire__('page', () => {});

const searchAction = (component) => {
  const search = component.querySelector('.search-input');
  const form = component.querySelector('form');
  search.value = 'Query';
  TestUtils.Simulate.change(search);
  TestUtils.Simulate.submit(form);
};

describe('Components', () => {
  describe('Header', () => {
    let component;
    const props = {};

    beforeEach(() => {
      const element = React.createElement(Header, props);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      expect(result).to.be.defined;
    });

    it('should update the search query when user enteres one', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      searchAction(result, 'Query');
      expect(result.querySelector('.term').textContent).to.equal('Query');
    });

    it('should reset a search back to input box', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      searchAction(result, 'Query');
      expect(result.querySelector('form')).to.be.null;
      TestUtils.Simulate.click(result.querySelector('.fa-remove'));
      expect(result.querySelector('form')).to.be.defined;
    });
  });
});
