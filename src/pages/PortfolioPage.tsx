
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
  {
    id: "modern-villa",
    title: "Contemporary Poolside Villa",
    category: "luxury",
    description: "Sleek modern villa with infinity pool, stone accents, and integrated indoor-outdoor living areas.",
    client: "Premium Properties",
    image: "/lovable-uploads/929ec1c4-ceed-4675-ac29-311927eb3514.png",
    year: "2023",
    featured: true
  },
  {
    id: "hospital-complex", 
    title: "Modern Hospital Complex",
    category: "commercial",
    description: "State-of-the-art healthcare facility with innovative design elements and functional architecture.",
    client: "Health & Wellness Group",
    image: "/lovable-uploads/5fc029a7-8d14-4f83-8673-13934f353824.png",
    year: "2022"
  },
  {
    id: "mixed-use-tower",
    title: "Mixed-Use Residential Tower",
    category: "commercial",
    description: "Modern residential high-rise with integrated commercial facilities and distinctive facade treatment.",
    client: "Metropolitan Development Corp",
    image: "/lovable-uploads/4d583b79-663a-4657-bfee-c866236caaa8.png",
    year: "2022"
  }
];

// Extract the portfolio items by category
const interiorItems = workItems.filter(item => item.category === "interior");
const residentialItems = workItems.filter(item => item.category === "residential");
const commercialItems = workItems.filter(item => item.category === "commercial");
const culturalItems = workItems.filter(item => item.category === "cultural");
const luxuryItems = workItems.filter(item => item.category === "luxury");

const PortfolioPage = () => {
  const [filter, setFilter] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Filter and sort items
  const filteredItems = workItems
    .filter(item => filter === "all" ? true : item.category === filter)
    .sort((a, b) => {
      if (sortBy === "newest") return a.year > b.year ? -1 : 1;
      if (sortBy === "oldest") return a.year < b.year ? -1 : 1;
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });
    return (
    <div className="bg-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-rend-dark mb-3">Our Work</h1>
              <p className="text-rend-light/80 max-w-2xl">
                Explore our showcase of photorealistic visualizations crafted for clients across industries, 
                from architectural concepts to interior designs.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter & Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2 font-medium text-sm text-rend-dark">Sort By</div>
                  <DropdownMenuItem 
                    className={sortBy === "newest" ? "bg-rend-gray" : ""}
                    onClick={() => setSortBy("newest")}
                  >
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={sortBy === "oldest" ? "bg-rend-gray" : ""}
                    onClick={() => setSortBy("oldest")}
                  >
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={sortBy === "featured" ? "bg-rend-gray" : ""}
                    onClick={() => setSortBy("featured")}
                  >
                    Featured Projects
                  </DropdownMenuItem>
                  <div className="p-2 font-medium text-sm text-rend-dark mt-2">Categories</div>
                  <DropdownMenuItem 
                    className={filter === "all" ? "bg-rend-gray" : ""}
                    onClick={() => setFilter("all")}
                  >
                    All Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={filter === "interior" ? "bg-rend-gray" : ""}
                    onClick={() => setFilter("interior")}
                  >
                    Interior Design
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={filter === "residential" ? "bg-rend-gray" : ""}
                    onClick={() => setFilter("residential")}
                  ></DropdownMenuItem>