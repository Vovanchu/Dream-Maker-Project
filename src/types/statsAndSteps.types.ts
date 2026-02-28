import type { SvgIconComponent } from "@mui/icons-material"; // тип для іконок MUI

export interface StepItem {
  icon: SvgIconComponent;
  title: string;
  desc: string;
}

export interface StatItem {
  icon: SvgIconComponent;
  title: string;
  value: string;
  desc: string;
}
