import { Head } from "$fresh/runtime.ts";
import Navbar from "../../islands/Navbar.tsx";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Head>
        <title>About | My Portfolio</title>
      </Head>
      <main className="min-h-screen bg-background-light dark:bg-background-dark theme-transition">
        {/* Hero Section with Animated Blob */}
        <div className="relative overflow-hidden">
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>

          <div className="relative container mx-auto px-6 py-24">
            <div className="">
              <h1 className="">
                About Me
              </h1>
              <div className="">
                <p className="">
                  Welcome to my digital space! I'm a passionate developer who loves creating beautiful and functional web experiences.
                </p>
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
                  <div className="bg-secondary-light/10 dark:bg-secondary-dark/10 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
                      Interests
                    </h3>
                    <ul className="space-y-2 text-text-light dark:text-text-dark">
                      <li className="flex items-center">
                        <span className="mr-2">▹</span> Open Source
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">▹</span> Web Performance
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">▹</span> UI/UX Design
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}