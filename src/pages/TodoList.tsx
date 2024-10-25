"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";

interface Todo {
  id: number | string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storedTodos);
  }, []);

  const onDrop = (id: string, newStatus: "To-Do" | "In Progress" | "Done") => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id.toString() === id ? { ...todo, status: newStatus } : todo
      )
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, todo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    localStorage.setItem("todos", JSON.stringify(todos));
    setEditingTodo(null);
  };

  const deleteTodo = (id: number | string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TodoForm onAddTodo={addTodo} todo={editingTodo} onEdit={editTodo} />
      <div className="grid grid-cols-3 gap-4">
        <TodoList
          title="To-Do"
          todos={todos.filter((todo) => todo.status === "To-Do")}
          onDrop={onDrop}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
        <TodoList
          title="In Progress"
          todos={todos.filter((todo) => todo.status === "In Progress")}
          onDrop={onDrop}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
        <TodoList
          title="Done"
          todos={todos.filter((todo) => todo.status === "Done")}
          onDrop={onDrop}
          onEdit={handleEdit}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}
