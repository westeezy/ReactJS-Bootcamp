import React from 'react';
import './_Header.scss';
import Login from '../Login/Login';

export default class Header extends React.Component {

    constructor(...args) {
        super(...args);
    }

    // TODO: Create a select box with Title View By and options Title and Rating
    // TODO: How to wire in onSubmit of the search box to console.log the value of the query using document.querySelector
    // TODO: Create a method for when the user change the sort option to console.log it out

    render() {
        return (
            <header className="app-header">
                <div className="inner">
                    <h1 className="title">FakeFlix</h1>
                    <div className="header-right">
                        <Login />
                        <form className="search-form">
                            <input className="search-input"
                                   type="text"
                                   placeholder="Search"/>
                        </form>
                    </div>
                </div>
            </header>
        );
    }

}
