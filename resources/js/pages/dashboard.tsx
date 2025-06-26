
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Building2, Clock, FileCheck, FileClock, FileEdit, Plus, UserPlus, Users } from "lucide-react"

// Import the chart components
import ClientStatusChart from "@/components/charts/client-status-chart"
import RevenueChart from "@/components/charts/revenue-chart"
import ClientAcquisitionChart from "@/components/charts/client-acquisition-chart"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
const recentActivities = [
  {
    type: "client",
    title: "New Client Added",
    description: "John Smith was added by Agent Michael",
    time: "2 hours ago",
  },
  {
    type: "status",
    title: "Status Changed",
    description: "Sarah Johnson moved from Pending to Processing",
    time: "4 hours ago",
  },
  {
    type: "completed",
    title: "Client Completed",
    description: "Ahmed Hassan's process has been completed",
    time: "Yesterday",
  },
  {
    type: "client",
    title: "New Client Added",
    description: "Maria Garcia was added by Agent Thomas",
    time: "Yesterday",
  },
  {
    type: "status",
    title: "Status Changed",
    description: "Li Wei moved from Processing to Completed",
    time: "2 days ago",
  },
]
export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div> */}
            <div className="space-y-6 m-10 ">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                <h2 className="text-2xl font-bold tracking-tight ">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your manpower management system</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Pending Clients</CardTitle>
                    <FileClock className="w-4 h-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">+4% from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Processing Clients</CardTitle>
                    <FileEdit className="w-4 h-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">189</div>
                    <p className="text-xs text-muted-foreground">-2% from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Completed Clients</CardTitle>
                    <FileCheck className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">684</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
                </Card>
            </div>

            {/* Data Visualization */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <RevenueChart />
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Client Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <ClientStatusChart />
                </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Client Acquisition</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <ClientAcquisitionChart />
                </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Quick Actions</h3>
                <div className="grid gap-4 md:grid-cols-3">
                <Button asChild className="h-auto py-4 bg-purple-600 hover:bg-purple-700">
                    <Link href="/clients/new" className="flex flex-col items-center gap-1">
                    <Plus className="h-5 w-5" />
                    <span>Add New Client</span>
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-950"
                >
                    <Link href="/agents/new" className="flex flex-col items-center gap-1">
                    <UserPlus className="h-5 w-5" />
                    <span>Add New Agent</span>
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="outline"
                    className="h-auto py-4 border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-950"
                >
                    <Link href="/companies/new" className="flex flex-col items-center gap-1">
                    <Building2 className="h-5 w-5" />
                    <span>Add New Company</span>
                    </Link>
                </Button>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recent Activities</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                    <Clock className="h-4 w-4" />
                    View All
                </Button>
                </div>
                <Card>
                <CardContent className="p-0">
                    <div className="divide-y">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 text-sm">
                        <div
                            className={`rounded-full p-2 ${
                            activity.type === "client"
                                ? "bg-purple-100 text-purple-600 dark:bg-purple-900"
                                : activity.type === "status"
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900"
                                : "bg-green-100 text-green-600 dark:bg-green-900"
                            }`}
                        >
                            {activity.type === "client" ? (
                            <Users className="h-4 w-4" />
                            ) : activity.type === "status" ? (
                            <Activity className="h-4 w-4" />
                            ) : (
                            <FileCheck className="h-4 w-4" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="text-muted-foreground">{activity.time}</div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </div>
            </div>
        </AppLayout>
    );
}
