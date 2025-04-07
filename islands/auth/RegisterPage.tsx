import { useEffect, useState } from "preact/hooks";
import axiod from "https://deno.land/x/axiod/mod.ts";

const RegisterPage = () => {
    const [userData, setUserData] = useState({ 
        username: "", 
        email: "",
        password: ""
    });

    const submitHandler = async () => {
        try{
            const response = await axiod.post("/api/auth/register", userData);
            if(response.status === 201){
                console.log("User registered successfully");
                globalThis.location.href = "/login";
            }
        }catch(err){
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark theme-transition overflow-hidden">
        <div className="relative w-full max-w-md p-8">
          <div className="absolute inset-0 animate-blob mix-blend-multiply filter blur-xl opacity-70 dark:opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-light dark:bg-primary-dark rounded-full animate-blob-spin" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary-light dark:bg-secondary-dark rounded-full animate-blob-spin animation-delay-2000" />
            <div className="absolute -top-8 -right-4 w-72 h-72 bg-accent-light dark:bg-accent-dark rounded-full animate-blob-spin animation-delay-4000" />
          </div>
  
          <form className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-on-scroll opacity-0 translate-y-8">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-primary-light dark:text-primary-dark mb-2 font-display">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">Please sign in to continue</p>
            </div>
  
            <div className="space-y-6">
              <div className="animate-on-scroll opacity-0 translate-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300 ease-in-out"
                  placeholder="Enter your username"
                  required
                  value={userData.username} onChange={(e:any) => setUserData({ ...userData, username: e.target.value })}
                />
              </div>
  
              <div className="animate-on-scroll opacity-0 translate-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300 ease-in-out"
                  placeholder="Enter your email"
                  required
                  value={userData.email} onChange={(e:any) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
  

              <div className="animate-on-scroll opacity-0 translate-y-4 animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-all duration-300 ease-in-out"
                  placeholder="Enter your password"
                  required
                  value={userData.password} onChange={(e:any) => setUserData({ ...userData, password: e.target.value })}
                />
              </div>
  
              <div className="flex items-center justify-between animate-on-scroll opacity-0 translate-y-4 animation-delay-400">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
              </div>
  
              <button
                type="submit"
                onClick={submitHandler}
                className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transform hover:scale-[1.02] transition-all duration-300 ease-in-out animate-on-scroll opacity-0 translate-y-4 animation-delay-600"
              >
                Sign Up
              </button>
  
            </div>
          </form>
        </div>
      </div>
    );
}

export default RegisterPage