import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { Link } from "react-router";
import { Navigate } from "react-router";
import { loginSchema } from "@/validatons/auth.validation";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { toast } from "sonner";

export default function LoginPage() {
  const [success, setSuccess] = useState(false);

  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: toFormikValidate(loginSchema),
    onSubmit: async (values) => {
      try {
        await login(values);
        toast.info("Loggin successful");
        setSuccess(true);
      } catch (error) {
        toast.info("Loggin failed");
        console.error(error);
      }
    },
  });

  // async function handleSubmit(event: React.SubmitEvent) {
  //   event.preventDefault();

  //   try {
  //     login({ email, password });
  //     setSuccess(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  if (success) return <Navigate to="/" replace />;
  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-primary">
          <div className="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">event</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">
            EventHub
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Discover
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Events
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Organizers
          </a>
        </nav>
        <div>
          <Link
            to="/auth/register"
            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col gap-2 mb-8 text-center">
              <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold">
                Welcome back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Enter your credentials to access your account
              </p>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    mail
                  </span>
                  <input
                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="name@company.com"
                    type="email"
                    id="email"
                    // required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {
                    <>
                      <br />
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    </>
                  }
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-slate-400 text-xl">
                    lock
                  </span>
                  <input
                    className="w-full pl-11 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    type="password"
                    id="password"
                    // required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {
                    <>
                      <br />
                      <p className="text-red-500 text-sm">
                        {formik.errors.password}
                      </p>
                    </>
                  }
                  <button
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      className="peer h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                      type="checkbox"
                    />
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  className="text-primary text-sm font-semibold hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                type="submit"
              >
                Log In
              </button>
            </form>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg
                  className="w-5 h-5 fill-slate-900 dark:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.05 20.28c-.98.95-2.05 1.72-3.23 1.72-1.15 0-1.52-.7-2.83-.7-1.33 0-1.74.68-2.83.7-1.13 0-2.32-.85-3.32-1.85-2.02-2.02-3.55-5.72-3.55-8.5 0-4.38 2.85-6.7 5.54-6.7 1.43 0 2.5.95 3.37.95s1.95-.95 3.52-.95c1.3 0 3.03.67 4.05 2.12-2.55 1.48-2.12 4.95.43 6.22-1 2.37-2.35 4.98-3.4 5.99zM12.03 5.3c-.02-2.67 2.22-4.93 4.83-5.07.28 2.85-2.48 5.27-4.83 5.07z"></path>
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Apple
                </span>
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?
              <Link
                to={"/auth/register"}
                className="text-primary font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 px-6 text-center text-slate-500 dark:text-slate-500 text-xs border-t border-slate-200 dark:border-slate-800">
        © 2024 Evently Platform. All rights reserved.
        <div className="mt-2 flex justify-center gap-4">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Help Center
          </a>
        </div>
      </footer>
    </>
  );
}
