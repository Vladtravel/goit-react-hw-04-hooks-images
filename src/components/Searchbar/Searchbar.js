import { useState } from "react";
import PropTypes from "prop-types";

function Searchbar({ onFormSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSearchFromSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      alert("input valid name");
      return;
    }

    onFormSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSearchFromSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={searchQuery}
            onChange={onSearchInputChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
