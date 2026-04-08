import { useTranslation } from "@/hooks/useTranslation";

export const usePasswordRules = () => {
  const t = useTranslation();

  const passwordRules = [
    { label: t.validation.minPassword, test: (v: string) => v.length >= 8 },
    {
      label: t.validation.passwordUppercase,
      test: (v: string) => /[A-Z]/.test(v),
    },
    {
      label: t.validation.passwordLowercase,
      test: (v: string) => /[a-z]/.test(v),
    },
    { label: t.validation.passwordDigit, test: (v: string) => /[0-9]/.test(v) },
    {
      label: t.validation.passwordSpecialChar,
      test: (v: string) => /[^A-Za-z0-9]/.test(v),
    },
  ];

  return passwordRules;
};
