import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Beaker, TrendingUp, AlertTriangle, ArrowUpRight, Download } from "lucide-react";
import { Link } from "wouter";

const npkData = [
  { month: "Jan", N: 45, P: 30, K: 50 },
  { month: "Feb", N: 50, P: 35, K: 55 },
  { month: "Mar", N: 42, P: 28, K: 48 },
  { month: "Apr", N: 60, P: 40, K: 65 },
  { month: "May", N: 55, P: 38, K: 60 },
  { month: "Jun", N: 48, P: 32, K: 52 },
];

const recentTests = [
  { id: "TEST-089", date: "Today, 10:24 AM", location: "North Field Sector 4", status: "Good", ph: 6.8 },
  { id: "TEST-088", date: "Yesterday", location: "East Pasture", status: "Moderate", ph: 5.9 },
  { id: "TEST-087", date: "May 12, 2024", location: "Greenhouse Alpha", status: "Poor", ph: 5.2 },
  { id: "TEST-086", date: "May 10, 2024", location: "West Orchard", status: "Good", ph: 6.5 },
];

export default function Dashboard() {
  return (
    <SidebarLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here is your farm's soil overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-border/50">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Link href="/new-test">
            <Button className="shadow-sm">
              <Beaker className="w-4 h-4 mr-2" />
              New Soil Test
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass border-none shadow-sm bg-white/60">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Tests Conducted</p>
                <h3 className="text-4xl font-bold font-display text-foreground">124</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Beaker className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none shadow-sm bg-white/60">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Soil Health</p>
                <h3 className="text-4xl font-bold font-display text-foreground">78<span className="text-2xl text-muted-foreground">/100</span></h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>Status: <span className="text-blue-600 font-medium">Moderate to Good</span></span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none shadow-sm bg-white/60">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Critical Warnings</p>
                <h3 className="text-4xl font-bold font-display text-foreground">2</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-destructive font-medium">
              <span>Low Nitrogen in East Pasture</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 glass border-none shadow-sm bg-white/60">
          <CardHeader>
            <CardTitle className="font-display">Nutrient Trends (NPK)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={npkData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}
                  />
                  <Line type="monotone" dataKey="N" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="P" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="K" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 glass border-none shadow-sm bg-white/60 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-display">Recent Tests</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-primary font-medium hover:text-primary/80">View All</Button>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 mt-2">
              {recentTests.map((test, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{test.location}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>{test.id}</span>
                      <span className="mx-2">•</span>
                      <span>pH: {test.ph}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      test.status === 'Good' ? 'bg-green-100 text-green-700' :
                      test.status === 'Moderate' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {test.status}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}