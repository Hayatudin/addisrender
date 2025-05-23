
import { ArrowUpRight, ArrowRight, Filter, Sparkles, Award, Layers } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PortfolioGrid from "@/components/PortfolioGrid";
import { Category, WorkItem } from "@/components/PortfolioItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "newest" | "oldest" | "featured";

const workItems: WorkItem[] = [
  {
    id: "modern-apartment",
    title: "Modern Luxury Apartment",
    category: "residential",
    description: "Contemporary multi-level apartment design with balconies and clean facade in urban setting.",
    client: "Urban Development Group",
    image: "/lovable-uploads/6dc34976-ef88-4e06-9947-78dce20764db.png",
    year: "2023",
    featured: true
  },
  {
    id: "classical-villa",
    title: "Classical Palace Villa",
    category: "luxury",
    description: "Luxurious neo-classical villa with elegant facade, featuring decorative balustrades and manicured gardens.",
    client: "Elite Estates",
    image: "/lovable-uploads/2ececbcf-fcb1-4779-ac29-0d53410d47cb.png",
    year: "2023"
  },
  {
    id: "high-rise-residence",
    title: "Modern High-Rise Residence",
    category: "commercial",
    description: "Contemporary high-rise with distinctive wooden elements and vertical garden integration.",
    client: "Urban Living LLC",
    image: "/lovable-uploads/8044b024-7567-4f72-b742-392ce40e1a38.png",
    year: "2022",
    featured: true
  },
  {
    id: "grand-mosque",
    title: "Grand Mosque Complex",
    category: "cultural",
    description: "Majestic mosque design with traditional Islamic architectural elements and modern construction techniques.",
    client: "Islamic Cultural Center",
    image: "/lovable-uploads/8dbb2d15-2dc7-4776-a443-03edfb0a8693.png",
    year: "2022"
  },
  {
    id: "luxury-living-room",
    title: "Luxury Living Room",
    category: "interior",
    description: "Elegant modern living room with marble feature wall, custom lighting and premium finishes.",
    client: "Prestige Interiors",
    image: "/lovable-uploads/bdf482ec-17f3-44f0-9a58-4b7857c4fe15.png",
    year: "2023"
  },
  {
    id: "contemporary-kitchen",
    title: "Contemporary Kitchen",
    category: "interior",
    description: "Sophisticated kitchen design with premium appliances, black marble backsplash and integrated lighting.",
    client: "Luxury Homes",
    image: "/lovable-uploads/12c22b06-09e2-40f1-86da-7eb096ae3412.png",
    year: "2022",
    featured: true
  },
  {
    id: "luxury-bedroom",
    title: "Premium Master Bedroom",
    category: "interior",
    description: "Sophisticated bedroom suite with custom closets, ambient lighting and panoramic city views.",
    client: "Exclusive Interiors",
    image: "/lovable-uploads/73bb5abc-1f7e-49f1-b68d-aa9857daf3d4.png",
    year: "2023"
  },
  {
    id: "resort-pool",
    title: "Resort Swimming Pool",
    category: "commercial",
    description: "Luxury resort swimming pool with lounging areas, dining facilities and recreational amenities.",
    client: "Paradise Resorts",
    image: "/lovable-uploads/af9e7a9b-7fd8-4240-a147-88dc88f2667a.png",
    year: "2022"
  },