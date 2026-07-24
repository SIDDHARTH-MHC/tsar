import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";

const WhyScent = dynamic(() =>
  import("@/components/sections/WhyScent").then((m) => m.WhyScent),
);
const Science = dynamic(() =>
  import("@/components/sections/Science").then((m) => m.Science),
);
const WhyDarbaar = dynamic(() =>
  import("@/components/sections/WhyDarbaar").then((m) => m.WhyDarbaar),
);
const Industries = dynamic(() =>
  import("@/components/sections/Industries").then((m) => m.Industries),
);
const Solutions = dynamic(() =>
  import("@/components/sections/Solutions").then((m) => m.Solutions),
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((m) => m.HowItWorks),
);
const Clients = dynamic(() =>
  import("@/components/sections/Clients").then((m) => m.Clients),
);
const Faqs = dynamic(() =>
  import("@/components/sections/Faqs").then((m) => m.Faqs),
);
const EnquirySection = dynamic(
  () =>
    import("@/components/sections/EnquirySection").then((m) => m.EnquirySection),
  {
    loading: () => (
      <section
        id="enquiry"
        className="scroll-mt-20 bg-darbaar py-16 sm:py-24"
        aria-busy="true"
      >
        <div className="container-site text-center text-sm text-ivory/50">
          Loading consultation form…
        </div>
      </section>
    ),
  },
);

export default function HomePage() {
  return (
    <MotionProvider>
      <Header />
      <main id="main">
        <Hero />
        <Pillars />
        <WhyScent />
        <Science />
        <WhyDarbaar />
        <Industries />
        <Solutions />
        <HowItWorks />
        <Clients />
        <Faqs />
        <EnquirySection />
      </main>
      <Footer />
      <StickyMobileCta />
      <WhatsAppFab />
    </MotionProvider>
  );
}
