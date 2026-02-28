import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type FormValues = {
  password: string;
  confirmPassword: string;
};

interface PasswordFieldsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export const PasswordFields = ({ register, errors }: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          {...register("confirmPassword")}
          type={showConfirm ? "text" : "password"}
          placeholder="Підтвердження пароля"
          className="pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? "🙈" : "👁️"}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
    </>
  );
};
