import { useState, useEffect } from 'react';
import { Menu, X, LogIn, User, LogOut, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  
  const useDarkText = location.pathname === '/portfolio' || 
                     location.pathname === '/services' || 
                     location.pathname === '/about' || 
                     location.pathname === '/contact' || 
                     location.pathname === '/faq' ||
                     location.pathname === '/quote';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || useDarkText ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/0d4297c4-fe56-4729-9f95-c25c34ca800b.png" 
            alt="Addis Render Logo" 
            className="h-10 md:h-12"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/services" label="Services" useDarkText={useDarkText || isScrolled} />
          <NavLink href="/about" label="About us" useDarkText={useDarkText || isScrolled} />
          <NavLink href="/portfolio" label="Our works" useDarkText={useDarkText || isScrolled} />
          <NavLink href="/contact" label="Contact" useDarkText={useDarkText || isScrolled} />
          <NavLink href="/faq" label="FAQs" useDarkText={useDarkText || isScrolled} />
          <NavLink href="/quote" label="Quote" useDarkText={useDarkText || isScrolled} />
          
          {isAdmin && (
            <NavLink 
              href="/admin" 
              label="Admin" 
              useDarkText={useDarkText || isScrolled}
            />
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="w-full cursor-pointer">
                      <ShieldCheck className="h-4 w-4 mr-2" /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md ml-2"
            ></Button>