import { useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { AppContext } from "./context/AppProvider";

function App() {
  const {
    todoList,
    setTodoList,
    selectedCategoryId,
    activeTodoItemId,
    setActiveTodoItemId,
    showSidebar,
    setShowSidebar,
    selectedFilterId,
    setSelectedFilterId,
    searchText,
    setSearchText,
  } = useContext(AppContext);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const handleCompleteCheckbox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const inputRef = useRef();

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }

      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }

      if (selectedFilterId === "all") {
        return true;
      } else if (selectedFilterId === "important") {
        return todo.isImportant;
      } else if (selectedFilterId === "completed") {
        return todo.isCompleted;
      } else if (selectedFilterId === "deleted") {
        return todo.isDeleted;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: e.target.value,
                  isCompleted: false,
                  isImportant: false,
                  isDeleted: false,
                  category: "personal",
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filteredTodos.map((todo, index) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                handleCompleteCheckboxChange={handleCompleteCheckbox}
                handleTodoItemClick={handleTodoItemClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId}
            activeTodoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            handleCloseSidebar={handleCloseSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
