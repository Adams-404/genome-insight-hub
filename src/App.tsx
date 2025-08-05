import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Analysis } from "./pages/Analysis";
import { Compare } from "./pages/Compare";
import { History } from "./pages/History";
import { Visualizations } from "./pages/Visualizations";
import { SequenceDatabase } from "./pages/SequenceDatabase";
import { QualityReports } from "./pages/QualityReports";
import { Performance } from "./pages/Performance";
import { SettingsPage } from "./pages/Settings";
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
            <Route index element={<Dashboard />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="compare" element={<Compare />} />
            <Route path="history" element={<History />} />
            <Route path="visualizations" element={<Visualizations />} />
            <Route path="database" element={<SequenceDatabase />} />
            <Route path="reports" element={<QualityReports />} />
            <Route path="performance" element={<Performance />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
