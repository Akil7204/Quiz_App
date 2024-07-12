"use client";
import React, { useEffect, useState } from "react";
import useQuiz from "../store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Quiz() {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state: any) => state.config);
  const addScore = useQuiz((state: any) => state.addScore);

  useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        );

        if (response.status === 429) {
          console.error("Too Many Requests. Retrying in 5 seconds...");
          setTimeout(getQuestions, 4000);
          return;
        }

        const data = await response.json();
        console.log("Entire Response:", data); // Log the entire response
        const { results, response_code } = data;

        if (response_code === 5) {
          console.error("No questions available for the given parameters.");
        } else if (response_code !== 0) {
          console.error("An error occurred with response code:", response_code);
        }

        let shuffledResults: [] = results.map((e: any) => {
          let value = [...e.incorrect_answers, e.correct_answer]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          e.answers = [...value];
          return e;
        });
        setQuestions([...shuffledResults]);
        setLoading(false);

        if (!results || results.length === 0) {
          console.error("No results found in the response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getQuestions();
  }, [config.numberOfQuestion, config.category.id, config.level, config.type]);

  const handleNext = () => {
    let reminingQuestions = [...questions];
    reminingQuestions.shift();
    setQuestions([...reminingQuestions]);
    setAnswer("");
  };

  const checkAnswer = (answer: string) => {
    if (answer === questions[0].correct_answer) {
      addScore(0);
    }
    setAnswer(questions[0].correct_answer);
  };

  return (
    <section className="flex flex-col justify-center items-center m-10">
      {
        questions.length? <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question number{" "}
        {!!questions?.length ? (
          <span className="text-blue-600 dark:text-blue-500">
            #{config.numberOfQuestion - questions.length + 1}
          </span>
        ) : null}
        .
      </h1>: null
      }
      {!loading && !!questions.length && (
        <p className="text-2xl">Score: {config.score}</p>
      )}
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-3xl lg:text-5xl ">
          {questions.length ? questions[0].question : null}
        </h4>

        {loading && (
          <div className="flex flex-col">
            <Skeleton className="w-[600px] h-[60px] my-10 rounded-sm" />
            <Skeleton className="w-[600px] h-[500px] rounded-sm" />
          </div>
        )}
        {!questions.length && !loading && (
          <div className="flex flex-col justify-center items-center ">
            <Player
              src="https://assets5.lottiefiles.com/packages/lf20_touohxv0.json"
              className="player"
              loop
              autoplay
              style={{ height: "200px", width: "250px" }}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              YOUR SCORE : {config.score}
            </h1>
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="my-4 py-3.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Take Another Quiz
            </button>
          </div>
        )}

        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%]">
          {questions.length
            ? questions[0].answers.map((ans: any) => (
                <button
                  key={ans}
                  type="button"
                  onClick={() => checkAnswer(ans)}
                  className={cn(
                    "w-[33%] border-0 my-4 py-3.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg shadow-blue-200 shadow-2xl  hover:bg-blue-600 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                    {
                      "bg-red-800": answer && ans !== answer,
                      "bg-blue-700": answer && ans === answer,
                      "hover:bg-red-900": answer && ans !== answer,
                      "hover:bg-blue-700": answer && ans === answer,
                      "text-gray-100": answer,
                    }
                  )}
                >
                  {ans}
                </button>
              ))
            : null}
        </div>
        {questions.length ? (
          <button
            onClick={() => handleNext()}
            type="button"
            className="w-[33%] my-4 py-3.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-blue-900 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Next
          </button>
        ) : null}
      </section>
    </section>
  );
}
