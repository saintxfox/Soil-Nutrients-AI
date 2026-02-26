import { Link, useLocation } from "wouter";
import { LayoutDashboard, Beaker, FileBarChart, Settings, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/new-test", label: "New Soil Test", icon: Beaker },
    { href: "/results", label: "Recent Results", icon: FileBarChart },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen p-4 flex flex-col glass z-10 sticky top-0 md:h-screen">
        <div className="flex items-center gap-3 mb-8 px-2 mt-2">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-display tracking-tight text-foreground">AgroSoil DSS</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {links.map((link) => {
            const active = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <a className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  active ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}>
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <button className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-secondary w-full text-left">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>
      
      <main className="flex-1 p-4 md:p-8 max-h-screen overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}