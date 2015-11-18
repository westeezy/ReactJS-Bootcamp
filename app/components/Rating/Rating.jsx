var React = require('react');

// TODO: Build a proper ES6 Rating Component
// We will talk later about how to pass in the starCount form the parent

module.exports = React.createClass({

    render: function () {
        return (
            <div className="stars" style={{color: 'gold'}}>
                <i className="fa fa-star"/>
                <i className="fa fa-star"/>
                <i className="fa fa-star"/>
                <i className="fa fa-star-o"/>
                <i className="fa fa-star-o"/>
            </div>
        );
    }
});
