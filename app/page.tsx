import Button from "@/components/Button";
import DropOptions from "@/components/DropDown";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center my-10">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Welcome to
        </span>{" "}
        quiz...
      </h1>
      <section className="p-10 my-10 rounded-lg shadow-xl w-1/2 bg-stone-50">
        <div>
          <label
            htmlFor="questions"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number of Questions
          </label>
          <input
            type="number"
            defaultValue={10}
            min={0}
            max={20}
            id="questions"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <DropOptions />
          <Button />
        </div>
      </section>
    </section>
  );
}
