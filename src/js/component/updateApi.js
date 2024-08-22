const API_BASE_URL = 'https://playground.4geeks.com/todo';
const user = "Kain19";



export const fetchUserTodos = async (setToDoItems) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setToDoItems(data.todos);
      } else {
        const response = await fetch(`${API_BASE_URL}/users/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setToDoItems([]);
        }
      }
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  };

 export const addItem = async (newItem, toDoItems, setToDoItems) => {
    if (newItem) {
      try {
        // const newTask = {
        //     label: newItem,
        //     is_done: false,
        // }
        const response = await fetch(`${API_BASE_URL}/todos/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: newItem,
            is_done: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // const updatedTodos = [
          //   ...toDoItems,
          //   { ...newTask, id: data.id},
          // ];

          // setToDoItems(updatedTodos);
          fetchUserTodos(setToDoItems)
        //   setNewItem("");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

 export const deleteTask = async (id, setToDoItems, toDoItems) => {
    try {
      const url = `${API_BASE_URL}/todos/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        const newList = toDoItems.filter((todo) => todo.id !== id);
        setToDoItems(newList);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  export const deleteUser = async(setToDoItems) => {
    try {
        const url = `${API_BASE_URL}/users/${user}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
  
        if (!response.ok) {
        throw new Error("failed to delete users and tasks, status: "+ response.status);
        }

        console.log("user and tasks deleted successfully from API");
        setToDoItems([]);
      } catch (error) {
        console.error("Error deleting user and tasks from API:", error);
      }
  }