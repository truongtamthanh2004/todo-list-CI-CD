import React, { useMemo, useState } from "react";
import "./FilterPanel.css";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";

const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  todoList,
  searchText,
  setSearchText,
}) => {
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      {
        all: todoList.length,
        important: 0,
        completed: 0,
        deleted: 0,
      }
    );
  }, [todoList]);

  return (
    <div className="filter-panel">
      <input
        name="text-search"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <FilterList
        countByFilterType={countByFilterType}
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
      />

      <CategoryList todoList={todoList} />
    </div>
  );
};

export default FilterPanel;
