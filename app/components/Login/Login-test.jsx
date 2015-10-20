/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Login from './Login';


describe('Components', () => {
  describe('Login', () => {
    let component;

    beforeEach(() => {
      let wrapper = class Wrapper extends React.Component {
        render() {
          return (
            <div><Login user={'Test'}/></div>
          );
        }
      };

      let element = React.createElement(wrapper);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-login');
      expect(result).to.be.defined;
    });

    it('should print the name passed in', () => {
      let result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-login');
      expect(result.innerHTML).to.contain('Test');
    });
  });
});
