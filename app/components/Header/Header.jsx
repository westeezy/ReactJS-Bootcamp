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
            <form className="search-form"
                  onSubmit={this._submit}>
              <input className="search-input"
                     type="text"
                     placeholder="Search" />
            </form>
            <select onChange={this._viewChange} className={"display-select"}>
              <option>View By:</option>
              <option value="Title">Title</option>
            </select>
            <i className="fa fa-user"></i>
          </div>
        </div>
      </header>
    );
  }

  _submit(e) {
    e.preventDefault();
    alert('submitted');
  }

  _viewChange(e) {
    e.preventDefault();
    alert('Hai');
  }

}
