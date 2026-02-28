import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PasswordFields } from "./PasswordFiled";

const registerSchema = z
  .object({
    name: z.string().min(1, "Ім'я обов'язкове"),
    email: z.string().email("Невірний формат пошти"),
    password: z.string().min(6, "Пароль має бути щонайменше 6 символів"),
    confirmPassword: z.string().min(6, "Підтвердження пароля обов'язкове"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароль і підтвердження не збігаються",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input {...register("name")} placeholder="Ім'я" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register("email")} placeholder="Пошта" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <PasswordFields register={register} errors={errors} />

      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Зареєструватися
      </button>
    </form>
  );
};
