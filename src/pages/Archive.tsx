"use client";

import NoteList from "@/components/NoteList";
import { useEffect, useState } from "react";

interface Note {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

export default function Archive() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [editingNote]);

  const saveNotesToLocalStorage = (notes: Note[]): void => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const deleteNote = (id: number | string): void => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const archiveNote = (id: number | string): void => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const startEditing = (note: Note): void => {
    setEditingNote(note);
  };

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Catatan Arsip</h2>

      <article className="bg-white rounded-lg shadow-md p-6 min-h-[60vh]">
        {notes.filter((note) => note.archived).length > 0 ? (
          <NoteList
            notes={notes.filter((note) => note.archived)}
            onDelete={deleteNote}
            onArchive={archiveNote}
            onEdit={startEditing}
          />
        ) : (
          <div className="flex justify-center items-center min-h-full">
            <p className="text-center text-gray-600">
              Belum ada catatan yang diarsipkan.
            </p>
          </div>
        )}
      </article>
    </div>
  );
}
