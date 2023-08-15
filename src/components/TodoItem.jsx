import axios from "axios";
import React, { useState } from "react";

export default function TodoItem({ todo, onEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const onEditMode = () => {
    setIsEdit(true);
  };

  const submitEdit = () => {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        todo: editTodo,
        isCompleted: !todo.isCompleted,
      }),
    })
      .then((res) => {
        console.log(res.data);
        onEdit(res.data);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  const deleteTodo = () => {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input type="checkbox" />
      {isEdit ? (
        <span>
          <input
            value={editTodo}
            data-testid="submit-buttom"
            onChange={(e) => setEditTodo(e.target.value)}
          />
          <button data-testid="submit-button" onClick={submitEdit}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={cancelEdit}>
            취소
          </button>
        </span>
      ) : (
        <span>
          <span>{todo.todo}</span>
          <button data-testid="modify-button" onClick={onEditMode}>
            수정
          </button>
          <button data-testid="delete-button" onClick={deleteTodo}>
            삭제
          </button>
        </span>
      )}
    </div>
  );
}
