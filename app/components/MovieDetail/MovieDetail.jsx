import './_MovieDetail.scss';
import React from 'react';
import _ from 'lodash';
import MovieStore from '../../stores/MovieStore';
import AppActions from '../../actions/AppActions';

const findMovieFromAll = (props) => {
  let title;
  if (props.title) {
    title = props.title;
  } else {
    title = _.get(props.route, 'params.title', '');
  }
  return MovieStore.getByTitle(title);
};

const MovieDetail = (props) => {
  const movie = findMovieFromAll(props) || {};
  const addToCart = () => AppActions.addMovieToCart(movie);
  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <div className="pull-left">
          <img height="300px" src={`img/${movie.cover}`} width="200px" />
        </div>
        <div className="pull-right">
          <h2 className="title">{movie.title}</h2>
          <h3 className="year">{movie.year}</h3>
          <p className="description">{movie.description}</p>
          <p>
            <a href="/">
              <i className="fa fa-backward" />
              <span>  Back</span>
            </a>
          </p>
          <p>
            <button onClick={addToCart}>Add To Cart</button>
          </p>
        </div>
      </div>
    </div>);
};

MovieDetail.defaultProps = {
  route: {}
};

MovieDetail.propTypes = {
  route: React.PropTypes.object
};

export default MovieDetail;
