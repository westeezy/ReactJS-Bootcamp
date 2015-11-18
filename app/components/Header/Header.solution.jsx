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
                        <form className="search-form" onSubmit={this._submit}>
                            <input className="search-input"
                                   type="text"
                                   placeholder="Search"/>
                        </form>
                        <select onChange={this._viewChange} className={"display-select"}>
                            <option>View By:</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>
                </div>
            </header>
        );
    }

    _submit(e) {
        e.preventDefault();
        console.log('submitted');
    }

    _viewChange(e) {
        e.preventDefault();
        console.log('select changed');
    }

}
