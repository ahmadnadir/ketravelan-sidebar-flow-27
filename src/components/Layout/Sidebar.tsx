
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home, 
  LogIn, 
  UserPlus, 
  MapPin, 
  Bell, 
  CreditCard, 
  Users, 
  MessageSquare, 
  User, 
  PlusCircle,
  Map,
  LayoutDashboard,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type MenuItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
};

const menuItems: MenuItem[] = [
  // Shared Pages
  { title: "Home", path: "/", icon: <Home size={20} />, roles: ["traveler", "agent"] },
  { title: "Sign In", path: "/signin", icon: <LogIn size={20} />, roles: ["traveler", "agent"] },
  { title: "Sign Up", path: "/signup", icon: <UserPlus size={20} />, roles: ["traveler", "agent"] },
  { title: "Discover Trips", path: "/discover", icon: <MapPin size={20} />, roles: ["traveler", "agent"] },
  { title: "Notifications", path: "/notifications", icon: <Bell size={20} />, roles: ["traveler", "agent"] },
  { title: "Payment History", path: "/payment-history", icon: <CreditCard size={20} />, roles: ["traveler", "agent"] },
  
  // Traveler Pages
  { title: "Create Community Trip", path: "/create-community-trip", icon: <PlusCircle size={20} />, roles: ["traveler"] },
  { title: "Community Trip Details", path: "/community-trip-details", icon: <Map size={20} />, roles: ["traveler"] },
  { title: "Community Chat & Expenses", path: "/community-chat", icon: <MessageSquare size={20} />, roles: ["traveler"] },
  { title: "Traveler Profile", path: "/traveler-profile", icon: <User size={20} />, roles: ["traveler"] },
  
  // Agent Pages
  { title: "Create Guided Trip", path: "/create-guided-trip", icon: <PlusCircle size={20} />, roles: ["agent"] },
  { title: "Guided Trip Details", path: "/guided-trip-details", icon: <Map size={20} />, roles: ["agent"] },
  { title: "Guided Chat & Payments", path: "/guided-chat", icon: <MessageSquare size={20} />, roles: ["agent"] },
  { title: "Agent Dashboard", path: "/agent-dashboard", icon: <LayoutDashboard size={20} />, roles: ["agent"] },
  { title: "Agent Profile", path: "/agent-profile", icon: <User size={20} />, roles: ["agent"] },
];

export function Sidebar() {
  const location = useLocation();
  const { userRole } = useAuth();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // Reset collapsed state on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  // Toggle role for demonstration purposes
  const { setUserRole } = useAuth();
  const toggleRole = () => {
    setUserRole(userRole === "traveler" ? "agent" : "traveler");
  };

  const filteredMenuItems = menuItems.filter((item) => 
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMobileOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 12h16M4 6h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Sidebar */}
      <div 
        className={cn(
          "h-full fixed left-0 top-0 z-40 flex flex-col transition-all duration-300 ease-in-out",
          "bg-sidebar border-r border-sidebar-border shadow-sm",
          // Desktop behavior
          !isMobile && (isCollapsed ? "w-[70px]" : "w-64"),
          // Mobile behavior
          isMobile && "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo / Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border relative">
          {/* Close button for mobile */}
          {isMobileOpen && (
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-2 top-2 p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
          
          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start">
            {(!isCollapsed || isMobile) && (
              <span className="text-xl font-bold text-primary">Ketravelan</span>
            )}
            {isCollapsed && !isMobile && (
              <span className="text-xl font-bold text-primary">K</span>
            )}
          </div>
          
          {/* Collapse button (desktop only) */}
          {!isMobile && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-sidebar-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isCollapsed ? (
                  <path d="M12 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                )}
              </svg>
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  (isCollapsed && !isMobile) ? "justify-center" : "justify-start"
                )}
                title={isCollapsed && !isMobile ? item.title : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {(!isCollapsed || isMobile) && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Toggle Role Button (for demo) */}
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            onClick={toggleRole} 
            variant="outline" 
            className="w-full justify-center"
            size="sm"
          >
            {(isCollapsed && !isMobile) ? (
              <Users size={20} />
            ) : (
              <>
                <Users size={20} className="mr-2" />
                <span>{userRole === "traveler" ? "Switch to Agent" : "Switch to Traveler"}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
