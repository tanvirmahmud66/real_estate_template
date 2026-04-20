import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import Categories from "@/components/sections/Categories";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import PropertyGrid from "@/components/sections/PropertyGrid";
import Cities from "@/components/sections/Cities";
import Agents from "@/components/sections/Agents";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <Categories />
      <WhyChooseUs />
      <PropertyGrid />
      <Cities />
      <Agents />
      <Testimonials />
    </>
  );
}