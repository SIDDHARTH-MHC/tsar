import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { Hero } from "@/components/sections/Hero";
import { WhyScent } from "@/components/sections/WhyScent";
import { Industries } from "@/components/sections/Industries";
import { Solutions } from "@/components/sections/Solutions";
import { WhyTsar } from "@/components/sections/WhyTsar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Faqs } from "@/components/sections/Faqs";
import { EnquirySection } from "@/components/sections/EnquirySection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WhyScent />
        <Industries />
        <Solutions />
        <WhyTsar />
        <HowItWorks />
        <Faqs />
        <EnquirySection />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
