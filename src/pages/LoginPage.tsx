
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, user, isAdmin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the returnTo parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const returnTo = queryParams.get("returnTo") || "/";
  
  // If user is already logged in, redirect appropriately
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate(returnTo);
      }
    }
  }, [user, navigate, returnTo, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signIn(email, password);
      // The redirect will happen in the useEffect above when user is set
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the auth context
    }
  };