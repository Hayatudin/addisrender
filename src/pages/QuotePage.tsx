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
  const handleReferenceFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setReferenceFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, fileType: 'project' | 'reference') => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    if (fileType === 'project') {
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
    } else {
      setReferenceFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  const uploadFileToStorage = async (file: File): Promise<{ url: string, size: number, type: string } | null> => {
    try {
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('quote-files');
        
      if (bucketError && bucketError.message.includes('does not exist')) {
        console.error('Bucket does not exist:', bucketError);
        toast({
          title: "Storage Error",
          description: "The storage system is not properly configured. Please contact support.",
          variant: "destructive",
        });
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${uuidv4()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('quote-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Upload Failed",
          description: `Failed to upload ${file.name}. ${error.message}`,
          variant: "destructive",
        });
        return null;
      }
      
      return {
        url: data.path,
        size: file.size,
        type: file.type
      };
    } catch (error) {
      console.error('Error in upload process:', error);
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred during upload. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };
  // Save uploaded file information to "projects" table (instead of "quote_files")
  const saveProjectRecord = async ({
    userId,
    fileData,
    fileName,
    projectTitle,
    projectDescription,
  }: {
    userId: string;
    fileData: { url: string; size: number; type: string };
    fileName: string;
    projectTitle: string;
    projectDescription: string | null;
  }) => {
    try {
      const { error } = await supabase.from("projects").insert({
        user_id: userId,
        title: projectTitle,
        description: projectDescription,
        file_url: fileData.url,
        file_name: fileName,
        file_type: fileData.type,
        file_size: fileData.size,
      });
      if (error) {
        toast({
          title: "Database Error",
          description: `Could not save the file (${fileName}) to the database: ${error.message}`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    } catch (err) {
      toast({
        title: "Database Error",
        description: `Unexpected error while saving file to the project table.`,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your quote request.",
        variant: "destructive",
      });
      navigate(
        `/login?returnTo=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
      return;
    }

    if (selectedFiles.length === 0) {
      toast({
        title: "Files Required",
        description:
          "Please upload at least one project file to submit your quote request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Use project title as filename by default, and description from form
      const formData = new FormData(e.currentTarget);
      const projectTitle = formData.get("name") as string;
      const projectDescription = formData.get(
        "project-description"
      ) as string | null;

      const totalFiles = selectedFiles.length + referenceFiles.length;
      let completedFiles = 0;
      let failedFiles = 0;

      const projectUploadPromises = selectedFiles.map(async (file) => {
        const fileData = await uploadFileToStorage(file);
        if (fileData) {
          const result = await saveProjectRecord({
            userId: user.id,
            fileData,
            fileName: file.name,
            projectTitle,
            projectDescription,
          });
          completedFiles++;
          setUploadProgress(Math.floor((completedFiles / totalFiles) * 100));
          return result;
        }
        failedFiles++;
        return false;
      });