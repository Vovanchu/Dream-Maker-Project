/* eslint-disable no-useless-escape */
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useTranslation } from "@/hooks/useTranslation";
import { useUser } from "@/hooks/useUser";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Eye, EyeOff, UserPlus, X } from "lucide-react";

import type { RegisterData } from "@/types/authData.type";
import { loginUser, registerUser } from "@/api/services/auth";
import { usePasswordRules } from "@/const/passwordRules";
import axios from "axios";

export const RegisterForm = () => {
  const t = useTranslation();
  const { login } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const RegisterFormSchema = z
    .object({
      full_name: z
        .string()
        .min(1, { message: t.validation.requiredName })
        .regex(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ\s'-]+$/, {
          message: t.validation.invalidName,
        }),
      email: z
        .string()
        .min(1, { message: t.validation.requiredEmail })
        .email({
          pattern:
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
          message: t.validation.invalidEmail,
        }),
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.validation.passwordNoMatch,
      path: ["confirmPassword"],
    });

  type TRegisterFormFields = z.infer<typeof RegisterFormSchema>;

  const form = useForm<TRegisterFormFields>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TRegisterFormFields> = async (data) => {
    const { ...rest } = data;
    const registerData: RegisterData = { ...rest, role: "user" };

    try {
      await registerUser(registerData);

      await loginUser({
        email: registerData.email,
        password: registerData.password,
      });

      login();
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          const errors = error.response?.data?.detail;

          if (Array.isArray(errors)) {
            errors.forEach((err: { loc: (string | number)[]; msg: string }) => {
              const field = err.loc?.[1];

              if (field && field in data) {
                form.setError(field as keyof TRegisterFormFields, {
                  message: err.msg,
                });
              } else {
                form.setError("root", { message: err.msg });
              }
            });
          }
        } else if (status === 401) {
          form.setError("root", {
            message: t.feedback.errors.invalidCredentials,
          });
        } else if (status === 409) {
          form.setError("email", {
            message: t.feedback.errors.emailUsed,
          });
        } else {
          form.setError("root", {
            message: t.feedback.errors.somethingWrong,
          });
        }
      } else {
        form.setError("root", {
          message: t.feedback.errors.somethingWrong,
        });
      }
    }
  };

  const passwordRules = usePasswordRules();
  const showRules = passwordValue.length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.name}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t.forms.placeholders.name}
                  {...field}
                  className="text-accent-foreground"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.email}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t.forms.placeholders.email}
                  {...field}
                  className="text-accent-foreground"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.password}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t.forms.placeholders.password}
                    className="text-accent-foreground pr-10"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPasswordValue(e.target.value);
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.confirmPassword}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder={t.forms.placeholders.password}
                    className="text-accent-foreground pr-10"
                    {...field}
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Password rules */}
        {showRules && (
          <ul className="mt-2 space-y-1">
            {passwordRules.map((rule) => {
              const passed = rule.test(passwordValue);
              return (
                <li
                  key={rule.label}
                  className="flex items-center gap-2 text-xs"
                >
                  {passed ? (
                    <Check size={13} className="text-green-500 shrink-0" />
                  ) : (
                    <X size={13} className="text-red-400 shrink-0" />
                  )}
                  <span
                    className={
                      passed ? "text-green-600" : "text-muted-foreground"
                    }
                  >
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Root error */}
        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting ? (
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
            onClick={() => {
              form.reset();
              setPasswordValue("");
            }}
            className="text-accent-foreground cursor-pointer"
          >
            {t.forms.buttons.cancel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
