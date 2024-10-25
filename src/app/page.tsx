"use client";

import TodoList from "@/pages/TodoList";
import Notes from "@/pages/Notes";
import Homes from "@/pages/Home";
import { useState, useEffect } from "react";
import Archive from "@/pages/Archive";
import Pomodoro from "@/pages/Pomodoro";

interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

export default function Home() {
  const tabs: Tab[] = [
    { id: "home", label: "Home", component: <Homes /> },
    { id: "todo", label: "Todo List", component: <TodoList /> },
    { id: "notes", label: "Notes", component: <Notes /> },
    { id: "archive", label: "Archive", component: <Archive /> },
    { id: "pomodoro", label: "Pomodoro", component: <Pomodoro /> },
  ];

  const [activeTab, setActiveTab] = useState<string>("todo");
  const [isFixed, setIsFixed] = useState<boolean>(false);

  // Efek untuk memantau scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4 fixed top-0 w-full z-20">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Notably</h1>
          <nav className="space-x-6">
            <a
              href="https://www.linkedin.com/in/marcell-andreas"
              target="_blank"
              className="text-gray-700 hover:text-indigo-600 cursor-pointer"
            >
              Contact me?
            </a>
            <a
              href="https://github.com/marcellandreas"
              target="_blank"
              className="text-gray-700 hover:text-indigo-600 cursor-pointer"
            >
              More Projects?
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-8 pt-24 pb-20 flex-grow">
        <div
          className={`${
            isFixed
              ? "fixed top-16 left-0 right-0 px-8 bg-white z-10 shadow-md"
              : ""
          }`}
        >
          <hr />
          <div className="mb-6 flex space-x-4 border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-semibold focus:outline-none ${
                  activeTab === tab.id
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 border-b-2 border-transparent hover:border-blue-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${isFixed ? "mt-20" : "mt-8"}`}>
          {tabs.map(
            (tab) =>
              activeTab === tab.id && <div key={tab.id}>{tab.component}</div>
          )}
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Notably. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
