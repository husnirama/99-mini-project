import { loginSchema } from "@/validatons/auth.validation";
import { useAuthStore } from "@/store/auth-store";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";
import { toFormikValidate } from "zod-formik-adapter";

export default function LoginPage() {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: toFormikValidate(loginSchema),
    onSubmit: async (values) => {
      try {
        const user = await login(values);
        setRedirectPath(
          user.role === "EVENT_ORGANIZER" ? "/organizer/dashboard" : "/",
        );
        toast.success("Login successful");
      } catch (error) {
        console.error(error);
        toast.error("Login failed");
      }
    },
  });

  if (redirectPath) {
    return <Navigate replace to={redirectPath} />;
  }

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-primary">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined">event</span>
          </div>
          <Link to="/">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              EventHub
            </h2>
          </Link>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            to="/"
          >
            Discover
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            to="/"
          >
            Events
          </Link>
          <Link
            className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-400"
            to="/host"
          >
            Organizers
          </Link>
        </nav>
        <Link
          className="flex h-10 min-w-[100px] items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold tracking-wide text-white transition-all hover:bg-primary/90"
          to="/auth/register"
        >
          Sign Up
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="p-8">
            <div className="mb-8 flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter your credentials to access your account
              </p>
            </div>

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                    mail
                  </span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    id="email"
                    onChange={formik.handleChange}
                    placeholder="name@company.com"
                    type="email"
                    value={formik.values.email}
                  />
                </div>
                {formik.errors.email ? (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                    lock
                  </span>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-14 text-slate-900 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    id="password"
                    onChange={formik.handleChange}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 hover:text-primary"
                    onClick={() => setShowPassword((value) => !value)}
                    type="button"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {formik.errors.password ? (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-4 py-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Active sessions stay signed in while the refresh session is
                  valid.
                </p>
                <Link
                  className="text-sm font-semibold text-primary hover:underline"
                  to="/help"
                >
                  Need help?
                </Link>
              </div>

              <button
                className="w-full rounded-lg bg-primary py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98]"
                type="submit"
              >
                Log In
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                className="font-bold text-primary hover:underline"
                to="/auth/register"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 px-6 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        Copyright 2026 EventHub. All rights reserved.
        <div className="mt-2 flex justify-center gap-4">
          <Link className="transition-colors hover:text-primary" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="transition-colors hover:text-primary" to="/terms">
            Terms of Service
          </Link>
          <Link className="transition-colors hover:text-primary" to="/help">
            Help Center
          </Link>
        </div>
      </footer>
    </>
  );
}
