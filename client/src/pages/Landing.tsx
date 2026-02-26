import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Leaf, BarChart3, Database, ShieldCheck, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Leaf className="w-6 h-6" />
            <span className="font-display font-bold text-xl text-foreground">AgroSoil DSS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log in</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="rounded-full shadow-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10" />
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI-Powered Precision Agriculture
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-foreground mb-6 leading-[1.1]">
                Optimize Soil Health with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Machine Learning</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Predict soil nutrients (NPK), get precise fertilizer recommendations, and make data-driven agronomic decisions instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/new-test">
                  <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 w-full sm:w-auto">
                    Start Soil Analysis <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base w-full sm:w-auto bg-white/50 border-border/60">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border/40 relative">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "Predictive Analytics",
              description: "Random Forest models trained on diverse agricultural datasets predict NPK levels with high accuracy."
            },
            {
              icon: Database,
              title: "Comprehensive History",
              description: "Maintain a complete timeline of soil tests, track nutrient trends over seasons, and analyze results."
            },
            {
              icon: ShieldCheck,
              title: "Actionable Insights",
              description: "Receive exact fertilizer dosage recommendations based on predicted deficiencies and crop types."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}