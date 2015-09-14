import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
  }
  /*
    1. Create a select box with Title View By and options Title and Rating
    2. How to wire in onSubmit of the search box to console.log the value of the query using document.querySelector
    3.Create a method for when the user change the sort option to console.log it out
  */
  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            <form className="search-form">
              <input className="search-input"
                     type="text"
                     placeholder="Search" />
            </form>
            <i className="fa fa-user"></i>
          </div>
        </div>
      </header>
    );
  }

}
