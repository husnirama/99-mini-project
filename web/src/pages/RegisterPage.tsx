import type { UserRole } from "@/api/types";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { Navigate, Link } from "react-router";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { registerSchema } from "@/validatons/auth.validation";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);

  const register = useAuthStore((state) => state.register);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as UserRole,
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

  // async function handleSubmit(event: React.SubmitEvent) {
  //   event.preventDefault();
  //   try {
  //     await register({
  //       name,
  //       email,
  //       password,
  //       role,
  //       referralCode: referralCode || undefined,
  //     });
  //     //   return <Navigate to="/auth/login" />;
  //     setSuccess(true);
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //   }
  // }
  if (success) return <Navigate to="/auth/login" replace />;
  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden text-white">
          {/* <!-- Background Image with Overlay --> */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            data-alt="Crowd at a vibrant music festival event"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1TjcA3DKxa5SvInvfktHNNREHTgpY2v6jJkqoahhwoemmpAmJiYrZapLxQq4JlVR-h-0Dm-6Up09TovB_7sBfxpGVvuJDW22XW-wGBVqQBof3ur4A1axuEZHoFdGWkwUOLrdTPm3td48VN1ZfJ3fu4sRq-ZYbhfrwsZ66lYsTjpW0zb0pD-midY4u6O_fC6oBE7UF5NXCS17asdWAkZH1rDJ_2ItOdDddlzbWbwgsyKxxE81WUbWcbZdQkSmYuymg21axrzAtacTp')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2424eb]/80 to-[#111121]/90"></div>
          </div>
          {/* <!-- Content --> */}
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <div className="size-8 text-white">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight">
                EventHub
              </span>
            </div>
          </div>
          <div className="relative z-10 max-w-lg">
            <h1 className="text-5xl font-black leading-tight mb-6">
              Unforgettable experiences await you.
            </h1>
            <p className="text-xl font-medium text-white/90 italic leading-relaxed">
              "The best way to experience life is through shared moments that
              stay with you forever."
            </p>
          </div>
          <div className="relative z-10 flex gap-4 text-sm font-medium text-white/70">
            <span>© 2024 Evently Inc.</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
        {/* <!-- Right Side: Registration Form --> */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white dark:bg-background-dark">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            {/* <!-- Header --> */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Create an Account
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Join our community of event enthusiasts and organizers.
              </p>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* <!-- Role Selector --> */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Join as a
                </p>
                <div className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/50 p-1 border border-slate-200 dark:border-slate-800">
                  <label
                    htmlFor="customer"
                    className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 transition-all has-[:checked]:bg-white has-[:checked]:shadow-sm has-[:checked]:text-[#2424eb] text-slate-500 dark:text-slate-400 text-sm font-semibold"
                  >
                    <span className="truncate">Customer</span>
                    <input
                      id="customer"
                      className="hidden"
                      name="role"
                      type="radio"
                      value="CUSTOMER"
                      checked={formik.values.role === "CUSTOMER"}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label
                    htmlFor="organizer"
                    className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 transition-all has-[:checked]:bg-white has-[:checked]:shadow-sm has-[:checked]:text-[#2424eb] text-slate-500 dark:text-slate-400 text-sm font-semibold"
                  >
                    <span className="truncate">Organizer</span>
                    <input
                      id="organizer"
                      className="hidden"
                      name="role"
                      type="radio"
                      value="EVENT_ORGANIZER"
                      checked={formik.values.role === "EVENT_ORGANIZER"}
                      onChange={formik.handleChange}
                    />
                  </label>
                </div>
              </div>
              {/* <!-- Input Fields --> */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      person
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-#2424eb focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                      placeholder="John Doe"
                      type="text"
                      id="name"
                      // required
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {
                      <p className="text-red-500 text-sm">
                        {formik.errors.name}
                      </p>
                    }
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      mail
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-#2424eb focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                      placeholder="name@example.com"
                      type="email"
                      id="email"
                      // required
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {
                      <p className="text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    }
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      lock
                    </span>
                    <input
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-#2424eb focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                      placeholder="Min. 8 characters"
                      type="password"
                      id="password"
                      value={formik.values.password}
                      required
                      onChange={formik.handleChange}
                    />
                    {
                      <p className="text-red-500 text-sm">
                        {formik.errors.password}
                      </p>
                    }
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="referralCode"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      confirmation_number
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-#2424eb focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                      placeholder="REF-12345"
                      type="text"
                      id="referralCode"
                      value={formik.values.referralCode}
                      onChange={formik.handleChange}
                    />
                    {
                      <p className="text-red-500 text-sm">
                        {formik.errors.referralCode}
                      </p>
                    }
                  </div>
                </div>
              </div>
              {/* <!-- Action Button --> */}
              <button
                className="w-full bg-[#2424eb] hover:bg-[#2424eb]/90 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-[#2424eb]/20 flex items-center justify-center gap-2 mt-2"
                type="submit"
              >
                <span>Sign Up</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
              {/* <!-- Footer Links --> */}
              <div className="flex flex-col gap-4 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
                  By signing up, you agree to our
                  <a
                    className="text-#2424eb hover:underline font-medium"
                    href="#"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    className="text-#2424eb hover:underline font-medium"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full my-1"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?
                  <Link
                    to="/auth/login"
                    className="text-#2424eb hover:underline font-bold"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
