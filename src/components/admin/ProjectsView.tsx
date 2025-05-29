
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, AlertCircle, RefreshCw, Eye, Trash2 } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FileUpload {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
  description: string | null;
  quote_id: string | null;
  uploaded_by: string | null;
}

export function ProjectsView() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<FileUpload | null>(null);
  const queryClient = useQueryClient();
  
  const { data: files, isLoading, refetch } = useQuery({
    queryKey: ['project-files'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quote_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as FileUpload[];
    }
  });

  const deleteFileMutation = useMutation({
    mutationFn: async (file: FileUpload) => {
      // First delete from storage
      const { error: storageError } = await supabase.storage
        .from('quote-files')
        .remove([file.file_url]);
      
      if (storageError) throw storageError;
      
      // Then delete the database record
      const { error: dbError } = await supabase
        .from('quote_files')
        .delete()
        .eq('id', file.id);
      
      if (dbError) throw dbError;
      
      return file.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-files'] });
      toast.success("File deleted successfully");
      setFileToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file. Please try again.");
    }
  });

  const handleDeleteFile = (file: FileUpload) => {
    setFileToDelete(file);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      deleteFileMutation.mutate(fileToDelete);
    }
  };
