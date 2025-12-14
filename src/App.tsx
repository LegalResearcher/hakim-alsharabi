import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Legislation from "./pages/library/Legislation";
import Rulings from "./pages/library/Rulings";
import Research from "./pages/library/Research";
import ArabLaws from "./pages/library/ArabLaws";
import InheritanceCalculator from "./pages/library/InheritanceCalculator";
import Templates from "./pages/library/Templates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/legislation" element={<Legislation />} />
          <Route path="/library/rulings" element={<Rulings />} />
          <Route path="/library/research" element={<Research />} />
          <Route path="/library/arab-laws" element={<ArabLaws />} />
          <Route path="/library/inheritance-calculator" element={<InheritanceCalculator />} />
          <Route path="/library/templates" element={<Templates />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
