import { useTranslation } from "@/hooks/useTranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";

export const HowItWorks = () => {
  const t = useTranslation();

  const steps = [
    {
      title: t.how.step1.title,
      desc: t.how.step1.desc,
      icon: AssignmentOutlinedIcon,
    },
    {
      title: t.how.step2.title,
      desc: t.how.step2.desc,
      icon: SearchOutlinedIcon,
    },
    {
      title: t.how.step3.title,
      desc: t.how.step3.desc,
      icon: FavoriteBorderOutlinedIcon,
    },
    {
      title: t.how.step4.title,
      desc: t.how.step4.desc,
      icon: RedeemOutlinedIcon,
    },
  ];

  return (
    <section id="howItWorks" className="bg-[var(--secondary)] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[var(--foreground)]">
          {t.how.title}
        </h2>
        <p className="text-[var(--muted-foreground)]">{t.how.subtitle}</p>
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
