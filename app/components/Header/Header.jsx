import React from 'react';
import './_Header.scss';

/*
 1. Create Search method to call to App.jsx from props
 2. Use this.refs over querySelectorAll
*/
export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    var searchBox = (
        <form className="search-form">
          <input ref="searchBox"
                 className="search-input"
                 type="text"
                 placeholder="Search"/>
        </form>
      );

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {searchBox}
            <select className="display-select">
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </header>
    );
  }
}
