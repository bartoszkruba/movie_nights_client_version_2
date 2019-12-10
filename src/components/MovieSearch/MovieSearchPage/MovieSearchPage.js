import React, {Component} from 'react'
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import MovieSearchComponent from '../MovieSearchComponent/MovieSearchComponent'
import axios from '../../../axios/axios';
import {ACCESS_TOKEN} from "../../../constants/constants";
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class MovieSearchPage extends Component {

  render() {
    return <div>
      <div className="row mb-5">
        <h1 className="m-auto">Search For Movies</h1>
      </div>
      <MovieSearchComponent/>
    </div>
  }
}

export default MovieSearchPage;