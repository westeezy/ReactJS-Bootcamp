import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <header className="app-header">
        Application Header
        {/*<div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
          search/sort
          </div>
        </div>
        */}
      </header>
    );
  }
}
