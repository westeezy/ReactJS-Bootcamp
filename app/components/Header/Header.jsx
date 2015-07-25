import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {

    var searchBox;
    if (this.props.term) {
      searchBox = (
        <h3 className="term">
          {this.props.term} <a href='#'><i className="fa fa-times"/></a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form">
          <input className="search-input" type="text" placeholder="Search" />
        </form>
      );
    }

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {searchBox}
            <select value={this.props.layout} className="display-select">
              <option>View By:</option>
              <option value="tile">Tile</option>
              <option value="list">List</option>
            </select>
          </div>
        </div>
      </header>
    );
  }

}
