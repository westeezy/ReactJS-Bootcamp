import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            <form className="search-form">
              <input className="search-input" type="text" placeholder="Search" />
             </form>
          </div>
        </div>
      </header>
    );
  }
}
