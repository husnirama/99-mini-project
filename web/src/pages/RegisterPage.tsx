import type { UserRole } from "@/api/types";
import { registerSchema } from "@/validatons/auth.validation";
import { useAuthStore } from "@/store/auth-store";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router";
import { toFormikValidate } from "zod-formik-adapter";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const register = useAuthStore((state) => state.register);
  const defaultRole =
    searchParams.get("role") === "EVENT_ORGANIZER"
      ? "EVENT_ORGANIZER"
      : "CUSTOMER";
  const defaultEmail = searchParams.get("email") ?? "";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: defaultEmail,
      password: "",
      role: defaultRole as UserRole,
      referralCode: "",
    },
    validate: toFormikValidate(registerSchema),
    onSubmit: async (values) => {
      try {
        await register(values);
        setSuccess(true);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  if (success) return <Navigate replace to="/auth/login" />;

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex lg:w-1/2">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1TjcA3DKxa5SvInvfktHNNREHTgpY2v6jJkqoahhwoemmpAmJiYrZapLxQq4JlVR-h-0Dm-6Up09TovB_7sBfxpGVvuJDW22XW-wGBVqQBof3ur4A1axuEZHoFdGWkwUOLrdTPm3td48VN1ZfJ3fu4sRq-ZYbhfrwsZ66lYsTjpW0zb0pD-midY4u6O_fC6oBE7UF5NXCS17asdWAkZH1rDJ_2ItOdDddlzbWbwgsyKxxE81WUbWcbZdQkSmYuymg21axrzAtacTp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/85 to-slate-950/90"></div>
        </div>

        <div className="relative z-10">
          <Link className="flex items-center gap-2" to="/">
            <div className="flex size-8 items-center justify-center text-white">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight">EventHub</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="mb-6 text-5xl font-black leading-tight">
            Unforgettable experiences start with the right audience.
          </h1>
          <p className="text-xl font-medium leading-relaxed text-white/90">
            Register as a customer to discover events, or choose organizer mode
            to start building your own.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm font-medium text-white/70">
          <Link className="hover:text-white" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:text-white" to="/terms">
            Terms of Service
          </Link>
          <Link className="hover:text-white" to="/help">
            Help Center
          </Link>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-background-dark sm:p-12 lg:w-1/2 lg:p-24">
        <div className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Create an Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Join our community of event enthusiasts and organizers.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Join as a
              </p>
              <div className="flex h-12 w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-800/50">
                <label
                  className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-semibold text-slate-500 transition-all has-[:checked]:bg-white has-[:checked]:text-blue-700 has-[:checked]:shadow-sm dark:text-slate-400"
                  htmlFor="customer"
                >
                  <span className="truncate">Customer</span>
                  <input
                    checked={formik.values.role === "CUSTOMER"}
                    className="hidden"
                    id="customer"
                    name="role"
                    onChange={formik.handleChange}
                    type="radio"
                    value="CUSTOMER"
                  />
                </label>
                <label
                  className="flex h-full grow cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 text-sm font-semibold text-slate-500 transition-all has-[:checked]:bg-white has-[:checked]:text-blue-700 has-[:checked]:shadow-sm dark:text-slate-400"
                  htmlFor="organizer"
                >
                  <span className="truncate">Organizer</span>
                  <input
                    checked={formik.values.role === "EVENT_ORGANIZER"}
                    className="hidden"
                    id="organizer"
                    name="role"
                    onChange={formik.handleChange}
                    type="radio"
                    value="EVENT_ORGANIZER"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  placeholder="John Doe"
                  type="text"
                  value={formik.values.name}
                />
                {formik.errors.name ? (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  id="email"
                  onChange={formik.handleChange}
                  placeholder="name@example.com"
                  type="email"
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                ) : null}
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-14 text-slate-900 outline-none transition-all focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                    id="password"
                    onChange={formik.handleChange}
                    placeholder="Min. 6 characters"
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
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Referral Code (Optional)
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  id="referralCode"
                  onChange={formik.handleChange}
                  placeholder="REF-12345"
                  type="text"
                  value={formik.values.referralCode}
                />
                {formik.errors.referralCode ? (
                  <p className="text-sm text-red-500">
                    {formik.errors.referralCode}
                  </p>
                ) : null}
              </label>
            </div>

            <button
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition-all hover:bg-blue-700/90"
              type="submit"
            >
              <span>Sign Up</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>

            <div className="flex flex-col gap-4 text-center">
              <p className="px-4 text-xs text-slate-500 dark:text-slate-400">
                By signing up, you agree to our{" "}
                <Link className="font-medium text-blue-700 hover:underline" to="/terms">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="font-medium text-blue-700 hover:underline"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="my-1 h-px w-full bg-slate-100 dark:bg-slate-800"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link className="font-bold text-blue-700 hover:underline" to="/auth/login">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
