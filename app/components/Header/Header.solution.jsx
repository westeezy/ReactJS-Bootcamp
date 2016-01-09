import React from 'react';
import './_Header.scss';
import Login from '../Login/Login.solution';

//TODO: Uncomment out header to show a form for search
//TODO: Import Login Component

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
            <Login />
            <form className="search-form">
              <input className="search-input" type="text" placeholder="Search" />
            </form>
          </div>
        </div>
      </header>
    );
  }
}
