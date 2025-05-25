
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

              <ServiceSection 
                icon={<Building2 className="h-12 w-12" />}
                title="For Architects"
                imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                imageAlt="Architectural Rendering"
                benefits={[
                  "Exterior renderings with precise detailing",
                  "Building massing and concept models",
                  "Site context and environmental integration",
                  "Aerial perspectives and bird's eye views",
                  "Daylight and shadow studies"
                ]}
                reversed
              />

              <ServiceSection 
                icon={<TreePine className="h-12 w-12" />}
                title="For Landscape Designers"
                imageSrc="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
                imageAlt="Landscape Design Rendering"
                benefits={[
                  "Realistic landscape visualizations",
                  "Garden and outdoor space renderings",
                  "Seasonal variations of landscape designs",
                  "Water feature and hardscape elements",
                  "Growth progression visualization"
                ]}
              />

              <ServiceSection 
                icon={<Home className="h-12 w-12" />}
                title="For Furniture Manufacturers"
                imageSrc="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                imageAlt="Furniture Rendering"
                benefits={[
                  "High-quality furniture product renderings",
                  "Material variations and customization options",
                  "360° views for interactive product displays",
                  "Lifestyle context renderings",
                  "AR-ready 3D models for customer visualization"
                ]}
                reversed
              />

              <ServiceSection 
                icon={<Briefcase className="h-12 w-12" />}
                title="For Commercial Brands"
                imageSrc="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                imageAlt="Product Rendering"
                benefits={[
                  "Product visualization for marketing materials",
                  "Packaging design renderings",
                  "Trade show and display visualizations",
                  "Brand environment and retail space modeling",
                  "Animation for product demonstrations"
                ]}
              />