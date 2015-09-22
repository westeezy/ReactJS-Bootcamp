import React from 'react';
import './_Header.scss';

/*
 * 1. Set up a search method on Header to load a specific movie
 * 2. Set up a sort method on Header to sort the movies
 */
export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    let searchBox = (
        <h3 className="term">
          {'searchTerm'}
          <a href='#'>
            <i className="fa fa-times"
                onClick={this.reset.bind(this)}/>
          </a>
        </h3>);

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            <form className="search-form" onSubmit={this.search.bind(this)}>
              <input ref="searchBox"
                     className="search-input"
                     type="text"
                     placeholder="Search"/>
            </form>
            <select className="display-select"
                    onChange={this.sort.bind(this)}>
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </header>
    );
  }

  updateSearchTerm(e) {
    let searchTerm = e.target.value;
    console.log(searchTerm);
  }

  search(e) {
    e.preventDefault();
    let query = document.querySelector('.search-input').value;
    this.props.search(query);
  }

  sort(e) {
    this.props.sort(e.target.value);
  }

  reset() {
    this.props.reset();
  }
}

Header.defaultProps = {
  search: function(){},
  sort: function(){},
  reset: function(){}
};

Header.propTypes = {
  search: React.PropTypes.func,
  sort: React.PropTypes.func,
  reset: React.PropTypes.func
};
