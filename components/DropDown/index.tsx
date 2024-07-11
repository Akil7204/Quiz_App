"use client";
import useQuiz from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

type CategoryType = {
  id: number;
  name: string;
};

const Type = ["boolean", "multiple"];
const level = ["easy", "medium", "hard"];

export default function DropOptions() {
  const [Categories, setCategories] = useState<CategoryType[]>([]);
  const addCategory = useQuiz((state: any) => state.addCategory);
  const config = useQuiz((state: any) => state.config);
  const addLevel = useQuiz((state: any) => state.addLevel);
  const addType = useQuiz((state: any) => state.addType);

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
       // Check the structure of the response

      const { trivia_categories } = data; // Use the correct property name

      if (Array.isArray(trivia_categories)) {
        setCategories([...trivia_categories]);
      } else {
        console.error("trivia_categories is not an array:", trivia_categories);
      }
    }
    fetchCategory();
  }, []);

  return (
    <section className="flex justify-evenly items-center py-5 w-full">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.category.name ? config.category.name : "Select Category"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Categories.map((category) => (
              <DropdownMenuItem
                key={category.name}
                onClick={() => addCategory(category.id, category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.level ? config.level : "Select Level"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {level.map((e) => (
              <DropdownMenuItem onClick={() => addLevel(e)} key={e}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">
            {config.type ? config.type : "Select Type"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Type.map((e) => (
              <DropdownMenuItem onClick={() => addType(e)} key={e}>
                {e}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
