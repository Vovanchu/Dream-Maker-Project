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
import { getPersonsType } from "@/const/personTypes";

export const RegisterForm = () => {
  const t = useTranslation();
  const { loginAs } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      person_type: z
        .string()
        .min(1, { message: t.pages.addDream.categoryRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.validation.passwordNoMatch,
      path: ["confirmPassword"],
    });

  type RegisterFormFields = z.infer<typeof schema>;

  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      person_type: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    const { ...rest } = data;
    const registerData: RegisterData = { ...rest, role: "user" };

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
      form.setError("root", { message: t.feedback.errors.somethingWrong });
    } finally {
      form.reset();
    }
  };

  const persons_type = getPersonsType(t);

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
                <Input placeholder={t.forms.placeholders.name} {...field} />
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
                    className="pr-10"
                    {...field}
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
                    className="pr-10"
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

        {/* Person Type */}
        <FormField
          control={form.control}
          name="person_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.pages.register.personType}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder={t.forms.placeholders.category} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-accent/90 backdrop-blur-md border border-border shadow-xl">
                  <SelectGroup>
                    {persons_type.map((person_type, index) => (
                      <SelectItem
                        key={index}
                        value={person_type.value}
                        className="cursor-pointer hover:bg-accent-foreground/10 focus:bg-accent-foreground/10"
                      >
                        {person_type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            onClick={() => form.reset()}
            className="text-accent-foreground cursor-pointer"
          >
            {t.forms.buttons.cancel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
