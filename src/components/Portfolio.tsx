
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PortfolioItem, { Category, WorkItem } from "./PortfolioItem";
import { motion } from "framer-motion";

interface FilterButtonProps {
  category: Category;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const portfolioData: WorkItem[] = [
  {
    id: "1",
    title: "Urban Planning Development",
    category: "residential",
    image: "/lovable-uploads/6dc34976-ef88-4e06-9947-78dce20764db.png",
    description: "Aerial view of modern residential complex with integrated green spaces and innovative architectural layout.",
    client: "Urban Development Corp.",
    year: "2023",
    featured: true
  },
  {
    id: "2",
    title: "Modern High-Rise Building",
    category: "commercial",
    image: "/lovable-uploads/8044b024-7567-4f72-b742-392ce40e1a38.png",
    description: "Contemporary high-rise commercial tower with curved glass façade and dramatic night lighting.",
    client: "Metropolitan Developers",
    year: "2023"
  },
  {
    id: "3",
    title: "Minimalist Home Design",
    category: "residential",
    image: "/lovable-uploads/929ec1c4-ceed-4675-ac29-311927eb3514.png",
    description: "Contemporary mini villa with clean lines, open concept design, and indoor-outdoor living spaces.",
    client: "Modern Living LLC",
    year: "2022"
  },
  {
    id: "4",
    title: "Executive Office Design",
    category: "interior",
    image: "/lovable-uploads/73bb5abc-1f7e-49f1-b68d-aa9857daf3d4.png",
    description: "Elegant office interior with wooden accents, integrated lighting, and functional workspace design.",
    client: "Corporate Solutions Inc.",
    year: "2022"
  },
  {
    id: "5",
    title: "Luxury Living Space",
    category: "interior",
    image: "/lovable-uploads/bdf482ec-17f3-44f0-9a58-4b7857c4fe15.png",
    description: "High-end living room with sleek minimalist design, custom lighting, and premium finishes.",
    client: "Prestige Interiors",
    year: "2023"
  },
  {
    id: "6",
    title: "Architectural Visualization",
    category: "commercial",
    image: "/lovable-uploads/5fc029a7-8d14-4f83-8673-13934f353824.png",
    description: "3D visualization of architectural planning and development with detailed floor plans and site context.",
    client: "Design Vision Partners",
    year: "2022"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Portfolio = () => {
  const [filter, setFilter] = useState<Category>("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = filter === "all" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading mx-auto">Our Portfolio</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            Explore our collection of high-quality 3D renderings showcasing our expertise 
            in bringing architectural and design concepts to life.
          </p>