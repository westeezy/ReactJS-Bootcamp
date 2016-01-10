import React from 'react';
import './_Header.scss';

// TODO: Create a select box with Title View By and options Title and Rating
// TODO: How to wire in onSubmit of the search box to console.log the value of the query using document.querySelector
// TODO: Create a method for when the user change the sort option to console.log it out

export default class Header extends React.Component {

  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            { this.getSearchBox() }
            <select onChange={f => f} className={"display-select"}>
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
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

  updateSearchTerm(e) {
    console.log(e.target.value);
  }

  getSearchBox() {
    return true ?
      <form className="search-form" onSubmit={this.search.bind(this)}>
        <input ref="searchBox"
          className="search-input"
          type="text"
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
  }
}

Header.defaultProps = {
  search: f => f,
  sort: f => f,
  reset: f => f
};

Header.propTypes = {
  search: React.PropTypes.func,
  sort: React.PropTypes.func,
  reset: React.PropTypes.func
};

