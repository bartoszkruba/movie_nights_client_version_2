import React, {Component} from 'react';
import {Button, FormGroup, Label, Input, Col, Alert} from 'reactstrap';

class SearchBar extends Component {

  state = {
    title: "",
    type: "movie",
    year: "",
  };

  handleChange = e => {
    const state = {...this.state};
    state[e.target.name] = e.target.value;
    this.setState(state)
  };

  handleSearch = e => {
    this.props.onSearch(this.state.title, this.state.type, this.state.year, 1);
  };


  render() {
    return (<div>
        {this.props.error && <div className="col-12 mt-4">
          <Alert color="danger">{this.props.error}</Alert>
        </div>}
        <FormGroup className="m-auto" row>
          <Label sm={2}>Title</Label>
          <Col sm={10}>
            <Input name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup className="m-auto pt-3" row>
          <Label sm={2}>Type</Label>
          <Col sm={10}>
            <Input name="type" type="select" value={this.state.type} onChange={this.handleChange}>
              <option>movie</option>
              <option>series</option>
              <option>episode</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup className="m-auto pt-3" row>
          <Label sm={2}>Year</Label>
          <Col sm={10}>
            <Input name="year" type="number" placeholder="Year" value={this.state.year} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup className="m-auto pt-3" row>
          <Col sm={{size: 10, offset: 2}}>
            <Button color="primary" onClick={this.handleSearch}>Search</Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default SearchBar