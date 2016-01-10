import React from 'react';
import './_Header.scss';

// TODO: Wire up searchBox to show current query and reset button
// TODO: Wire up sort functionality

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      searchTerm: null,
      submitted: false
    };
  }

  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {
                this.state.submitted ?
                <h3 className="term">
                  {this.state.searchTerm}
                  <a href='#'>
                    <i
                      className="fa fa-times"
                      onClick={this.reset.bind(this)}/>
                  </a>
                </h3>
              : <form className="search-form" onSubmit={this.search.bind(this)}>
                <input
                  className="search-input"
                  type="text"
                  onChange={this.updateSearchTerm.bind(this)}
                  placeholder="Search"/>
              </form>
            }
            <select className="display-select" onChange={this.sort.bind(this)}>
              <option>
                View By:
              </option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
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
    this.props.search(this.state.searchTerm);
    this.setState({
      submitted: true
    });
  }

  sort(e) {
    this.props.sort(e.target.value);
  }

  reset() {
    this.props.reset();
    this.setState({
      submitted: false,
      searchTerm: null
    });
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
