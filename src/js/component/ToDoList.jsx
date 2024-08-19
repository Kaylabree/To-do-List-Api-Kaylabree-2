import React, { useState, useEffect } from "react";
import { fetchUserTodos, addItem, deleteTask, deleteUser } from "./updateApi";

const ToDoList = () => {
  const [toDoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  // const [user, setUser] = useState("Kain19");

  // const API_BASE_URL = 'https://playground.4geeks.com/todo';

  useEffect(() => {
    fetchUserTodos();
  }, []);

  const handleAddItem = () => {
    addItem(newItem, setToDoItems);
    setNewItem("")
  }

  // const initailizeUser = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/users/${user}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setToDoItems(data.todos);
  //     } else {
  //       const response = await fetch(`${API_BASE_URL}/users/${user}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.ok) {
  //         setToDoItems([]);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error initializing user:", error);
  //   }
  // };

  // const handleAddItem = async () => {
  //   if (newItem) {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/todos/${user}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           label: newItem,
  //           is_done: false,
  //         }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setToDoItems([...toDoItems, data]);
  //         setNewItem("");
  //       }
  //     } catch (error) {
  //       console.error("Error adding task:", error);
  //     }
  //   }
  // };

  // const deleteTask = async (id) => {
  //   try {
  //     const url = `${API_BASE_URL}/todos/${id}`;
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       const newList = toDoItems.filter((todo) => todo.id !== id);
  //       setToDoItems(newList);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem(newItem, setToDoItems);
      setNewItem("")
    }
  };

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
              onKeyDown={handleKeyPress}
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
                  onClick={() => deleteTask(item.id)}
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