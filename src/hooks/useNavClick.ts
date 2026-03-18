import { useLocation, useNavigate } from "react-router-dom";

export const useNavClick = (setIsOpen?: (v: boolean) => void) => {
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

<<<<<<< HEAD
=======
    // Викликаємо тільки якщо передали setIsOpen
>>>>>>> 8df88f2 (Add custom hooks for navigation, changed few files in header navigation)
    setIsOpen?.(false);
  };

  return { handleNavClick };
};
