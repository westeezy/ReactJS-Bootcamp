/* eslint-disable no-unused-expressions */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Login from './Login';


describe('Components', () => {
  describe('Login', () => {
    let component;

    beforeEach(() => {
      const wrapper = class Wrapper extends React.Component {
        render() {
          return (
            <div><Login user={'Test'} /></div>
          );
        }
      };

      const element = React.createElement(wrapper);
      component = TestUtils.renderIntoDocument(element);
    });

    it('should render into the document', () => {
      const result = TestUtils.findRenderedDOMComponentWithClass(component, 'app-login');
      expect(result).to.be.defined;
    });
  });
});
