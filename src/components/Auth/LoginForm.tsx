import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "@/hooks/useTranslation";
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
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import { loginUser } from "@/api/services/auth";
import { passwordRules } from "@/const/passwordRules";

export const LoginForm = () => {
  const t = useTranslation();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const LoginFormSchema = z.object({
    email: z
      .string({ message: t.validation.requiredEmail })
      .email({ message: t.validation.invalidEmail }),
    password: z.string().min(1, {
      message: t.validation.requiredPassword,
    }),
  });

  type TLoginFormFields = z.infer<typeof LoginFormSchema>;

  const form = useForm<TLoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<TLoginFormFields> = async (data) => {
    try {
      await loginUser({ email: data.email, password: data.password });
      login();
    } catch {
      form.setError("root", { message: t.feedback.errors.somethingWrong });
    }
  };

  const showRules = passwordValue.length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.email}
                <sup className="text-red-700 text-sm">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  id="login-email"
                  type="email"
                  placeholder={t.forms.placeholders.email}
                  className="text-accent-foreground"
                  {...field}
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
              <div className="flex flex-row justify-between">
                <FormLabel className="text-foreground">
                  {t.forms.labels.password}
                  <sup className="text-red-700 text-sm">*</sup>
                </FormLabel>
                <span className="text-accent text-sm">
                  <Link to="/auth/forgotPassword">
                    {t.pages.login.forgotPassword}
                  </Link>
                </span>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.forms.placeholders.password}
                    className="text-accent-foreground pr-10"
                    {...field}
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
                          <Check
                            size={13}
                            className="text-green-500 shrink-0"
                          />
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

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Root error */}
        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-row gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting
              ? t.pages.login.loading
              : t.forms.buttons.submit}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset({ email: "", password: "" });
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
