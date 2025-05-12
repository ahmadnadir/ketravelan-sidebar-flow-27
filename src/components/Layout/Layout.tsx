
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
