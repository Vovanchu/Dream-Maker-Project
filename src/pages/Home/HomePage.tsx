import { Hero } from "@/components/Home/Hero";
import { InfoGridSection } from "@/components/Home/InfoGridSection";
import { useTranslation } from "@/hooks/useTranslation";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Cta } from "@/components/Home/Cta";
import type { StatItem, StepItem } from "@/types/statsAndSteps.types";
import { getStats } from "@/api/services/statisticts";
import { useEffect, useState } from "react";

export interface StatsResponse {
  total_users: number;
  completed_dreams_count: number;
  completed_dreams_budget: string;
  unique_cities_count: number;
}

export const HomePage = () => {
  const t = useTranslation();

  const [statsAPI, setStatsAPI] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStatsAPI(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const steps: StepItem[] = [
    {
      icon: AssignmentOutlinedIcon,
      title: t.how.step1.title,
      desc: t.how.step1.desc,
    },
    {
      icon: SearchOutlinedIcon,
      title: t.how.step2.title,
      desc: t.how.step2.desc,
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      title: t.how.step3.title,
      desc: t.how.step3.desc,
    },
    {
      icon: RedeemOutlinedIcon,
      title: t.how.step4.title,
      desc: t.how.step4.desc,
    },
  ];

  const stats: StatItem[] = [
    {
      icon: FavoriteBorderOutlinedIcon,
      title: t.stats.dreams,
      value: statsAPI?.completed_dreams_count.toLocaleString() || "0",
      desc: t.stats.dreamsDesc,
    },
    {
      icon: PeopleAltOutlinedIcon,
      title: t.stats.donors,
      value: statsAPI?.total_users.toLocaleString() || "0",
      desc: t.stats.donorsDesc,
    },
    {
      icon: LocationOnOutlinedIcon,
      title: t.stats.cities,
      value: statsAPI?.unique_cities_count.toLocaleString() || "0",
      desc: t.stats.citiesDesc,
    },
    {
      icon: TrendingUpOutlinedIcon,
      title: t.stats.raised,
      value: statsAPI?.completed_dreams_budget || "0",
      desc: t.stats.raisedDesc,
    },
  ];

  return (
    <>
      <Hero statsAPI={statsAPI} />
      <InfoGridSection
        steps={steps}
        title={t.how.title}
        subtitle={t.how.subtitle}
      />
      <InfoGridSection
        steps={stats}
        title={t.stats.title}
        subtitle={t.stats.subtitle}
      />
      <Cta />
    </>
  );
};
