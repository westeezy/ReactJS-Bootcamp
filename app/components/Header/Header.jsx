import React from 'react';
import './_Header.scss';
import AppActions from '../../actions/AppActions';
import Login from '../Login/Login';
import page from 'page';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null
    };
  }

  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            { this.getSearchBox() }
            <select className="display-select"
              onChange={this.sort.bind(this)}>
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
            <Login user={this.props.user}/>
          </div>
        </div>
      </header>
    );
  }

  updateSearchTerm(e) {
    this.setState({searchTerm: e.target.value});
  }

  search(e) {
    e.preventDefault();
    // page(`/movies/${this.state.searchTerm}`);
    AppActions.searchMovies(this.state.searchTerm);
  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    AppActions.fetchMovies();
    // page('/');
    this.setState({searchTerm: undefined});
  }

  getSearchBox() {
    let searchBox;
    if (this.props.filtered) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm}
          <a href='#'>
            <i className="fa fa-remove"
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
    return searchBox;
  }
}
