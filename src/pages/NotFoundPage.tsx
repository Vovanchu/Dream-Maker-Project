import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-(--background) text-(--foreground) px-4 sm:px-6">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-center">
        404
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-center max-w-md">
        Сторінку не знайдено. Можливо, вона була видалена або URL неправильний.
      </p>
      <Link
        to="/"
        className="px-4 sm:px-6 py-2 sm:py-3 bg-(--secondary) text-(--secondary-foreground) rounded-lg shadow-md hover:opacity-90 transition text-sm sm:text-base"
      >
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
