export const passwordRules = [
  { label: "Мінімум 8 символів", test: (v: string) => v.length >= 8 },
  { label: "Велика літера", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Мала літера", test: (v: string) => /[a-z]/.test(v) },
  { label: "Цифра", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "Спецсимвол (!@#$...)",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];
