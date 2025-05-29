
import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  User, 
  RefreshCw,
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string | null;
}

// Mock user data for fallback when admin API is not available
const SAMPLE_USERS: UserData[] = [
  {
    id: "user-123456789",
    email: "admin@example.com",
    created_at: new Date().toLocaleDateString(),
    last_sign_in_at: new Date().toLocaleDateString(),
  },
  {
    id: "user-987654321",
    email: "user@example.com",
    created_at: new Date().toLocaleDateString(),
    last_sign_in_at: new Date().toLocaleDateString(),
  }
];

export function DashboardView() {
  const { data: users = [], isLoading: isLoadingUsers, refetch: refetchUsers, error: usersError } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        // Fetch actual users from the profiles table instead of using admin API
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) throw error;
        
        // Transform the profile data to match our UserData interface
        return data.map((profile: any) => ({
          id: profile.id,
          email: profile.username || 'No email', // username might store email in profiles
          created_at: new Date(profile.created_at).toLocaleDateString(),
          last_sign_in_at: 'N/A' // We don't have this info in profiles table
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users. Using sample data instead.");
        return SAMPLE_USERS;
      }
    }
  });

  const { data: recentFiles, isLoading: isLoadingFiles, refetch: refetchFiles } = useQuery({
    queryKey: ['recent-files'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quote_files')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    }
  });

  const { data: contactSubmissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
   const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const refreshData = () => {
    refetchUsers();
    toast.success("Dashboard data refreshed");
  };

  if (isLoadingUsers /* && other loading conditions */) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" size="sm" onClick={refreshData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
      
      {usersError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading user data. Using sample data instead.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered users on the platform
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentFiles?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Files uploaded via quotes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Administrator</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Admin account active
            </p>
          </CardContent>
        </Card>
      </div>
