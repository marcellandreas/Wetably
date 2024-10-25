"use client";

import { useState } from "react";

interface Todo {
  id: number | string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
}

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number | string) => void;
}

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", todo.id.toString());
  };

  return (
    <div
      className="p-4 mb-2 bg-white shadow-md rounded-md border hover:bg-gray-50"
      draggable
      onDragStart={handleDragStart}
    >
      <h3 className="text-lg font-medium">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <div className="flex justify-end mt-2">
        <button onClick={() => onEdit(todo)} className="text-blue-500 mr-2">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
