var React = require('react');
var _ = require('lodash');
/*
  0. Convert to es6
  1. Show how to build this component.
  2. Show how to pass in the rating from MovieTile
  3. Talk about best place for MAX_STARS
 */
var MAX_STARS = 5;

module.export = React.createClass({

  render: function() {
    return (
      <div className="stars">
        {
          this.retrieveRating()
        }
      </div>
    );
  },

  retrieveRating: function() {
    return _.range(MAX_STARS).map((idx) => {
      return idx < 4 ?
              <i key={idx} className="fa fa-star"
                           data-rating={idx}/>
              :
              <i key={idx} className="fa fa-star-o"
                           data-rating={idx}/>;
    });
  }
});
