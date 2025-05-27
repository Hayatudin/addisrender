
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  buttonText: string;
  href: string;
  highlighted?: boolean;
  plan: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic 3D Modeling",
    description: "Standard 3D models for simple designs",
    price: "ETB 500-700",
    priceNote: "per 100 sq. meter",
    features: [
      "Basic architectural modeling",
      "Simple furniture modeling",
      "Standard materials",
      "Basic 3D floor plans",
      "Simple environment modeling",
      "14-day delivery"
    ],
    buttonText: "Get Started",
    href: "/quote?plan=basic",
    plan: "basic"
  },
  {
    name: "Standard Rendering",
    description: "High-quality visualizations for professional results",
    price: "ETB 800-1000",
    priceNote: "per 100 sq. meter",
    features: [
      "Detailed 3D modeling",
      "Enhanced material creation",
      "Photorealistic rendering",
      "Multiple viewpoints",
      "Custom lighting setups",
      "10-day delivery"
    ],
    buttonText: "Get Started",
    href: "/quote?plan=standard",
    plan: "standard"
  },
  {
    name: "Premium Package",
    description: "End-to-end solution with superior details",
    price: "ETB 1300-1500",
    priceNote: "per 100 sq. meter",
    features: [
      "Premium 3D modeling",
      "Advanced material creation",
      "Ultra-realistic rendering",
      "Animation options",
      "Unlimited revisions",
      "Priority support",
      "7-day delivery"
    ],
    buttonText: "Get Started",
    href: "/quote?plan=premium",
    highlighted: true,
    plan: "premium"
  },
  {
    name: "Custom Solutions",
    description: "Tailored packages for specialized projects",
    price: "Custom",
    priceNote: "based on requirements",
    features: [
      "Complex architectural visualizations",
      "Large-scale development projects",
      "Interactive 3D applications",
      "VR/AR ready models",
      "White-label service options",
      "Dedicated project manager"
    ],
    buttonText: "Contact Us",
    href: "/quote?plan=custom",
    plan: "custom"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-rend-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading mx-auto">Our Pricing</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            We offer competitive rates per 100 square meters to fit different project needs and budgets. 
            All prices include comprehensive support and professional quality results.
          </p>
        </div>