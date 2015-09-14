var React = require('react');

/*
  1. Convert this file to use es6 syntax.
  2. Pulling in this component into MovieTile.jsx
*/
module.exports = React.createClass({

  render: function() {
    return (
      <div className="stars" style={{color: 'gold'}}>
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star-o" />
        <i className="fa fa-star-o" />
      </div>
    );
  }
});
