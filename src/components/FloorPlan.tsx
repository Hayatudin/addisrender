import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const FloorPlan = () => {
  const [activePlan, setActivePlan] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const floorPlans = [
    {
      id: 1,
      name: "Family Floor Plan",
      image: "/lovable-uploads/d5bd389e-8e51-4b99-9b1f-2883a20906c8.png",
      details: {
        size: "1,850 sq ft",
        bedrooms: 3,
        bathrooms: 3,
        features: ["Courtyard", "Open dining area", "Large kitchen", "Car porch"]
      }
    },
    {
      id: 2,
      name: "Modern Apartment Complex",
      image: "/lovable-uploads/6ebcd945-e510-44db-9cdd-557c69baa4c0.png",
      details: {
        size: "1,702 - 1,753 sq ft",
        bedrooms: 2,
        bathrooms: 2,
        features: ["Multiple units per floor", "Central elevator system", "Balconies", "Dining areas"]
      }
    },
    {
      id: 3,
      name: "Compact Dual Apartment",
      image: "/lovable-uploads/9426f94f-7b6c-4ab2-8fb2-b8cb9713b31a.png",
      details: {
        size: "1,102 sq ft per unit",
        bedrooms: 2,
        bathrooms: 1,
        features: ["Mirrored layout", "Shared entrance lobby", "Dedicated parking", "Balconies"]
      }
    },
    {
      id: 4,
      name: "Exclusive Villa Layout",
      image: "/lovable-uploads/1f8381eb-7c2c-41a5-b4b8-6a419be2009d.png",
      details: {
        size: "3,200 sq ft",
        bedrooms: 4,
        bathrooms: 4,
        features: ["Infinity pool", "Deck area", "Courtyard garden entry", "Great room"]
      }
    },
    {
      id: 5,
      name: "Garden Residence",
      image: "/lovable-uploads/4c629bb8-3b6a-43e6-82a3-2916f63cff06.png",
      details: {
        size: "2,400 sq ft",
        bedrooms: 4,
        bathrooms: 3,
        features: ["Landscape garden", "Outdoor entertainment areas", "Prayer room", "Wooden deck"]
      }
    },
    {
      id: 6,
      name: "Dual Family Residence",
      image: "/lovable-uploads/708c082a-041a-44e6-a675-914743362373.png",
      details: {
        size: "2,200 sq ft",
        bedrooms: 6,
        bathrooms: 4,
        features: ["Dual family layout", "Multiple balconies", "Central staircase", "Corner unit design"]
      }
    },
    {
      id: 7,
      name: "Compact Family Home",
      image: "/lovable-uploads/2492b1e1-297f-4c2c-978e-d367d1ecdbbd.png",
      details: {
        size: "1,400 sq ft",
        bedrooms: 2,
        bathrooms: 2,
        features: ["Pooja room", "Shop space", "Dressing area", "Utility wash"]
      }
    },
    {
      id: 8,
      name: "Contemporary Apartment",
      image: "/lovable-uploads/8ce5eae6-378c-40f3-b5ac-2398c08e1eb1.png",
      details: {
        size: "1,500 sq ft",
        bedrooms: 3,
        bathrooms: 2,
        features: ["Open plan living", "Private garden", "Walk-in wardrobe", "Separate dining"]
      }
    },
    {
      id: 9,
      name: "Dual Apartment Complex",
      image: "/lovable-uploads/38890f52-7d43-458a-bb60-c3d76426d026.png",
      details: {
        size: "1,300 sq ft per unit",
        bedrooms: 2,
        bathrooms: 2,
        features: ["Mirror layout design", "Central lift area", "Large living spaces", "Dining areas"]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlan((prev) => (prev + 1) % floorPlans.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [floorPlans.length]);

  const handlePrevious = () => {
    setActivePlan((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePlan((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(prev => prev + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(prev => prev - 0.1);
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const currentPlan = floorPlans[activePlan];

  return (
    <section id="floor-plans" className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="md:max-w-md mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Plan Rendering</h2>
            <div className="glass-card p-5 backdrop-blur-md bg-white/70">
              <p className="text-gray-700">
                Explore our high-quality floor plan renderings, designed to bring architectural concepts to 
                life with precision and clarity.
              </p>
            </div>
            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            </div>
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white mt-6 rounded-full py-2 px-6"
            >
              <Link to="/services">View More Plans</Link>
            </Button>
          </div>
          
          <div className="md:max-w-2xl w-full">
            <div className="bg-white rounded-xl shadow-lg p-4 relative">
              <div className="relative overflow-hidden rounded-lg h-[350px] md:h-[400px] flex items-center justify-center">
                <div className="absolute inset-0">
                  {floorPlans.map((plan, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === activePlan ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img 
                        src={plan.image} 
                        alt={plan.name}
                        className="w-full h-full object-contain"
                        style={{ transform: `scale(${zoomLevel})` }}
                      />
                    </div>
                  ))}
                </div>