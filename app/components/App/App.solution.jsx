import './_App.scss';

import React from 'react';
import Header from '../Header/Header.solution';
import MovieList from '../MovieList/MovieList.solution';
import { getMoviesNow } from '../../util/api';
import MoviesModel from '../../models/Movies';

let moviesModel = new MoviesModel();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        moviesModel.movies = getMoviesNow();
        this.state = {
            movies: moviesModel.movies
        }
    }

    render() {
        return (
            <div className={'app'}>
                <Header search={this.search.bind(this)}
                        sort={this.sort.bind(this)}
                        reset={this.reset.bind(this)}/>
                <div className="main">
                    <MovieList movies={this.state.movies}/>
                </div>
            </div>
        );
    }

    search(query) {
        this.setState({
            movies: moviesModel.getBySearch(query)
        });
    }

    sort(key) {
        this.setState({
            movies: moviesModel.getSorted(key)
        });
    }

    reset() {
        moviesModel.movies = getMoviesNow();
        this.setState({movies: moviesModel.movies})
    }
}
