import React from 'react';
import MovieTile from '../MovieTile/MovieTile.solution';
import './_MovieList.scss';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="movie-list">
                <ul className="items">
                    {
                        this.props.movies.map((movie, idx) => {
                            return <MovieTile key={idx} movie={movie}/>;
                        })
                    }
                </ul>
            </div>);
    }
}

MovieList.defaultProps = {
    movies: []
};

MovieList.propTypes = {
    movies: React.PropTypes.array
};
