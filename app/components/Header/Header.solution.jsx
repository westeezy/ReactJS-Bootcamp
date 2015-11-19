import React from 'react';
import './_Header.scss';
import Login from '../Login/Login';

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
                        <Login />
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
        console.log('submitted');
    }

    sort(e) {
        e.preventDefault();
        console.log('select changed');
    }

}
