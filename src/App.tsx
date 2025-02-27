
/**
 * Main application component that sets up core providers and routing.
 * 
 * Architecture:
 * - Uses React Query for data fetching and state management
 * - Implements React Router for navigation
 * - Provides toast notifications through both Radix UI and Sonner
 * - Wraps the app in necessary providers (Query, Tooltip)
 * 
 * Route Structure:
 * - / : Folders (main dashboard)
 * - /sync-logs : Synchronization history
 * - /scheduled : Scheduled synchronizations
 * - /settings : Application settings
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Folders from "./pages/Folders";
import SyncLogs from "./pages/SyncLogs";
import Scheduled from "./pages/Scheduled";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Folders />} />
            <Route path="sync-logs" element={<SyncLogs />} />
            <Route path="scheduled" element={<Scheduled />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
