import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';

const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      stars: (Math.floor(Math.random() * 5) + 1)
    };
    this.retrieveRating.bind(this);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;

    return (<li className="movie-tile-container item">
    		<div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
    			<div className="content">
    				<h2>{this.props.movieTitle}</h2>
            <div className="stars">
              {
                this.retrieveRating()
              }
            </div>
    			</div>
    		</a>
      </li>);
  }

  retrieveRating() {
    return _.map(_.range(MAX_STARS), (idx) => {
      return idx < this.state.stars ?
              <i key={idx} className="fa fa-star"/>
              : <i key={idx} className="fa fa-star-o"/>;
          }.bind(this)); //TODO: why did I need to bind this.
  }
}


MovieTile.defaultProps = {
  movieTitle: 'A Wild Movie Appears'
}

MovieTile.propTypes = {
  movies: React.PropTypes.string
};
