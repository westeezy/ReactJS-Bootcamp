import React from 'react';
import './_Header.scss';

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
            <form className="search-form" onSubmit={this.search.bind(this)}>
              <input className="search-input"
                type="text"
                placeholder="Search"/>
            </form>
            <select onChange={this.sort.bind(this)} className={"display-select"}>
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
    this.props.search('Test Search');
  }

  sort(e) {
    e.preventDefault();
    this.props.sort(e.target.value);
  }
  reset() {
    this.props.reset();
  }
}

