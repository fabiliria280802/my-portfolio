import { Head } from "$fresh/runtime.ts";
import Navbar from "../../islands/Navbar.tsx";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-background text-text dark:bg-background-dark dark:text-text-dark px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          About Me
        </h1>
        <p></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-primary-light/10 dark:bg-primary-dark/10 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Skills
            </h3>
            <ul className="space-y-2 text-text-light dark:text-text-dark">
              <li className="flex items-center">
                <span className="mr-2">▹</span> Fresh & Deno
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> TypeScript
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> Modern Web Development
              </li>
            </ul>
          </div>
                    <div className="bg-primary-light/10 dark:bg-primary-dark/10 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Skills
            </h3>
            <ul className="space-y-2 text-text-light dark:text-text-dark">
              <li className="flex items-center">
                <span className="mr-2">▹</span> Fresh & Deno
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> TypeScript
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> Modern Web Development
              </li>
            </ul>
          </div>
          <div className="bg-secondary-light/10 dark:bg-secondary-dark/10 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Interests
            </h3>
            <ul className="space-y-2 text-text-light dark:text-text-dark">
              <li className="flex items-center">
                <span className="mr-2">▹</span> Open Source
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> CI/CD
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> Machine Learning
              </li>
            </ul>
          </div>
            <div className="bg-secondary-light/10 dark:bg-secondary-dark/10 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Interests
            </h3>
            <ul className="space-y-2 text-text-light dark:text-text-dark">
              <li className="flex items-center">
                <span className="mr-2">▹</span> Open Source
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> CI/CD
              </li>
              <li className="flex items-center">
                <span className="mr-2">▹</span> Machine Learning
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}