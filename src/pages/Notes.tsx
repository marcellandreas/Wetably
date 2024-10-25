"use client";

import NoteForm from "@/components/NoteForm"; // Pastikan jalur ini benar
import NoteList from "@/components/NoteList"; // Pastikan jalur ini benar
import { useEffect, useState } from "react";

interface Note {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  // Memuat catatan dari Local Storage saat komponen dimuat
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const addNote = (note: Omit<Note, "createdAt">): void => {
    const newNote = { ...note, createdAt: new Date().toISOString() };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
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

  const editNote = (updatedNote: Note): void => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setEditingNote(null);
  };

  const startEditing = (note: Note): void => {
    setEditingNote(note);
  };

  // Fungsi untuk menyimpan catatan ke Local Storage
  const saveNotesToLocalStorage = (notes: Note[]): void => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Filter catatan berdasarkan tab aktif
  const filteredNotes =
    activeTab === "active"
      ? notes.filter((note) => !note.archived)
      : notes.filter((note) => note.archived);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <p className="text-lg text-gray-600 mb-6">
        Manage your thoughts and tasks effortlessly. Add, edit, or archive your
        notes in one place.
      </p>

      {/* Form Catatan */}
      <NoteForm
        addNote={addNote}
        onUpdate={editingNote ? editNote : undefined}
        note={editingNote}
      />

      {/* Tab untuk Catatan Aktif dan Arsip */}
      <div className="flex space-x-4 mt-6 mb-4 ">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Catatan Aktif
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "archived"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("archived")}
        >
          Catatan Arsip
        </button>
      </div>

      {/* Daftar Catatan */}
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDelete={deleteNote}
          onArchive={archiveNote}
          onEdit={startEditing}
        />
      ) : (
        <div className="flex justify-center items-center min-h-full">
          <p className="text-center text-gray-600">Belum ada catatan</p>
        </div>
      )}
    </div>
  );
}
