/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { forgotPassword } from "@/api/services/auth";
import Swal from "sweetalert2";

const createForgotPasswordSchema = (t: any) =>
  z.object({
    email: z
      .string({ message: t.validation.requiredEmail })
      .email({ message: t.validation.invalidEmail }),
  });

export const ForgotPasswordForm = () => {
  const t = useTranslation();

  const Schema = createForgotPasswordSchema(t);

  type TFields = z.infer<typeof Schema>;

  const form = useForm<TFields>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<TFields> = async (data) => {
    try {
      await forgotPassword({ email: data.email });
      form.reset();

      Swal.fire({
        title: t.feedback.success.emailSent,
        text: t.feedback.info.confirmEmail,
        icon: "success",
        confirmButtonText: t.forms.buttons.close,
      });
    } catch {
      form.setError("root", {
        message: t.feedback.errors.somethingWrong,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                {t.forms.labels.email}
                <sup className="text-red-700">*</sup>
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

        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting
              ? t.pages.reset.loading
              : t.forms.buttons.submit}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              form.reset({
                email: "",
              })
            }
            className="text-accent-foreground cursor-pointer"
          >
            {t.forms.buttons.cancel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
