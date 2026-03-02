export type DreamCategory = "child" | "elderly" | "veteran" | "disabled";
export type DreamFormat = "online" | "offline";

export interface Dream {
  id: string;
  title: string;
  description: string;
  personName: string;
  personAge: number;
  city: string;
  category: DreamCategory;
  format: DreamFormat;
  budgetNeeded: number;
  budgetCollected: number;
  imageUrl: string;
  createdAt: string;
}

export const categoryLabels: Record<DreamCategory, string> = {
  child: "Дитина",
  elderly: "Літня людина",
  veteran: "Ветеран",
  disabled: "Людина з інвалідністю",
};

export const formatLabels: Record<DreamFormat, string> = {
  online: "Онлайн",
  offline: "Офлайн",
};

export const categoryColors: Record<DreamCategory, string> = {
  child: "bg-blue-100 text-blue-800",
  elderly: "bg-green-100 text-green-800",
  veteran: "bg-amber-100 text-amber-800",
  disabled: "bg-rose-100 text-rose-800",
};

export const dreams: Dream[] = [
  {
    id: "1",
    title: "Набір для малювання",
    description:
      "Маленька Оленка мріє про професійний набір для малювання. Вона обожнює малювати і хоче стати художницею.",
    personName: "Оленка",
    personAge: 8,
    city: "Київ",
    category: "child",
    format: "offline",
    budgetNeeded: 2500,
    budgetCollected: 1800,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    title: "Онлайн-курс англійської",
    description:
      "Марія Іванівна хоче вивчити англійську мову, щоб спілкуватися з онуками які живуть за кордоном.",
    personName: "Марія Іванівна",
    personAge: 72,
    city: "Львів",
    category: "elderly",
    format: "online",
    budgetNeeded: 4000,
    budgetCollected: 2200,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    title: "Протез для руки",
    description:
      "Олександр потребує сучасний протез для руки після поранення. Це допоможе йому повернутися до повноцінного життя.",
    personName: "Олександр",
    personAge: 34,
    city: "Харків",
    category: "veteran",
    format: "offline",
    budgetNeeded: 8000,
    budgetCollected: 5500,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-01",
  },
  {
    id: "4",
    title: "Інвалідний візок",
    description:
      "Андрій потребує новий інвалідний візок для пересування містом. Старий вже зношений і незручний.",
    personName: "Андрій",
    personAge: 45,
    city: "Одеса",
    category: "disabled",
    format: "offline",
    budgetNeeded: 6000,
    budgetCollected: 3000,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-05",
  },
  {
    id: "5",
    title: "Підписка на Minecraft",
    description:
      "Дмитрик мріє грати в Minecraft з друзями онлайн. Це допоможе йому соціалізуватися після переїзду.",
    personName: "Дмитрик",
    personAge: 11,
    city: "Дніпро",
    category: "child",
    format: "online",
    budgetNeeded: 1500,
    budgetCollected: 900,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-10",
  },
  {
    id: "6",
    title: "Слуховий апарат",
    description:
      "Петро Васильович потребує новий слуховий апарат. Його старий вже не працює належним чином.",
    personName: "Петро Васильович",
    personAge: 78,
    city: "Запоріжжя",
    category: "elderly",
    format: "offline",
    budgetNeeded: 7000,
    budgetCollected: 4200,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-12",
  },
  {
    id: "7",
    title: "Реабілітаційний курс",
    description:
      "Ігор проходить реабілітацію після поранення і потребує додатковий курс фізіотерапії.",
    personName: "Ігор",
    personAge: 29,
    city: "Вінниця",
    category: "veteran",
    format: "offline",
    budgetNeeded: 9000,
    budgetCollected: 6800,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-15",
  },
  {
    id: "8",
    title: "Планшет для навчання",
    description:
      "Настя не може відвідувати школу через інвалідність і потребує планшет для дистанційного навчання.",
    personName: "Настя",
    personAge: 13,
    city: "Чернігів",
    category: "disabled",
    format: "online",
    budgetNeeded: 5000,
    budgetCollected: 2800,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-18",
  },
  {
    id: "9",
    title: "Велосипед",
    description:
      "Максим мріє про велосипед, щоб їздити до школи та на тренування з футболу.",
    personName: "Максим",
    personAge: 10,
    city: "Полтава",
    category: "child",
    format: "offline",
    budgetNeeded: 3500,
    budgetCollected: 1200,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-20",
  },
  {
    id: "10",
    title: "Онлайн-консультація лікаря",
    description:
      "Галина Петрівна потребує регулярні онлайн-консультації з кардіологом для контролю здоров'я.",
    personName: "Галина Петрівна",
    personAge: 80,
    city: "Тернопіль",
    category: "elderly",
    format: "online",
    budgetNeeded: 3000,
    budgetCollected: 1500,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-22",
  },
  {
    id: "11",
    title: "Ноутбук для перекваліфікації",
    description:
      "Василь хоче опанувати IT-професію після служби. Потребує ноутбук для навчання програмуванню.",
    personName: "Василь",
    personAge: 31,
    city: "Суми",
    category: "veteran",
    format: "online",
    budgetNeeded: 10000,
    budgetCollected: 7500,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-02-25",
  },
  {
    id: "12",
    title: "Спеціальне крісло",
    description:
      "Олена потребує ергономічне спеціальне крісло для роботи вдома через обмеження мобільності.",
    personName: "Олена",
    personAge: 38,
    city: "Рівне",
    category: "disabled",
    format: "offline",
    budgetNeeded: 5500,
    budgetCollected: 3200,
    imageUrl: "@/UI/Photo/backgroung-image.png",
    createdAt: "2026-03-01",
  },
];
