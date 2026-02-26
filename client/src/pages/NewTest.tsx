import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useLocation } from "wouter";
import { Leaf, FlaskConical, MapPin, Sparkles } from "lucide-react";

export default function NewTest() {
  const [, setLocation] = useLocation();
  const [ph, setPh] = useState([6.5]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate ML prediction delay
    setTimeout(() => {
      setLocation("/results");
    }, 1500);
  };

  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">New Soil Test</h1>
          <p className="text-muted-foreground mt-1">Enter soil sample data to generate ML-driven nutrient predictions and recommendations.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="glass border-none shadow-sm bg-white/80 overflow-hidden mb-6">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-green-300" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <CardTitle className="font-display">Location & Sample Info</CardTitle>
              </div>
              <CardDescription>Details about where the sample was collected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State / Region</Label>
                  <Input id="state" placeholder="e.g. California" className="bg-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lga">District / LGA</Label>
                  <Input id="lga" placeholder="e.g. Fresno" className="bg-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="texture">Soil Texture</Label>
                  <Select defaultValue="loamy">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select texture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="peat">Peaty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">Target Crop (Optional)</Label>
                  <Input id="crop" placeholder="e.g. Maize, Wheat" className="bg-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-none shadow-sm bg-white/80">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                <CardTitle className="font-display">Chemical Parameters</CardTitle>
              </div>
              <CardDescription>Input laboratory readings for base parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* pH Slider */}
              <div className="space-y-4 bg-secondary/30 p-5 rounded-2xl border border-border/50">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">Soil pH Level</Label>
                  <span className="font-display text-xl font-bold text-primary bg-white px-3 py-1 rounded-lg shadow-sm">{ph[0]}</span>
                </div>
                <Slider 
                  defaultValue={[6.5]} 
                  max={14} 
                  min={0} 
                  step={0.1}
                  onValueChange={setPh}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Acidic (0)</span>
                  <span>Neutral (7)</span>
                  <span>Alkaline (14)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="oc">Organic Carbon (%)</Label>
                  <div className="relative">
                    <Input id="oc" type="number" step="0.01" placeholder="e.g. 2.1" className="bg-white pl-10" required />
                    <Leaf className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="n">Nitrogen (N) mg/kg</Label>
                  <Input id="n" type="number" placeholder="e.g. 45" className="bg-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p">Phosphorus (P) mg/kg</Label>
                  <Input id="p" type="number" placeholder="e.g. 30" className="bg-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="k">Potassium (K) mg/kg</Label>
                  <Input id="k" type="number" placeholder="e.g. 55" className="bg-white" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-end">
            <Button 
              type="submit" 
              size="lg" 
              className="rounded-full px-8 shadow-md shadow-primary/20 w-full sm:w-auto h-14 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate ML Prediction
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}