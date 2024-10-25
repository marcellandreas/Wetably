import React from "react";

interface Note {
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

interface Props {
  notes: Note[];
  onDelete: (id: number | string) => void;
  onArchive: (id: number | string) => void;
  onEdit: (note: Note) => void;
}

const NoteList: React.FC<Props> = ({ notes, onDelete, onArchive, onEdit }) => {
  return (
    <div className=" grid grid-cols-2 gap-3  p-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 border border-gray-300 rounded w-full col-span-1 "
        >
          <h3 className="font-bold text-lg mb-2">{note.title}</h3>
          <p className="text-gray-700">{note.body}</p>
          <hr className="my-2" />
          <div className="mt-2 flex space-x-2">
            {!note.archived && (
              <button
                onClick={() => onEdit(note)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onArchive(note.id)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              {note.archived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
