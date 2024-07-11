"use client"
import useQuiz from "@/app/store";
import React from "react";

export default function Button() {
  const addStatus = useQuiz((state:any) => state.addStatus);
  
  const handleClick = () => {
    addStatus('start');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-4 m-auto w-1/2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Start Quiz
    </button>
  );
}
