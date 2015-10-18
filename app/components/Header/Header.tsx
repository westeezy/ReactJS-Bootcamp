import * as React from 'react';
import './_Header.scss';
import AppActions from '../../actions/AppActions';
import {IHeaderState, IHeaderProps} from './Header.d.ts';

export default class Header extends React.Component<IHeaderProps, IHeaderState> {

  public state: IHeaderState;

  constructor(props: IHeaderProps) {
    super(props);
    this.state = {submitted: false, searchTerm: ''};
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
    let searchTerm = String(e.target.value);
    this.setState({searchTerm} as IHeaderState);
  }

  search(e) {
    e.preventDefault();
    AppActions.searchMovie(this.state.searchTerm);
    this.setState({submitted: true} as IHeaderState);

  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    AppActions.fetchMovies(); //TODO: make loading more smooth on this piece
    this.setState({submitted: false, searchTerm: ''});
  }

}
