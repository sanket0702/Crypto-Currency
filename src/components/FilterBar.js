// src/components/FilterBar.js
import React from "react";
import PropTypes from "prop-types";
import "./FilterBar.css";

const FilterBar = ({ onFilter }) => {
  const handleSortChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="filter-bar">
      <select onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="market_cap">Market Cap</option>
        <option value="price">Price</option>
        <option value="availability">Availability</option>
      </select>
    </div>
  );
};

FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterBar;
