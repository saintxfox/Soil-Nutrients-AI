import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Download, CheckCircle2, AlertTriangle, ArrowLeft, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Mock results
const results = {
  n: 47.2,
  p: 28.4,
  k: 60.1,
  status: "Moderate",
  confidence: 93,
  recommendation: "Apply NPK 20-10-10 at 50kg per hectare. Consider adding organic compost to improve soil retention based on the sandy texture profile.",
};

const Gauge = ({ value, label, color, max = 100 }: { value: number, label: string, color: string, max?: number }) => {
  const data = [
    { name: "Value", value: value },
    { name: "Empty", value: max - value }
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="h-32 w-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              startAngle={180}
              endAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className="text-2xl font-bold font-display leading-none">{value}</span>
          <span className="text-xs text-muted-foreground">mg/kg</span>
        </div>
      </div>
      <span className="font-medium text-foreground mt-2">{label}</span>
    </div>
  );
};

export default function Results() {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Downloading PDF",
      description: "Your report is being generated and will download shortly.",
    });
  };

  return (
    <SidebarLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/new-test">
          <Button variant="outline" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm border-border/50 shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">Generated today at 10:45 AM • Confidence Score: {results.confidence}%</p>
        </div>
        <div className="ml-auto">
          <Button className="shadow-sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-3 glass border-none shadow-sm bg-white/80 overflow-hidden">
          <div className="h-1.5 w-full bg-blue-400" />
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-foreground mb-1">Overall Status: {results.status}</h3>
                <p className="text-muted-foreground">
                  The model predicts moderate nutrient availability. Phosphorus levels are slightly below optimal for typical grain crops.
                </p>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-4 w-full md:w-auto text-center border border-border/50 min-w-[200px]">
              <p className="text-sm font-medium text-muted-foreground mb-1">AI Confidence</p>
              <div className="text-3xl font-bold font-display text-primary">{results.confidence}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-none shadow-sm bg-white/80">
          <CardHeader>
            <CardTitle className="font-display">Predicted Nutrient Levels</CardTitle>
            <CardDescription>Based on Random Forest model inference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-around items-center py-6 bg-secondary/20 rounded-2xl border border-border/40">
              <Gauge value={results.n} label="Nitrogen (N)" color="#16a34a" />
              <Gauge value={results.p} label="Phosphorus (P)" color="#f59e0b" />
              <Gauge value={results.k} label="Potassium (K)" color="#3b82f6" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-green-200" />
              <CardTitle className="font-display text-white">Fertilizer Recommendation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg leading-relaxed mb-6 font-medium">
              "{results.recommendation}"
            </div>
            
            <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                <p className="text-sm text-white font-medium leading-relaxed drop-shadow-sm">
                  Phosphorus levels are the primary limiting factor. Ensure precise application near root zones.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0 mt-0.5" />
                <p className="text-sm text-white font-medium leading-relaxed drop-shadow-sm">
                  Potassium levels are sufficient; standard maintenance application is adequate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}