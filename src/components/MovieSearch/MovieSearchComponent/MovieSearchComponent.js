import React, {Component} from 'react'
import {ACCESS_TOKEN} from "../../../constants/constants";
import axios from "../../../axios/axios";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";

class MovieSearchComponent extends Component {
  state = {
    totalMovies: 0,
    currentPage: 0,
    movies: [],
    search: {
      title: "",
      type: "movie",
      year: ""
    },
    loading: false
  };

  handleSearch = async (title, type, year, page) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    this.setState({loading: true});
    try {
      const response = await axios.getMoviePage(token, title, type, year, page);
      this.setState({
        totalMovies: response.data.totalMovies,
        currentPage: page,
        movies: response.data.movies,
        search: {
          title,
          type,
          year
        }
      })
    } catch (e) {
      localStorage.removeItem(ACCESS_TOKEN);
      this.props.setUser(null);
      this.props.redirect("/");
    }
    this.setState({loading: false});
  };

  switchPage = (page) => {
    this.handleSearch(this.state.search.title, this.state.search.type, this.state.search.year, page)
  };

  renderPagination() {
    if (this.state.totalMovies < 1) return null;

    const pages = [];
    for (let i = 1; i <= this.state.totalMovies / 10 + 1; i++) {
      pages.push(<PaginationItem key={i} active={i === this.state.currentPage} onClick={() => this.switchPage(i)}>
        <PaginationLink>
          {i}
        </PaginationLink>
      </PaginationItem>)
    }

    return <Pagination className="text-center mt-3 d-flex justify-content-center">{pages}</Pagination>
  }

  render() {
    return <div className="row">
      <div className="col-12 m-auto">
        <SearchBar onSearch={this.handleSearch}/>
        {this.state.totalMovies > 0 && this.renderPagination()}
        {!this.state.loading && <MovieList movieClicked={this.props.movieClicked} movies={this.state.movies}/>}
        {this.state.loading && <h3 className="text-center">Loading...</h3>}
        {this.state.totalMovies > 0 && this.renderPagination()}
      </div>
    </div>
  }
}

export default MovieSearchComponent