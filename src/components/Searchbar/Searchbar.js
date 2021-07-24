import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: "",
  };

  onSearchInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  onSearchFromSubmit = (e) => {
    const { onFormSubmit } = this.props;
    e.preventDefault();
    if (this.state.searchQuery.trim() === "") {
      alert("input valid name");
      return;
    }

    onFormSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSearchFromSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              value={searchQuery}
              onChange={this.onSearchInputChange}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}
