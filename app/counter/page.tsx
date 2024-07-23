// [x] Displays current count
// [x] Increments and decrements the count
// [x] Reset button to reset count to zero
// [x] Changes color of button when feature is negative (cslx)

"use client";

import React from "react";
import { useState } from "react";
import clsx from 'clsx';

type ButtonProps = {
  handleClick: () => void;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ handleClick, className, children}) => {
  return (
    <button
      onClick={handleClick}
      className={clsx(
        "px-8 py-4 text-white rounded",
        className
      )}
    >
      {children}
    </button>
  );
};

export default function Home() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex gap-6">
        <Button handleClick={increment} className="bg-green-600 hover:bg-green-700">Increment</Button>
        <Button handleClick={reset} className="bg-sky-600 hover:bg-sky-700">Reset</Button>
        <Button handleClick={decrement} className="bg-orange-600 hover:bg-orange-700">Decrement</Button>
      </div>
      <div className={clsx(
        "p-6 text-center text-2xl",
        {'text-red-600': count < 0}
      )}>
          Count: {count}
      </div>
    </main>
  );
}
