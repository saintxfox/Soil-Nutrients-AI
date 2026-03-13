import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Download, Users, Beaker, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const performanceData = [
  { metric: "Accuracy", value: 92.4, target: 90 },
  { metric: "Precision", value: 89.1, target: 85 },
  { metric: "Recall", value: 94.2, target: 90 },
  { metric: "F1 Score", value: 91.5, target: 88 },
];

const usageTrends = [
  { month: "Jan", farmers: 120, agronomists: 15, tests: 450 },
  { month: "Feb", farmers: 150, agronomists: 18, tests: 520 },
  { month: "Mar", farmers: 210, agronomists: 22, tests: 780 },
  { month: "Apr", farmers: 280, agronomists: 25, tests: 1100 },
  { month: "May", farmers: 340, agronomists: 30, tests: 1450 },
  { month: "Jun", farmers: 420, agronomists: 35, tests: 2100 },
];

export default function AdminPanel() {
  return (
    <SidebarLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Platform overview, user management, and ML model performance.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="bg-white/50">
             <Download className="w-4 h-4 mr-2" />
             Export System Logs
           </Button>
           <Button className="shadow-sm bg-blue-600 hover:bg-blue-700">
             Retrain Model
           </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: "2,450", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Total Soil Tests", value: "14,892", icon: Beaker, color: "text-green-600", bg: "bg-green-100" },
          { label: "Active Regions", value: "48", icon: MapPin, color: "text-orange-600", bg: "bg-orange-100" },
          { label: "Model Accuracy", value: "92.4%", icon: Search, color: "text-purple-600", bg: "bg-purple-100" },
        ].map((stat, i) => (
          <Card key={i} className="glass border-none shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* ML Performance Chart */}
        <Card className="glass border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Random Forest Model Metrics</CardTitle>
            <CardDescription>Current performance vs target baseline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="value" name="Current Performance" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="target" name="Target Baseline" fill="#9ca3af" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Growth Chart */}
        <Card className="glass border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">Platform Adoption Trends</CardTitle>
            <CardDescription>Monthly active users and tests conducted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Line type="monotone" dataKey="tests" name="Total Tests" stroke="#16a34a" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="farmers" name="Farmers" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="agronomists" name="Agronomists" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management Section */}
      <Card className="glass border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-display">Dataset Management</CardTitle>
          <CardDescription>Upload new historical soil data to improve model accuracy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <Input type="file" className="bg-white/50" accept=".csv" />
            </div>
            <Button className="w-full sm:w-auto">Upload Dataset</Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
            <span className="font-medium text-foreground">Format requirement:</span> CSV file containing columns for pH, Organic Carbon, Nitrogen, Phosphorus, Potassium, Soil Texture, Location, and verified Crop Yield/Health status.
          </div>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
}