import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Eye, EyeOff, X } from "lucide-react";
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
import { resetPassword } from "@/api/services/auth";
import Swal from "sweetalert2";
import { useTranslation } from "@/hooks/useTranslation";
import { usePasswordRules } from "@/const/passwordRules";

export const ResetPasswordForm = () => {
  const t = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const Schema = z
    .object({
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
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type TFields = z.infer<typeof Schema>;

  const form = useForm<TFields>({
    resolver: zodResolver(Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<TFields> = async (data) => {
    if (!token) return;

    try {
      await resetPassword({
        token: token,
        new_password: data.password,
      });

      Swal.fire({
        title: "Success",
        text: "Password reset successfully",
        icon: "success",
        confirmButtonText: "Close",
      });

      navigate("/auth/login");

      form.reset();
    } catch {
      form.setError("root", {
        message: "Failed to reset password",
      });

      Swal.fire({
        title: "Error",
        text: "Failed to reset password",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const passwordRules = usePasswordRules();
  const showRules = passwordValue.length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground">
                {t.forms.labels.newPassword}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="text-accent-foreground pr-10"
                    onChange={(e) => {
                      field.onChange(e);
                      setPasswordValue(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-accent-foreground">
                {t.forms.labels.confirmPassword}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    {...field}
                    className="text-accent-foreground pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

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

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {t.pages.reset.title}
          </Button>

          <Button
            variant="outline"
            asChild
            className="text-accent-foreground cursor-pointer"
          >
            <Link to="/auth/login">{t.forms.buttons.login}</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
