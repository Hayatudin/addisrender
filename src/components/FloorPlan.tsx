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