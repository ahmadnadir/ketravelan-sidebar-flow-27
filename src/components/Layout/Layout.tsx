
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Layout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <main className={cn(
        "flex-1 w-full min-w-0 transition-all duration-300",
        isMobile 
          ? "p-4 pt-16" 
          : "lg:ml-64 p-4 lg:p-8",
        "overflow-x-auto"
      )}>
        <div className="max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
