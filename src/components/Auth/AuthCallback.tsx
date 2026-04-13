import { useTranslation } from "@/hooks/useTranslation";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

export const AuthCallback = () => {
  const { login } = useUser();
  const t = useTranslation();
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setShowCookieModal(true);
    } else {
      login();
    }
  }, [login]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieModal(false);
    login();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-accent-foreground-">
      {/* Існуючий контент */}
      <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {t.pages.googleAuth.title}
        </h1>
        <p className="text-gray-600 text-center max-w-xs">
          {t.pages.googleAuth.description}
        </p>
      </div>

      <footer className="absolute bottom-6 text-sm text-gray-500">
        {t.pages.googleAuth.footer.replace(
          "{year}",
          new Date().getFullYear().toString(),
        )}
      </footer>

      {/* Cookie modal */}
      {showCookieModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-6 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              🍪 {t.feedback.cookies.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {t.feedback.cookies.description}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleAcceptCookies}
                className="px-5 py-2 bg-accent text-white rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                {t.feedback.cookies.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
