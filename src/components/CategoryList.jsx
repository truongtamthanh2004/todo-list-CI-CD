import React, { useContext, useMemo } from "react";
import "./CategoryList.css";
import { CATEGORY_ITEMS } from "../constants";
import { AppContext } from "../context/AppProvider";

const CategoryList = ({ todoList }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);

  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        if (cur.category === "personal") {
          return { ...acc, personal: acc.personal + 1 };
        }
        if (cur.category === "company") {
          return { ...acc, company: acc.company + 1 };
        }
        if (cur.category === "travel") {
          return { ...acc, travel: acc.travel + 1 };
        }
        if (cur.category === "idea") {
          return { ...acc, idea: acc.idea + 1 };
        }
        return acc;
      },
      { personal: 0, company: 0, travel: 0, idea: 0 }
    );
  }, [todoList]);
  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`category-item ${
              selectedCategoryId === item.id ? "selected" : ""
            }`}
            onClick={() => setSelectedCategoryId(item.id)}
          >
            <p className="category-name">{item.label}</p>
            <p>{countByCategory[item.id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
