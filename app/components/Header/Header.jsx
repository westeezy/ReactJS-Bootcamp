import React from 'react';
import './_Header.scss';

/*
 * 1. Set up a search method on Header to load a specific movie
 * 2. Set up a sort method on Header to sort the movies
 */
export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      searchTerm: null,
      submitted: false
    };
  }

  render() {
    var searchBox;
    if (this.state.submitted) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm}
          <a href='#'>
            <i className="fa fa-times"
                onClick={this.reset.bind(this)}/>
          </a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
          <input ref="searchBox"
                 className="search-input"
                 type="text"
                 placeholder="Search"
                 value={this.state.searchTerm}
                 onChange={this.updateSearchTerm.bind(this)}/>
        </form>
      );
    }

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {searchBox}
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
    this.setState({searchTerm});
  }

  search(e) {
    e.preventDefault();
    this.setState({submitted: true});
    this.props.search(document.querySelector('.search-input').value);
  }

  sort(e) {
    this.props.sort(e.target.value);
  }

  reset() {
    this.setState({submitted: false, searchTerm: undefined});
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
