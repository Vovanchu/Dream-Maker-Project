import { useState } from "react";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const Schema = z
    .object({
      password: z.string().min(6, "Password too short"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
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

      form.reset();
    } catch {
      form.setError("root", {
        message: "Failed to reset password",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Reset Password
          </Button>

          <Button variant="outline" asChild>
            <Link to="/auth/auth/login">Back to login</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
