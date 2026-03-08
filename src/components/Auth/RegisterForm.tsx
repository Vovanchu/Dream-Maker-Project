/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useTranslation } from "@/hooks/useTranslation";
import { useUser } from "@/hooks/useUser";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff, UserPlus } from "lucide-react";

import type { RegisterData } from "@/types/authData.type";
import { loginUser, registerUser } from "@/api/services/auth";

export const RegisterForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const personTypes = ["child", "elderly", "veteran", "disabled"] as const;

  const schema = z
    .object({
      full_name: z
        .string()
        .min(1, { message: t.validation.requiredName })
        .regex(/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/, {
          message: t.validation.invalidName,
        }),

      email: z
        .string()
        .min(1, { message: t.validation.requiredEmail })
        .email({ message: t.validation.invalidEmail }),

      password: z
        .string()
        .min(8, { message: t.validation.minPassword })
        .refine((val) => /[A-Z]/.test(val), {
          message: t.validation.passwordUppercase,
        })
        .refine((val) => /[a-z]/.test(val), {
          message: t.validation.passwordLowercase,
        })
        .refine((val) => /\d/.test(val), {
          message: t.validation.passwordDigit,
        }),

      confirmPassword: z
        .string()
        .min(8, { message: t.validation.minPassword })
        .refine((val) => /[A-Z]/.test(val), {
          message: t.validation.passwordUppercase,
        })
        .refine((val) => /[a-z]/.test(val), {
          message: t.validation.passwordLowercase,
        })
        .refine((val) => /\d/.test(val), {
          message: t.validation.passwordDigit,
        }),

      person_type: z.enum(personTypes, {
        message: t.validation.requiredPersonType,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.validation.passwordNoMatch,
      path: ["confirmPassword"],
    });

  type RegisterFormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const { confirmPassword, ...rest } = data;

    const registerData: RegisterData = {
      ...rest,
      role: "user",
    };

    try {
      const registerResponse = await registerUser(registerData);

      if (registerResponse.status === 200) {
        const loginResponse = await loginUser({
          email: registerData.email,
          password: registerData.password,
        });

        const { access_token } = loginResponse.data;
        loginAs("user", access_token);
      }
    } catch {
      setError("root", {
        message: t.feedback.errors.somethingWrong,
      });
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="register-name">
                {t.forms.labels.name}
              </FieldLabel>

              <Input
                id="register-name"
                {...register("full_name")}
                placeholder={t.forms.placeholders.name}
              />

              {errors.full_name && (
                <FieldError className="text-red-500">
                  {errors.full_name.message}
                </FieldError>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="register-email">
                {t.forms.labels.email}
              </FieldLabel>

              <Input
                id="register-email"
                type="email"
                {...register("email")}
                placeholder={t.forms.placeholders.email}
              />

              {errors.email && (
                <FieldError className="text-red-500">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="register-password">
                {t.forms.labels.password}
              </FieldLabel>

              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.forms.placeholders.password}
                  {...register("password")}
                  className="pr-10"
                />

                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              <FieldError className="text-red-500">
                {errors.password?.message}
              </FieldError>
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="register-confirm">
                {t.forms.labels.confirmPassword}
              </FieldLabel>

              <div className="relative">
                <Input
                  id="register-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder={t.forms.placeholders.password}
                  {...register("confirmPassword")}
                  className="pr-10"
                />

                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              <FieldError className="text-red-500">
                {errors.confirmPassword?.message}
              </FieldError>
            </Field>

            {/* Person Type */}
            <Field>
              <FieldLabel>{t.pages.register.personType}</FieldLabel>

              <Select
                onValueChange={(value) =>
                  setValue(
                    "person_type",
                    value as RegisterFormFields["person_type"],
                    { shouldValidate: true },
                  )
                }
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder={t.forms.placeholders.category} />
                </SelectTrigger>

                <SelectContent
                  className="
    bg-accent/90
    backdrop-blur-md
    border
    border-border
    shadow-xl
  "
                >
                  <SelectGroup>
                    <SelectItem
                      value="child"
                      className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                    >
                      {t.categories.child}
                    </SelectItem>

                    <SelectItem
                      value="elderly"
                      className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                    >
                      {t.categories.elderly}
                    </SelectItem>

                    <SelectItem
                      value="veteran"
                      className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                    >
                      {t.categories.veteran}
                    </SelectItem>

                    <SelectItem
                      value="disabled"
                      className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                    >
                      {t.categories.disabled}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.person_type && (
                <FieldError className="text-red-500">
                  {errors.person_type.message}
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
              t.pages.register.loading
            ) : (
              <>
                <UserPlus className="mr-2" size={18} />
                {t.forms.buttons.register}
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="cursor-pointer"
          >
            {t.forms.buttons.cancel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
