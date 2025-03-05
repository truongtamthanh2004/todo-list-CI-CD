import React, { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Boxing training",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: 2,
      name: "Study",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: 3,
      name: "Sleep",
      isImportant: false,
      isCompleted: false,
      isDeleted: true,
      category: "travel",
    },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  return (
    <AppContext.Provider
      value={{
        todoList,
        setTodoList,
        selectedCategoryId,
        setSelectedCategoryId,
        activeTodoItemId,
        setActiveTodoItemId,
        showSidebar,
        setShowSidebar,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
