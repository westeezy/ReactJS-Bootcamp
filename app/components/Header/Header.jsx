import React from 'react';
import './_Header.scss';

// TODO: Create a select box with Title View By and options Title and Rating
// TODO: How to wire in onSubmit of the search box to console.log the value of the query using document.querySelector
// TODO: Create a method for when the user change the sort option to console.log it out
// TODO: Make sure to use default and propTypes when passing down from App
//
// After State:
// TODO: Wire up searchBox to show current query and reset button
// TODO: Wire up sort functionality

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
            <form onSubmit={f => f} className="search-form">
              <input className="search-input"
                type="text"
                placeholder="Search"/>
              <select onChange={f => f} className={"display-select"}>
                <option>View By:</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
              </select>
            </form>
          </div>
        </div>
      </header>
    );
  }

  search(e) {
    e.preventDefault();
    console.log('submitted');
  }

  sort(e) {
    e.preventDefault();
    console.log('select changed');
  }
  reset() {
    console.log('reset');
  }

}

/*
   //  Markup for searchBox
    const searchBox = true ?
      <form className="search-form" onSubmit={this.search.bind(this)}>
        <input ref="searchBox"
          className="search-input"
          type="text"
          value={this.state.searchTerm}
          onChange={this.updateSearchTerm.bind(this)}
          placeholder="Search"/>
      </form>
        :
          <h3 className="term">
            {this.state.searchTerm}
            <a href='#'>
              <i className="fa fa-times"
                onClick={this.reset.bind(this)}/>
            </a>
          </h3>;
*/
