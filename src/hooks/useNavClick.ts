import { useNavigate } from "react-router-dom";

export const useNavClick = (setIsOpen?: (v: boolean) => void) => {
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    if (path.startsWith("#")) {
      navigate(`/${path}`);
    } else {
      navigate(path);
    }

    setIsOpen?.(false);
  };

  return { handleNavClick };
};
