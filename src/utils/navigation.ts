import type { navigationItem } from "@/types/navItems.type";
import type { Translation } from "@/types/translation.type";
import type { UserRole } from "@/types/user.type";

export const getNavItems = (
  t: Translation,
  role: UserRole | null,
): navigationItem[] => {
  const guestNavItems: navigationItem[] = [
    { label: t.nav.howItWorks, path: "#howItWorks" },
    { label: t.nav.dreamCatalog, path: "#dreamCatalog" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  const userNavItems: navigationItem[] = [
    { label: t.nav.myDreams, path: "/user/dreams" },
    { label: t.nav.addDream, path: "/user/add-dream" },
    { label: t.nav.statistics, path: "#statistics" },
  ];

  return role ? userNavItems : guestNavItems;
};
