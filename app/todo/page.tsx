// [x] Parent component to manage TODOs
// [x] Can add new TODOs

// [x] Child component to render each TODO
// [x] Can mark TODOs as complete
// [x] Can delete TODOs

'use client';

import { FC } from 'react';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

type TextboxType = {
  value: string;
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Textbox: FC<TextboxType> = ({ value, onSubmit, onChange }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  return (
    <div className="border-2 rounded w-full max-w-md">
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        placeholder="Add task..."
        className="w-full px-4 py-2 outline-none"
      ></input>
    </div>
  );
};

const Manager: React.FC = () => {
  const [query, setQuery] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClick = () => {
    if (query.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: query,
        completed: false,
      };
    setTodos([...todos, newTodo]);
    setQuery("");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo =>
      todo.id !== id
    ));
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="bg-gray-200 p-4 rounded-lg relative">
        <Textbox value={query} onSubmit={handleClick} onChange={handleChange} />
      </div>
      <button
        onClick={handleClick} 
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-12 border-2 rounded-md w-full mb-2">
          Add
      </button>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

const TodoList: FC<TodoProps> = ( { todos, onToggle, onDelete }) => {
  return (
    <ul className="w-full max-w-md">
      { // TypeScript land
        todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-2 font-medium border-b">
            <span className={todo.completed ? 'line-through text-gray-600' : ''}>
              {todo.text}
            </span>
            <div>
              <button onClick={() => onToggle(todo.id)} className="mr-2 text-green-700">
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => onDelete(todo.id)} className="mr-2 text-red-700">
                Delete
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-semibold m-4">TODO List</div>
      <Manager />
    </main>
  );
}
