import { useEffect, useState } from "react";

interface TodoFormProps {
  onAddTodo: (todo: {
    id: number | string;
    title: string;
    description: string;
    status: "To-Do" | "In Progress" | "Done";
  }) => void;
  todo?: {
    id: number | string;
    title: string;
    description: string;
    status: "To-Do" | "In Progress" | "Done";
  } | null;
  onEdit?: (todo: any) => void;
}

export default function TodoForm({ onAddTodo, todo, onEdit }: TodoFormProps) {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: todo ? todo.id : +new Date(),
      title,
      description,
      status: todo ? todo.status : "To-Do",
    };

    // Panggil fungsi edit jika ada, jika tidak, abaikan
    todo ? onEdit?.(newTodo) : onAddTodo(newTodo);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-5 bg-gray-100 p-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul Tugas"
        required
        className="border rounded p-2 mr-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deskripsi Tugas"
        required
        className="border rounded p-2 mr-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 w-1/5"
      >
        {todo ? "Update Tugas" : "Tambah Tugas"}
      </button>
    </form>
  );
}
