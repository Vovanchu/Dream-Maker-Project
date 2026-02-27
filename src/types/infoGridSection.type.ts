import type { SvgIconComponent } from "@mui/icons-material";

interface InfoItem {
  icon: SvgIconComponent;
  title: string;
  desc: string;
  value?: string;
}

export interface InfoGridSectionProps {
  title: string;
  subtitle: string;
  steps: InfoItem[];
}
