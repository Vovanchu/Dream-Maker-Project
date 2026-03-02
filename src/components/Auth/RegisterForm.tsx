import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { admin } from "@/const/Role";
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
import { Eye, EyeOff, UserPlus } from "lucide-react";

export const RegisterForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        .min(1, { message: t.register.emailErrors.required })
        .email({ message: t.register.emailErrors.invalid }),
      password: z.string().min(8, { message: t.register.pw.minLength }),
      confirmPassword: z.string().min(8, { message: t.register.pw.minLength }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.register.pw.noMatch,
      path: ["confirmPassword"],
    });

  type RegisterFormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (data.email === admin.email) {
        setError("root", {
          message: t.register.emailErrors.alreadyUsed,
        });
        return;
      }

      loginAs("user");
    } catch {
      setError("root", {
        message: t.register.somethingWrong,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel
                htmlFor="register-name"
                className="text-accent-foreground"
              >
                {t.register.name}
              </FieldLabel>
              <Input
                id="register-name"
                {...register("name")}
                placeholder={t.register.name}
                className="text-accent-foreground"
              />
              {errors.name && (
                <FieldError className="text-red-500">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel
                className="text-accent-foreground"
                htmlFor="register-email"
              >
                {t.register.email}
              </FieldLabel>
              <Input
                id="register-email"
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

            {/* Password */}
            <Field>
              <FieldLabel
                className="text-accent-foreground"
                htmlFor="register-password"
              >
                {t.register.password}
              </FieldLabel>

              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="text-accent-foreground pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground cursor-pointer"
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

            {/* Confirm Password */}
            <Field>
              <FieldLabel
                className="text-accent-foreground"
                htmlFor="register-confirm"
              >
                {t.register.confirmPassword}
              </FieldLabel>

              <div className="relative">
                <Input
                  id="register-confirm"
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="text-accent-foreground pr-10"
                />

                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-foreground"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              {errors.confirmPassword && (
                <FieldError className="text-red-500">
                  {errors.confirmPassword.message}
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
            {isSubmitting ? (
              t.register.loading
            ) : (
              <>
                <UserPlus className="mr-2" size={18} />
                {t.register.submit}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="text-accent-foreground cursor-pointer"
          >
            {t.register.cancel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
