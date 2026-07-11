import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      await login(values);

      toast.success("Welcome back!");

      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6">
      {/* Background Glow */}
      <div className="absolute -left-44 top-0 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[180px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-3xl"
      >
        <h1 className="text-center text-4xl font-black text-white">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Login to continue to{" "}
          <span className="font-semibold text-indigo-400">
            VIDVERSE
          </span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;