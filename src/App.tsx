
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout/Layout";
import NotFound from "@/pages/NotFound";

// Shared Pages
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import DiscoverTripsPage from "@/pages/DiscoverTripsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import PaymentHistoryPage from "@/pages/PaymentHistoryPage";

// Traveler Pages
import CreateCommunityTripPage from "@/pages/traveler/CreateCommunityTripPage";
import CommunityTripDetailsPage from "@/pages/traveler/CommunityTripDetailsPage";
import CommunityChatPage from "@/pages/traveler/CommunityChatPage";
import TravelerProfilePage from "@/pages/traveler/TravelerProfilePage";

// Agent Pages
import CreateGuidedTripPage from "@/pages/agent/CreateGuidedTripPage";
import GuidedTripDetailsPage from "@/pages/agent/GuidedTripDetailsPage";
import GuidedChatPage from "@/pages/agent/GuidedChatPage";
import AgentDashboardPage from "@/pages/agent/AgentDashboardPage";
import AgentProfilePage from "@/pages/agent/AgentProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Shared Pages */}
              <Route index element={<HomePage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="discover" element={<DiscoverTripsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="payment-history" element={<PaymentHistoryPage />} />
              
              {/* Traveler Pages */}
              <Route path="create-community-trip" element={<CreateCommunityTripPage />} />
              <Route path="community-trip-details" element={<CommunityTripDetailsPage />} />
              <Route path="community-chat" element={<CommunityChatPage />} />
              <Route path="traveler-profile" element={<TravelerProfilePage />} />
              
              {/* Agent Pages */}
              <Route path="create-guided-trip" element={<CreateGuidedTripPage />} />
              <Route path="guided-trip-details" element={<GuidedTripDetailsPage />} />
              <Route path="guided-chat" element={<GuidedChatPage />} />
              <Route path="agent-dashboard" element={<AgentDashboardPage />} />
              <Route path="agent-profile" element={<AgentProfilePage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
