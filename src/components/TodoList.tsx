"use client";

import TodoItem from "@/components/TodoItem";

interface Todo {
  id: number | string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
}

interface TodoListProps {
  title: string;
  todos: Todo[];
  onDrop: (id: string, newStatus: "To-Do" | "In Progress" | "Done") => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number | string) => void;
}

export default function TodoList({
  title,
  todos,
  onDrop,
  onEdit,
  onDelete,
}: TodoListProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    onDrop(id, title as "To-Do" | "In Progress" | "Done");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="p-4 border rounded-lg min-h-[200px] bg-gray-100"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {todos?.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-gray-500">Tidak ada tugas</p>
      )}
    </div>
  );
}
