import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            searchTerm: null,
            submitted: false
        };
    }

    render() {
        let searchBox = !this.state.submitted ?
                <form className="search-form" onSubmit={this.search.bind(this)}>
                    <input ref="searchBox"
                           className="search-input"
                           type="text"
                           value={this.state.searchTerm}
                           onChange={this.updateSearchTerm.bind(this)}
                           placeholder="Search"/>
                </form>
                :
                <h3 className="term">
                    {this.state.searchTerm}
                    <a href='#'>
                        <i className="fa fa-times"
                           onClick={this.reset.bind(this)}/>
                    </a>
                </h3>;

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
        let query = this.state.searchTerm;
        this.props.search(query);
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
    search: function () {
    },
    sort: function () {
    },
    reset: function () {
    }
};

Header.propTypes = {
    search: React.PropTypes.func,
    sort: React.PropTypes.func,
    reset: React.PropTypes.func
};
