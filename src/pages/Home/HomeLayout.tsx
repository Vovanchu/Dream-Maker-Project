import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { HomePage } from "./HomePage";

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
};
