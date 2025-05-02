import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExecutiveSummary from "./pages/executive-summary";
import NotFound from "./pages/NotFound";
import BusinessContext from "./pages/business-context";
import MarketingPerformance from "./pages/marketing-performance";
import PerformanceDrivers from "./pages/performance-drivers";
import Index from "./pages/Index";
import MarketingROI from "./pages/marketing-roi";
import BudgetAllocation from "./pages/budget-allocation";
import Implementation from "./pages/implementation";
import Appendix from "./pages/appendix";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Report from "./pages/report"
    
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/business-context" element={<BusinessContext />} />
          <Route path="/marketing-performance" element={<MarketingPerformance />} />
          <Route path="/performance-drivers" element={<PerformanceDrivers />} />
          <Route path="/marketing-roi" element={<MarketingROI />} />
          <Route path="/budget-allocation" element={<BudgetAllocation />} />
          <Route path="/implementation" element={<Implementation />} />
          <Route path="/appendix" element={<Appendix />} />
          <Route path="/executive-summary" element={<ExecutiveSummary />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
