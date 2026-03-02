import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* temporary login */
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/Home");
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C1C3A]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-xl bg-white/5 p-6 border border-white/10"
      >
        <h1 className="mb-6 text-xl font-semibold text-white text-center">
          Login
        </h1>

        <div className="mb-4">
          <label className="block text-sm text-white/70 mb-1">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;