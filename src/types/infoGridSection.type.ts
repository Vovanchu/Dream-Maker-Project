import type { SvgIconComponent } from "@mui/icons-material";

export interface InfoItem {
  icon: SvgIconComponent;
  title: string;
  desc: string;
  value?: string;
}
