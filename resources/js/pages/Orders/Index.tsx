
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, FileEdit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Head, Link } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"

export default function OrdersPage() {
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];
  const [searchQuery, setSearchQuery] = useState("")


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Orders" />
      <div className="space-y-6 m-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage and view all Order records</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/Orders/new" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add New Order
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, phone..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Office Name</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OrdersData.map((Order) => (
              <TableRow key={Order.id}>
                <TableCell className="font-medium">{Order.name}</TableCell>
                <TableCell>{Order.phone}</TableCell>
                <TableCell>{Order.email}</TableCell>
                <TableCell>{Order.office}</TableCell>
                <TableCell>{Order.profession}</TableCell>
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
                        <Link href={`/Orders/${Order.id}`} className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/Orders/${Order.id}/edit`} className="flex items-center gap-2">
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
  )
}

const OrdersData = [
  {
    id: "1",
    name: "Michael Scott",
    phone: "+1 555-123-4567",
    email: "michael.scott@example.com",
    office: "Scranton Branch",
    profession: "Recruitment Specialist",
  },
  {
    id: "2",
    name: "Jim Halpert",
    phone: "+1 555-234-5678",
    email: "jim.halpert@example.com",
    office: "Stamford Branch",
    profession: "Placement Officer",
  },
  {
    id: "3",
    name: "Pam Beesly",
    phone: "+1 555-345-6789",
    email: "pam.beesly@example.com",
    office: "Scranton Branch",
    profession: "Client Relations",
  },
  {
    id: "4",
    name: "Dwight Schrute",
    phone: "+1 555-456-7890",
    email: "dwight.schrute@example.com",
    office: "Scranton Branch",
    profession: "Recruitment Manager",
  },
  {
    id: "5",
    name: "Angela Martin",
    phone: "+1 555-567-8901",
    email: "angela.martin@example.com",
    office: "Scranton Branch",
    profession: "Documentation Specialist",
  },
]
