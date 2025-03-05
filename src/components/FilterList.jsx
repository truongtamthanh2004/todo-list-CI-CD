import React from "react";
import "./FilterList.css";
import { FILTER_ITEMS } from "../constants";

const FilterList = ({
  selectedFilterId,
  setSelectedFilterId,
  countByFilterType,
}) => {
  return (
    <div className="filter-container">
      {FILTER_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`filter-item ${
            selectedFilterId === item.id ? "selected" : ""
          }`}
          onClick={() => setSelectedFilterId(item.id)}
        >
          <div className="filter-name">
            <img src={item.iconPath} />
            <p>{item.label}</p>
          </div>
          <p>{countByFilterType[item.id]}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterList;
