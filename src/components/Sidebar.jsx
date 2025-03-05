import React, { useState } from "react";
import "./Sidebar.css";
import { CATEGORY_ITEMS } from "../constants";
const Sidebar = (props) => {
  const data = props.activeTodoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [category, setCategory] = useState(data.category);

  const handleSave = () => {
    const newTodo = {
      ...data,
      name: name,
      isImportant: isImportant,
      isCompleted: isCompleted,
      category: category,
    };
    props.handleTodoItemChange(newTodo);
    props.handleCloseSidebar();
  };

  const handleCancel = () => {
    props.handleCloseSidebar();
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            type="text"
            id="sb-name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is Important?</label>
          <input
            type="checkbox"
            id="sb-important"
            name="isImportant"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is Completed?</label>
          <input
            type="checkbox"
            id="sb-completed"
            name="isCompleted"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_ITEMS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Sidebar;
