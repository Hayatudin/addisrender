import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, FileUp, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const QuotePage = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [projectType, setProjectType] = useState("modeling-rendering");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get plan from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan") || "";
  
  // Define available services by plan
  const serviceOptions = {
    basic: ["basic"],
    standard: ["standard", "basic-rendering", "advanced-rendering"],
    premium: ["advanced", "advanced-rendering", "animation", "full-package"],
    custom: ["custom-service"],
    "": ["basic", "standard", "advanced", "basic-rendering", "advanced-rendering", "animation", "full-package", "custom-service"]
  };
  
  // If no plan is selected, navigate to pricing section
  useEffect(() => {
    if (!plan && location.pathname === "/quote") {
      navigate("/#pricing");
    }
  }, [plan, location.pathname, navigate]);

  // Set default project type based on plan
  useEffect(() => {
    if (plan === "basic") {
      setProjectType("modeling-only");
    } else if (plan === "standard") {
      setProjectType("rendering-only");
    } else if (plan === "premium") {
      setProjectType("modeling-rendering");
    } else if (plan === "custom") {
      setProjectType("custom");
    }
  }, [plan]);

  const allowedFileTypes = [
    '.dwg', '.dxf', '.rvt', '.skp', 
    '.max', '.3dm', '.pln', '.dae'
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValid = allowedFileTypes.includes(extension);
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: `File "${file.name}" is not supported. Please upload files in the following formats: ${allowedFileTypes.join(', ')}`,
          variant: "destructive",
        });
      }
      return isValid;
    });

    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
  };