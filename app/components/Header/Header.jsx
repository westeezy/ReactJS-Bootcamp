import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {};
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

  }

  sort(e) {
  }

  reset() {
    this.setState({submitted: false, searchTerm: undefined});
  }

}
