import React, { useState, useEffect } from "react";

interface Note {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

interface Props {
  addNote: (note: Note) => void;
  note?: Note | null;
  onUpdate?: (note: Note) => void;
}

const NoteForm: React.FC<Props> = ({ addNote, note, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [charLimit, setCharLimit] = useState(50);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setCharLimit(50 - note.title.length);
    } else {
      setTitle("");
      setBody("");
      setCharLimit(50);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length > 0 && body.length > 0) {
      const newNote = {
        id: note ? note.id : +new Date(),
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      if (note) {
        onUpdate?.(newNote);
      } else {
        addNote(newNote);
      }
      // Reset form
      setTitle("");
      setBody("");
      setCharLimit(50);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setCharLimit(50 - e.target.value.length);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 shadow-md rounded-lg"
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Judul catatan"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <p>Karakter tersisa: {charLimit}</p>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Isi catatan"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {note ? "Simpan Perubahan" : "Tambah Catatan"}{" "}
      </button>
    </form>
  );
};

export default NoteForm;
