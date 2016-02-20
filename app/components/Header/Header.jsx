import React from 'react';
import './_Header.scss';
import AppActions from '../../actions/AppActions';
import Login from '../Login/Login';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      submitted: false
    };
  }

  search(e) {
    e.preventDefault();
    this.setState({ filtered: true });
    AppActions.searchMovies(this.state.searchTerm);
  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    AppActions.fetchMovies();
    this.setState({ searchTerm: undefined, filtered: false });
  }


  updateSearchTerm(e) {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  }

  render() {
    let searchBox;
    if (this.state.filtered) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm}
          <a href="#">
            <i className="fa fa-remove"
              onClick={this.reset.bind(this)} />
          </a>
        </h3>
      );
    } else {
      searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
          <input ref="searchBox"
            className="search-input"
            type="text"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.updateSearchTerm.bind(this)} />
        </form>
      );
    }

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            { searchBox }
            <select className="display-select"
              onChange={this.sort.bind(this)}>
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
            <Login user={this.props.user} />
            <a className="header-cart-container" href="/cart">
              <div className="fa fa-shopping-cart"></div>
              <div className="circle">{this.props.cartCount}</div>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.object,
  cartCount: React.PropTypes.number
};
