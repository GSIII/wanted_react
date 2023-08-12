import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

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
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={addTodoList}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todos.map((todo, index) => (
          <ul>
            <li key={todo.index}>{todo.todo}</li>
          </ul>
        ))}
      </ul>
      {/* <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
          <button>수정</button>
          <button>삭제</button>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 2</span>
        </label>
      </li> */}
    </div>
  );
}
