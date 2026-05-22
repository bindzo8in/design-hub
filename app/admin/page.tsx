"use client";

import React from "react";
import {
  DollarSign,
  Users,
  ShoppingBag,
  FolderGit2,
  TrendingUp,
  Activity,
  ArrowUpRight,
  UserPlus,
  PlusCircle,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Link from "next/link";

// Mock data for weekly sales/traffic
const chartData = [
  { day: "Mon", revenue: 4000, visitors: 2400 },
  { day: "Tue", revenue: 5500, visitors: 3500 },
  { day: "Wed", revenue: 4800, visitors: 3000 },
  { day: "Thu", revenue: 7000, visitors: 4800 },
  { day: "Fri", revenue: 8500, visitors: 5600 },
  { day: "Sat", revenue: 11000, visitors: 7200 },
  { day: "Sun", revenue: 9500, visitors: 6100 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner/Welcome */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
          Dashboard Overview
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Real-time metrics, analytics performance, and rapid administration shortcuts.
        </p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Revenue */}
        <Card className="bg-[#101735]/40 border-[#26336F]/20 rounded-2xl hover:border-[#DF1B25]/40 transition-all duration-300 group shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider">
              Total Revenue
            </CardTitle>
            <div className="bg-[#DF1B25]/10 p-2 rounded-xl text-[#DF1B25] group-hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">$50,300</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              +12.5% from last week
            </p>
          </CardContent>
        </Card>

        {/* Stat 2: Active Users */}
        <Card className="bg-[#101735]/40 border-[#26336F]/20 rounded-2xl hover:border-[#DF1B25]/40 transition-all duration-300 group shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider">
              Active Members
            </CardTitle>
            <div className="bg-[#26336F]/20 p-2 rounded-xl text-slate-300 group-hover:scale-105 transition-transform duration-300">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">1,248</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              +4.8% new registers
            </p>
          </CardContent>
        </Card>

        {/* Stat 3: Active Projects */}
        <Card className="bg-[#101735]/40 border-[#26336F]/20 rounded-2xl hover:border-[#DF1B25]/40 transition-all duration-300 group shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider">
              Active Projects
            </CardTitle>
            <div className="bg-[#26336F]/20 p-2 rounded-xl text-slate-300 group-hover:scale-105 transition-transform duration-300">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">18</div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              4 nearing completion
            </p>
          </CardContent>
        </Card>

        {/* Stat 4: Average Contract Value */}
        <Card className="bg-[#101735]/40 border-[#26336F]/20 rounded-2xl hover:border-[#DF1B25]/40 transition-all duration-300 group shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400 font-mono uppercase tracking-wider">
              Avg Contract Value
            </CardTitle>
            <div className="bg-[#26336F]/20 p-2 rounded-xl text-slate-300 group-hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">$14,800</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              +8.2% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Activity Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Card */}
        <Card className="bg-[#101735]/30 border-[#26336F]/20 rounded-3xl lg:col-span-2 shadow-2xl backdrop-blur-md overflow-hidden">
          <CardHeader className="border-b border-[#26336F]/10 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#DF1B25]" />
                Weekly Performance Analytics
              </CardTitle>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DF1B25]" />
                  Sales
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#26336F]" />
                  Traffic
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DF1B25" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#DF1B25" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#26336F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#26336F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    stroke="#475569"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#101735",
                      borderColor: "rgba(38, 51, 111, 0.4)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontFamily: "monospace",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#DF1B25"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#26336F"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Events Card */}
        <Card className="bg-[#101735]/30 border-[#26336F]/20 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden">
          <CardHeader className="border-b border-[#26336F]/10 pb-4">
            <CardTitle className="text-base font-bold text-white flex items-center justify-between">
              <span>Recent Admin Activity</span>
              <span className="text-[10px] bg-[#DF1B25]/10 border border-[#DF1B25]/20 text-[#DF1B25] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live Feed
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                {
                  action: "System User Created",
                  details: "Standard Account 'Jane Doe' registered.",
                  time: "10 mins ago",
                  icon: UserPlus,
                  iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                },
                {
                  action: "New Project Initiated",
                  details: "Project 'Modern Branding Design' initiated.",
                  time: "1 hour ago",
                  icon: FolderGit2,
                  iconColor: "text-[#DF1B25] bg-[#DF1B25]/10 border-[#DF1B25]/20",
                },
                {
                  action: "System Backup Processed",
                  details: "Automated incremental backup verified.",
                  time: "4 hours ago",
                  icon: Wrench,
                  iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                },
              ].map((act, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`p-2 h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 ${act.iconColor}`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-white">{act.action}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">{act.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Panel */}
      <Card className="bg-[#101735]/40 border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white font-sans">
              Quick Administrative Actions
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Rapid navigation panels to skip menu clicks and manage users, projects, or core configurations immediately.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="bg-[#101735]/60 border-[#26336F]/30 text-white rounded-xl hover:bg-white/5 cursor-pointer">
              <Link href="/admin/users/new">New Account</Link>
            </Button>
            <Button asChild variant="outline" className="bg-[#101735]/60 border-[#26336F]/30 text-white rounded-xl hover:bg-white/5 cursor-pointer">
              <Link href="/admin/projects/new">New Project</Link>
            </Button>
            <Button asChild className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer">
              <Link href="/admin/settings">System Settings</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
