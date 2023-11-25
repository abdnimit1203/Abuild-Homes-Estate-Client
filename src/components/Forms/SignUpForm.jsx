import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [showPassword, setShowPassord]= useState(false)

    return (
        <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Pattern"
            src="https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=1259&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link to={'/'}>
              <button className="button button-2 px-5  rounded-xl btn btn-secondary hover:text-white btn-sm">
                Go Home
              </button>
            </Link>

            {/* <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to <br />ABuild Homes Estates
            </h1> */}

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Sign Up
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
            Join our thriving community, where every neighbor is considered family. Stay connected with us for the latest updates, real estate trends, and valuable insights. At ABuild Homes Estates, we dont just sell houses; we facilitate the creation of homes filled with love, laughter, and a lifetime of stories.
            </p>
        

            <form className="mt-8 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="first_name"
              className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="last_name"
              className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
            />
          </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Adress
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full border-0 rounded-md border-gray-200 focus:outline-2 px-3 bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
              </div>

              <div className="col-span-6 relative">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type={showPassword? "text":"password"}
                  id="Password"
                  name="password"
                  className="mt-1 px-3 w-full border-0 rounded-md border-gray-200 focus:outline-2  bg-slate-100 focus:outline-slate-400 text-sm text-gray-700 py-3 shadow-sm"
                />
                <span onClick={()=>setShowPassord(!showPassword)} className="absolute cursor-pointer text-xl top-[55%] right-6">
                  { showPassword? <BsEye/>:
                    <BsEyeSlash/>}
                </span>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button type="submit" className="inline-block shrink-0 rounded-md border border-secondary bg-secondary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-secondary focus:outline-none focus:ring active:text-secondary">
                  Sign Up
                </button>

                
              </div>
              <div className="col-span-4">
              <p className="mt-4 text-base text-gray-500 sm:mt-0 ">
                  Already an user ?
                  <Link to={'/login'} className="text-secondary font-semibold underline  hover:scale-125 transition pl-2">
                    Login
                  </Link>
                  
                </p>
              </div>
             
            </form>
            <div  className="my-10">
                <button type="button" className="flex items-center gap-6 font-semibold bg-slate-100 p-2 px-4 rounded-xl shadow-md hover:scale-110 transition delay-150 hover:shadow-success">
                    <img src="https://i.ibb.co/syGPgLz/google-Logo.png" alt="google"  className="w-12"/> Continue with Google
                </button>
              </div>
          </div>
        </main>
      </div>
    </section>
    );
};

export default SignUpForm;