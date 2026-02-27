import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { InfoGridSectionProps } from "@/types/infoGridSection.type";

export const InfoGridSection = ({
  steps,
  title,
  subtitle,
}: InfoGridSectionProps) => {
  return (
    <section
      id="howItWorks"
      className="bg-[var(--secondary)] py-20 px-6 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        {steps
          .filter((step) => step.value)
          .map((step, index) => (
            <div key={index} className="mb-4">
              <span className="text-sm font-medium text-[var(--primary)] uppercase tracking-wide">
                {step.value}
              </span>
            </div>
          ))}
        <h2 className="text-4xl font-bold text-[var(--foreground)]">{title}</h2>
        <p className="text-[var(--muted-foreground)]">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="
        bg-[var(--card)]
        border border-[var(--border)]
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
            bg-[var(--muted)]
            mb-6
          "
              >
                <step.icon className="h-7 w-7 text-[var(--primary)]" />
              </div>

              <CardTitle className="text-xl font-semibold mb-3 text-[var(--foreground)]">
                {step.title}
              </CardTitle>

              <CardDescription className="text-[var(--muted-foreground)] leading-relaxed">
                {step.desc}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
