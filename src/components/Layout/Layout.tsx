
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Layout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <main className={cn(
        "flex-1 w-full transition-all duration-300",
        isMobile ? "p-4 pt-16" : "lg:ml-64 p-4 lg:p-8"
      )}>
        <Outlet />
      </main>
    </div>
  );
}

// Import cn utility function
import { cn } from "@/lib/utils";
