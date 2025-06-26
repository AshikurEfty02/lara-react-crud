
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, FileEdit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];
const ProductsData = [
  {
    id: "1",
    name: "John Smith",
    passportNo: "A12345678",
    status: "Pending",
    agent: "Michael Scott",
    company: "Global Staffing Ltd",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    passportNo: "B87654321",
    status: "Processing",
    agent: "Jim Halpert",
    company: "Workforce Solutions",
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    passportNo: "C45678912",
    status: "Completed",
    agent: "Pam Beesly",
    company: "Talent Hub Inc",
  },
  {
    id: "4",
    name: "Maria Garcia",
    passportNo: "D98765432",
    status: "Fly",
    agent: "Michael Scott",
    company: "Global Staffing Ltd",
  },
  {
    id: "5",
    name: "Li Wei",
    passportNo: "E23456789",
    status: "Completed",
    agent: "Jim Halpert",
    company: "Workforce Solutions",
  },
  {
    id: "6",
    name: "Robert Chen",
    passportNo: "F34567891",
    status: "Processing",
    agent: "Pam Beesly",
    company: "Talent Hub Inc",
  },
  {
    id: "7",
    name: "Emma Wilson",
    passportNo: "G45678912",
    status: "Pending",
    agent: "Michael Scott",
    company: "Global Staffing Ltd",
  },
]

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("")
  const [agentFilter, setAgentFilter] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [passportValidityFilter, setPassportValidityFilter] = useState("")
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="space-y-6 m-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                  <p className="text-muted-foreground">Manage and view all Product records</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/Products/add-new" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add New Product
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-5">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, passport..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={agentFilter} onValueChange={setAgentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="agent1">Michael Scott</SelectItem>
                    <SelectItem value="agent2">Jim Halpert</SelectItem>
                    <SelectItem value="agent3">Pam Beesly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="company1">Global Staffing Ltd</SelectItem>
                    <SelectItem value="company2">Workforce Solutions</SelectItem>
                    <SelectItem value="company3">Talent Hub Inc</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="fly">Fly</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={passportValidityFilter} onValueChange={setPassportValidityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Passport Validity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Validities</SelectItem>
                    <SelectItem value="3months">Less than 3 months</SelectItem>
                    <SelectItem value="6months">Less than 6 months</SelectItem>
                    <SelectItem value="12months">Less than 12 months</SelectItem>
                    <SelectItem value="24months">Less than 24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Table */}
              <div className="rounded-md border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Passport No</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Agent</TableHead>
                      <TableHead>Assigned Company</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ProductsData.map((Product) => (
                      <TableRow key={Product.id}>
                        <TableCell className="font-medium">{Product.name}</TableCell>
                        <TableCell>{Product.passportNo}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`${
                              Product.status === "Pending"
                                ? "border-amber-500 text-amber-500 bg-amber-50 dark:bg-amber-950"
                                : Product.status === "Processing"
                                  ? "border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950"
                                  : Product.status === "Completed"
                                    ? "border-green-500 text-green-500 bg-green-50 dark:bg-green-950"
                                    : "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-950"
                            }`}
                          >
                            {Product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{Product.agent}</TableCell>
                        <TableCell>{Product.company}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/Products/${Product.id}`} className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/Products/${Product.id}/edit`} className="flex items-center gap-2">
                                  <FileEdit className="h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive flex items-center gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
        </AppLayout>
    );
}