import React from 'react';
import './_Header.scss';
import Login from '../Login/Login';

// TODO: Wire up Search that gets passed in as a prop from App.jsx
// TODO: Pass in a name prop to Login

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
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
            <Login />
          </div>
        </div>
      </header>
    );
  }

  search(e) {
    e.preventDefault();
    console.log('submitted');
  }

}

