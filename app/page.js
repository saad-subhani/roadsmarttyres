import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import StatsCounter from "@/components/StatsCounter/StatsCounter";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import TyreProducts from "@/components/TyreProducts/TyreProducts";
import CarNeeds from "@/components/CarNeeds/CarNeeds";
import Testimonials from "@/components/Testimonials/Testimonials";
import Discount from "@/components/Discount/Discount";
import Footer from "@/components/Footer/Footer";
import { getCmsContent } from "@/lib/cms";

export default async function Home() {
  const content = await getCmsContent();

  return (
    <main>
      <Header activePage="home" />
      <div className="hero-boundary">
        <video
          className="hero-boundary-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
        <Hero />
        <section className="stats-section" aria-label="Road Smart Tyre statistics">
          <StatsCounter />
        </section>
      </div>
      <WhyChooseUs />
      <About />
      <Services />
      <TyreProducts />
      <CarNeeds />
      <Testimonials reviews={content?.reviews} />
      <Discount />
      <Footer />
    </main>
  );
}
