import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { InfoItem } from "@/types/infoGridSection.type";

export interface InfoGridSectionProps {
  title: string;
  subtitle: string;
  steps: InfoItem[];
}

export const InfoGridSection = ({
  steps,
  title,
  subtitle,
}: InfoGridSectionProps) => {
  return (
    <section
      id={`${steps[0].value ? "statistics" : "howItWorks"}`}
      className="bg-secondary py-20 px-6 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-(--foreground) font-playfair">
          {title}
        </h2>
        <p className="text-(--muted-foreground)">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="
        bg-(--card)
        border border---border)
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all duration-300
        p-8
        text-center
      "
          >
            <CardContent className="flex flex-col items-center">
              {/* Icon circle */}
              <div
                className="
            w-16 h-16
            flex items-center justify-center
            rounded-full
            bg-(--muted)
            mb-6
          "
              >
                <step.icon sx={{ fontSize: 32, color: "var(--primary)" }} />
              </div>

              <CardTitle className="text-xl font-semibold mb-3 text-(--foreground)">
                {step.value}
              </CardTitle>

              <CardTitle
                className={`text-xl font-semibold mb-3 ${
                  step.value ? "text-ring" : "text-(--foreground)"
                }`}
              >
                {step.title}
              </CardTitle>

              <CardDescription className="text-(--muted-foreground) leading-relaxed">
                {step.desc}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
