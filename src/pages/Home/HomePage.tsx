import Header from "@/components/Header/Header";
import { Hero } from "@/components/Home/Hero";
import { HowItWorks } from "@/components/Home/HowItWorks";

// HomePage.tsxр
export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
      </main>
    </>
  );
};
