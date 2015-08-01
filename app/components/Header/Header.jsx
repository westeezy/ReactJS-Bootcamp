import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      searchTerm: null
    };
  }

  render() {

    var searchBox;
    if (this.state.searchTerm) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm} <a href='#'><i className="fa fa-times"/></a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
          <input ref="searchBox" className="search-input" type="text" placeholder="Search" />
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

  search(e) {
    e.preventDefault();
    //this is not efficient but for day 3 this is what we will be doing
    //fixing on day 4
    let searchTerm = this.refs.searchBox.getDOMNode().value;
    this.setState({searchTerm});
    this.props.search(searchTerm); //can't use state because its async
  }

  sort(e) {
    //this does not properly sort by user selected rating so we talk about that limitation and fix
    //on day 4
    this.props.sort(e.target.value);
  }

}

Header.defaultProps = {
  sort: function() {},
  search: function() {}
}
