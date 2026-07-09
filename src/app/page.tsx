import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Menu from "@/components/Menu";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Menu />
        <Events />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
