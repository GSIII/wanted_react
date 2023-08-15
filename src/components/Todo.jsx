import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "../styles/Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleTodoItem = (editTodo) => {
    const updateTodo = todos.map((todo) =>
      todo.id === editTodo.id ? editTodo : todo
    );
    setTodos(updateTodo);
  };

  const addTodoList = (e) => {
    setNewTodo(e.target.value);
  };
  useEffect(() => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setTodos(res.data);
      }
    });
  }, [todos]);

  const addTodo = () => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        todo: newTodo,
      }),
    })
      .then((res) => {
        console.log(res.data);
        setNewTodo("");
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          className="todo-input"
          data-testid="new-todo-input"
          value={newTodo}
          onChange={addTodoList}
        />
        <button
          className="add-btn"
          data-testid="new-todo-add-button"
          onClick={addTodo}
        >
          추가
        </button>
      </div>
      <div className="list-container">
        <h1>할 일 목록</h1>
        {todos.map((todo, index) => (
          <ul>
            <li className="list-item">
              <TodoItem key={index} todo={todo} onEdit={handleTodoItem} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
