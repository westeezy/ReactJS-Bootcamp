/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Header from './Header';

Header.__Rewire__('page', () => {});

let searchAction = (component, query) => {
  let search = component.querySelector('.search-input'),
      form = component.querySelector('form');
      search.value='Query';
  TestUtils.Simulate.change(search);
  TestUtils.Simulate.submit(form);
};

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

    it('should update the search query when user enteres one', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      searchAction(result, 'Query');
      expect(result.querySelector('.term').textContent).to.equal('Query');
    });

    it('should reset a search back to input box', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-header');
      searchAction(result, 'Query');
      expect(result.querySelector('form')).to.be.null;
      TestUtils.Simulate.click(result.querySelector('.fa-remove'));
      expect(result.querySelector('form')).to.be.defined;
    });
  });
});
