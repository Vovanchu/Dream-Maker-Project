import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { loginUser } from "@/api/services/auth";

export const LoginForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: t.validation.requiredEmail })
      .email({ message: t.validation.invalidEmail }),
    password: z.string().min(1, {
      message: t.validation.requiredPassword,
    }),
  });

  type LoginFormFields = z.infer<typeof schema>;
  type UserRole = "user" | "admin";

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
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { access_token } = response.data;

        const role: UserRole = "user";
        loginAs(role, access_token);
      }
    } catch {
      setError("root", {
        message: t.feedback.errors.somethingWrong,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="login-email" className="text-foreground">
                {t.forms.labels.email}
                <sup className="text-red-700 text-sm">*</sup>
              </FieldLabel>

              <Input
                id="login-email"
                type="email"
                {...register("email")}
                placeholder={t.forms.placeholders.email}
                className="text-accent-foreground"
              />

              <FieldError className="text-red-500">
                {errors.email?.message}
              </FieldError>
            </Field>

            <Field>
              <div className="flex flex-row justify-between">
                <FieldLabel
                  htmlFor="login-password"
                  className="text-foreground"
                >
                  {t.forms.labels.password}
                  <sup className="text-red-700 text-sm">*</sup>
                </FieldLabel>

                <FieldLabel className="text-accent">
                  <Link to="/reset-password">
                    {t.pages.login.forgotPassword}
                  </Link>
                </FieldLabel>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={t.forms.placeholders.password}
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

        {errors.root && (
          <FieldError className="text-red-500">
            {errors.root.message}
          </FieldError>
        )}

        <Field orientation="horizontal">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? t.pages.login.loading : t.forms.buttons.submit}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="text-accent-foreground cursor-pointer"
          >
            {t.forms.buttons.cancel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
