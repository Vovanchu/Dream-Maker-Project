import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admin, user } from "@/const/Role";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: t.login.errors.requiredEmail })
      .email({ message: t.login.errors.invalidEmail }),
    password: z.string().min(1, {
      message: t.login.errors.requiredPassword,
    }),
  });

  type LoginFormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (data.email === admin.email && data.password === admin.password) {
      loginAs("admin");
      return;
    }

    if (data.email === user.email && data.password === user.password) {
      loginAs("user");
      return;
    }

    setError("root", {
      message: t.login.errors.invalidCredentials,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="login-email" className="text-foreground">
                {t.login.email}
                <sup className="text-red-700 text-sm">*</sup>
              </FieldLabel>

              <Input
                id="login-email"
                type="email"
                {...register("email")}
                placeholder="test@gmail.com"
                className="text-accent-foreground"
              />

              {errors.email && (
                <FieldError className="text-red-500">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <div className="flex flex-row justify-between">
                <FieldLabel
                  htmlFor="login-password"
                  className="text-foreground"
                >
                  {t.login.password}
                  <sup className="text-red-700 text-sm">*</sup>
                </FieldLabel>

                <FieldLabel className="text-accent">
                  <Link to="/reset-passwor">{t.login.forgotPassword}</Link>
                </FieldLabel>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="text-accent-foreground pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <FieldError className="text-red-500">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        {/* Root error */}
        {errors.root && <FieldError>{errors.root.message}</FieldError>}

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? t.login.loading : t.login.submit}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="text-accent-foreground cursor-pointer"
          >
            {t.login.cancel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
