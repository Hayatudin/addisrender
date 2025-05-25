
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Building2, Home, Palette, PenTool, TreePine, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-rend-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Our Services</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Professional 3D modeling and rendering services tailored to your specific needs.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="section-heading mx-auto">What We Offer</h2>
              <p className="text-gray-600">
                At Rend-Plus, we provide comprehensive 3D modeling and rendering services 
                to help visualize architectural and design concepts with stunning clarity and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-16">
              <ServiceSection 
                icon={<Palette className="h-12 w-12" />}
                title="For Interior Designers"
                imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                imageAlt="Interior Design Rendering"
                benefits={[
                  "Photorealistic interior renderings",
                  "Virtual tours of designed spaces",
                  "3D floor plans with detailed finishes",
                  "Video walkthroughs for client presentations",
                  "Material and furniture visualization"
                ]}
              />
