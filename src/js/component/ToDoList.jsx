import React, { useState, useEffect } from "react";
import { fetchUserTodos, addItem, deleteTask, deleteUser } from "./updateApi";

const ToDoList = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  // const [user, setUser] = useState("Kain19");

  // const API_BASE_URL = 'https://playground.4geeks.com/todo';

  useEffect(() => {
    fetchUserTodos(setToDoItems);
  }, []);

  const handleAddItem = (e) => {
    if (e.key === "Enter" || e.type === "click"){ 
      addItem(newItem, toDoItems, setToDoItems);
    setNewItem("")
    }
  }

 
  const handleDeleteUser =() => {
    setToDoItems([]);
    deleteUser(setToDoItems);
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">To-Do List</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleAddItem}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleAddItem}
              >
                Add
              </button>
            </div>
          </div>
          <ul className="list-group">
            {toDoItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.label}
                <button
                  className="btn btn-danger btn-sm mx-5"
                  onClick={() => deleteTask(item.id, setToDoItems, toDoItems)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button 
              className="btn btn-danger"
              onClick={handleDeleteUser} 
            >
            delete user and all tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;