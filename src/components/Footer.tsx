
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-rend-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img 
                src="/lovable-uploads/0d4297c4-fe56-4729-9f95-c25c34ca800b.png" 
                alt="Render Logo" 
                className="h-12 mb-4"
              />
            </Link>
            <p className="mb-6 text-gray-300">
              Bringing your designs to life with professional 3D modeling and rendering services.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Linkedin className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/" label="Home" /></li>
              <li><FooterLink href="/about" label="About Us" /></li>
              <li><FooterLink href="/services" label="Services" /></li>
              <li><FooterLink href="/portfolio" label="Portfolio" /></li>
              <li><FooterLink href="/pricing" label="Pricing" /></li>
              <li><FooterLink href="/faq" label="FAQs" /></li>
              <li><FooterLink href="/contact" label="Contact Us" /></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-rend-accent" />
                <span>info@rend-plus.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-rend-accent" />
                <span>+1 (123) 456-7890</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 mr-3 text-rend-accent" />
                <h4 className="font-medium">24/7 Operations</h4>
              </div>
              <div className="bg-[#1A1F2C] rounded-md p-3 backdrop-blur-sm border border-gray-700/30">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700/30">
                  <span className="text-gray-300 text-sm">Weekdays</span>
                  <span className="text-white font-medium text-sm bg-rend-primary/20 px-2 py-1 rounded">24 Hours</span>
                </div>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700/30">
                  <span className="text-gray-300 text-sm">Weekends</span>
                  <span className="text-white font-medium text-sm bg-rend-primary/20 px-2 py-1 rounded">24 Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Support</span>
                  <span className="text-white font-medium text-sm bg-rend-accent/20 px-2 py-1 rounded">Always Online</span>
                </div>
              </div>
            </div>
          </div>