import React, {Component} from 'react'
import {ACCESS_TOKEN} from "../../../constants/constants";
import axios from "../../../axios/axios";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import {Redirect} from "react-router-dom";

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
    loading: false,
    error: ""
  };

  handleSearch = async (title, type, year, page) => {
    this.setState({error: ""});
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
      console.log(e);
      if (e.response.status === 401 || e.response.status === 403) {
        this.setState({redirect: "/"})
      } else {
        this.setState({error: e.response.data.error})
      }
    }
    this.setState({loading: false});
  };

  switchPage = (page) => {
    this.handleSearch(this.state.search.title, this.state.search.type, this.state.search.year, page)
  };

  renderPagination() {
    if (this.state.totalMovies < 1) return null;

    const maxPage = Math.ceil(((this.state.totalMovies === 0) ? 1 : this.state.totalMovies) / 10);
    const pages = [];
    let min = this.state.currentPage - 3;
    let max = (this.state.currentPage + 3);
    if (min < 0) {
      max -= min - 1;
      min = 0;
    }

    if (this.state.currentPage === 3) max++;

    for (let i = min; i <= max; i++) {
      if (i < 1 || i > maxPage) continue;

      pages.push(<PaginationItem key={i} active={i === this.state.currentPage} onClick={() => this.switchPage(i)}>
        <PaginationLink>
          {i}
        </PaginationLink>
      </PaginationItem>)
    }

    return <Pagination className="text-center mt-3 d-flex justify-content-center">{pages}</Pagination>
  }

  render() {

    if (this.state.redirect) return <Redirect to={this.state.redirect}/>;

    return <div className="row">
      <div className="col-12 m-auto">
        <SearchBar onSearch={this.handleSearch} error={this.state.error}/>
        {this.state.totalMovies > 0 && this.renderPagination()}
        {!this.state.loading && <MovieList movieClicked={this.props.movieClicked} movies={this.state.movies}/>}
        {this.state.loading && <h3 className="text-center">Loading...</h3>}
        {this.state.totalMovies > 0 && this.renderPagination()}
      </div>
    </div>
  }
}

export default MovieSearchComponent