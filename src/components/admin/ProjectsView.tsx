
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

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      toast.loading("Preparing download...");
      
      // For public buckets, we can generate a signed URL
      const { data, error } = await supabase.storage
        .from('quote-files')
        .createSignedUrl(fileUrl, 60); // 60 seconds expiry
      
      if (error) {
        console.error('Error creating signed URL:', error);
        toast.dismiss();
        toast.error(`Failed to download ${fileName}: ${error.message}`);
        return;
      }
      
      // Create a download link
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success(`Downloaded ${fileName}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.dismiss();
      toast.error('Failed to download file. Please try again.');
    }
  };
  
  const handlePreview = async (fileUrl: string, fileType: string | null) => {
    try {
      // Only attempt to preview files that are typically viewable in browser
      const viewableTypes = ['image/', 'text/', 'application/pdf'];
      const isViewable = fileType && viewableTypes.some(type => fileType.startsWith(type));
      
      if (!isViewable) {
        toast.error("This file type cannot be previewed in browser");
        return;
      }
      
      toast.loading("Loading preview...");
      
      const { data, error } = await supabase.storage
        .from('quote-files')
        .createSignedUrl(fileUrl, 60);
      
      if (error) {
        console.error('Error creating signed URL for preview:', error);
        toast.dismiss();
        toast.error(`Failed to preview file: ${error.message}`);
        return;
      }
      
      setPreviewUrl(data.signedUrl);
      toast.dismiss();
    } catch (error) {
      console.error('Error previewing file:', error);
      toast.dismiss();
      toast.error('Failed to load preview');
    }
  };
  
  const closePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quote Files</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            refetch();
            toast.success("Quote files refreshed");
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Quote Files</CardTitle>
          <CardDescription>Files uploaded through the quote form</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : files && files.length > 0 ? (
            <Table></Table>