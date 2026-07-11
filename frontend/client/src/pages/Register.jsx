import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import Button from "../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // NOTE: backend (user.controller.js) expects "fullName" (capital N)
      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (values.avatar?.[0]) {
        formData.append("avatar", values.avatar[0]);
      }

      if (values.coverImage?.[0]) {
        formData.append("coverImage", values.coverImage[0]);
      }

      await registerUser(formData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-6 py-16">

      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          relative
          z-10
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-3xl
          shadow-2xl
          shadow-black/40
        "
      >
        <h1 className="text-center text-4xl font-black text-white">
          Create Account
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Join the{" "}
          <span className="font-semibold text-indigo-400">
            VIDVERSE
          </span>{" "}
          community.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Avatar picker */}
          <div className="flex justify-center">
            <label className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/15 bg-white/5 transition hover:border-indigo-500/50">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserCircle2
                  size={36}
                  className="text-zinc-500 group-hover:text-indigo-400"
                />
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar", {
                  required: "Avatar is required",
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatarPreview(URL.createObjectURL(file));
                  },
                })}
              />
            </label>
          </div>
          {errors.avatar && (
            <p className="text-center text-sm text-red-400">
              {errors.avatar.message}
            </p>
          )}

          <div>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Full Name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("username", {
                required: "Username is required",
              })}
              placeholder="Username"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
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

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Cover Image <span className="text-zinc-600">(Optional)</span>
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:text-white"
            />
          </div>

          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-8 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
