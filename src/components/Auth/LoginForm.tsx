import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { admin, user } from "@/const/Role";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "@/hooks/useTranslation";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (admin.email === data.email && data.password === admin.password) {
        loginAs("admin");
      } else if (user.email === data.email && data.password === user.password) {
        loginAs("user");
      } else {
        setError("root", { message: "Invalid credentials" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Something went wrong" });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t.login.email}
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder={t.login.email}
          className={`w-full  rounded-md border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-border"
          }`}
        />
        {errors.email && (
          <span className="text-red-600 text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 w-full relative">
        <div className="flex flex-row justify-between text-sm font-medium text-foreground">
          <label htmlFor="password">{t.login.password}</label>
          <Link
            to="/reset-password"
            className="text-accent hover:text-button-hover transition duration-150"
          >
            {t.login.forgotPassword}
          </Link>
        </div>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder={t.login.password}
          className={`w-full rounded-md border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-border"
          }`}
        />
        {errors.password && (
          <span className="text-red-600 text-xs">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white py-2 rounded-md font-medium text-sm hover:bg-button-hover disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
      >
        {isSubmitting ? (
          "Loading..."
        ) : (
          <span className="flex items-center justify-center gap-2">
            <LogIn />
            {t.login.submit}
          </span>
        )}
      </button>

      {/* Root error */}
      {errors.root && (
        <div className="text-red-600 text-sm text-center mt-1">
          {errors.root.message}
        </div>
      )}
    </form>
  );
};
