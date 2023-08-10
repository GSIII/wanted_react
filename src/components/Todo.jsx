import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Todo() {
  const [todoList, setTodoList] = useState([]);

  const addTodoList = (e) => {
    setTodoList(e.target.valuse);
  };

  //   useEffect(() => {
  //     axios({
  //       url: "https://www.pre-onboarding-selection-task.shop/todos",
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     }).then(
  //       (res) => {
  //         if (res.status === 200) {
  //           setTodoList(res.data);
  //         }
  //       },
  //       [todoList]
  //     );
  //   });
  const addTodo = (newTodo) => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        todoList: newTodo,
      },
    })
      .then((res) => {
        setTodoList((prevTodo) => [...prevTodo, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input data-testid="new-todo-input" onChange={addTodoList} />
      <button data-testid="new-todo-add-button" onClick={() => addTodo()}>
        추가
      </button>
      <li>
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
      </li>
      <li>{todoList}</li>
    </div>
  );
}
