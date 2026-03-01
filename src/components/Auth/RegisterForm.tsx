import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { admin, user } from "@/const/Role";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "@/hooks/useTranslation";
import { UserPlus } from "lucide-react";

export const RegisterForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();

  const schema = z
    .object({
      name: z
        .string()
        .min(1, { message: t.register.invalidName })
        .regex(/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/, {
          message: t.register.invalidName,
        }),
      email: z
        .string()
        .email({ message: t.register.emailErrors.invalid })
        .min(1, { message: t.register.emailErrors.required }),
      password: z.string().min(8, { message: t.register.pw.minLength }),
      confirmPassword: z.string().min(8, { message: t.register.pw.minLength }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Паролі не співпадають",
      path: ["confirmPassword"],
    });

  type RegisterFormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      if (admin.email === data.email && data.password === admin.password) {
        loginAs("admin");
      } else if (user.email === data.email && data.password === user.password) {
        setError("root", { message: t.register.emailErrors.alreadyUsed });
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
      {/* Name */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t.register.name}
        </label>
        <input
          id="name"
          {...register("name")}
          type="text"
          placeholder={t.register.name}
          className={`w-full rounded-md border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition ${
            errors.name ? "border-red-500 focus:ring-red-500" : "border-border"
          }`}
        />
        {errors.name && (
          <span className="text-red-600 text-xs">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t.register.email}
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder={t.register.email}
          className={`w-full rounded-md border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-border"
          }`}
        />
        {errors.email && (
          <span className="text-red-600 text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 w-full relative">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          {t.register.password}
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          placeholder={t.register.password}
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

      {/* Confirm password */}
      <div className="flex flex-col gap-1 w-full relative">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground"
        >
          {t.register.confirmPassword}
        </label>
        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
          placeholder={t.register.confirmPlaceholder}
          className={`w-full rounded-md border px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-border"
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 text-xs">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white py-2 rounded-md font-medium text-sm hover:bg-button-hover disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Loading..."
        ) : (
          <>
            <UserPlus /> {t.register.submit}
          </>
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
