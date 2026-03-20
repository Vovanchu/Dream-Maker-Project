import { useNavigate, useLocation } from "react-router-dom";

export const useNavigationHandler = (setIsOpen?: (v: boolean) => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: path } });
      } else {
        const el = document.querySelector(path);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }

    setIsOpen?.(false);
  };

  return { handleNavClick };
};
