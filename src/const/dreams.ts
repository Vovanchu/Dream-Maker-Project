import type { FormatType } from "@/components/User/components/Filter";
import type { Dream } from "@/types/dreams.type";

const sampleTitles = [
  "Подорож до Японії",
  "Відкрити власну кав’ярню",
  "Навчитися грати на гітарі",
  "Пройти марафон",
  "Вивчити французьку",
  "Створити ігровий додаток",
  "Зробити документальний фільм",
  "Відвідати всі континенти",
  "Провести благодійний концерт",
  "Написати книгу",
];

const sampleDescriptions = [
  "Ця мрія дуже важлива для мене, хочу реалізувати її протягом року.",
  "Мрію про це з дитинства, готовий докладати максимум зусиль.",
  "Ціль: покращити свої навички та здобути новий досвід.",
  "Планую організувати проєкт та залучити друзів.",
  "Ця мрія поєднує мої хобі та професійні інтереси.",
];

const sampleImages = [
  "https://picsum.photos/seed/1/400/300",
  "https://picsum.photos/seed/2/400/300",
  "https://picsum.photos/seed/3/400/300",
  "https://picsum.photos/seed/4/400/300",
  "https://picsum.photos/seed/5/400/300",
];

const participationFormats: FormatType[] = ["all", "online", "offline"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBool() {
  return Math.random() < 0.5;
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();
}

export const dreams: Dream[] = Array.from({ length: 100 }, (_, i) => ({
  dream_id: `dream_${i + 1}`,
  dreamer_id: `user_${randomInt(1, 50)}`, // випадковий користувач
  title: sampleTitles[randomInt(0, sampleTitles.length - 1)],
  description: sampleDescriptions[randomInt(0, sampleDescriptions.length - 1)],
  image: sampleImages[randomInt(0, sampleImages.length - 1)],
  participationFormat: participationFormats[randomInt(0, 2)],
  target_budget: parseFloat((randomInt(500, 10000) + Math.random()).toFixed(2)),
  isCompleted: randomBool(),
  createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  updatedAt: randomDate(new Date(2022, 0, 1), new Date()),
}));
