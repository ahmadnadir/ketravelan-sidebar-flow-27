
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Search, ArrowUpDown, Check, Clock, AlertCircle, Filter } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Payment = {
  id: string;
  tripName: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed";
  type: "payment" | "refund";
  paymentMethod: string;
  reference: string;
};

export default function PaymentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Filter payments based on search query and filters
  const filteredPayments = samplePayments.filter((payment) => {
    // Filter by search query
    if (
      searchQuery &&
      !payment.tripName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && payment.status !== statusFilter) {
      return false;
    }
    
    // Filter by type
    if (typeFilter !== "all" && payment.type !== typeFilter) {
      return false;
    }
    
    return true;
  });

  // Function to download receipt (in a real app, this would generate and download a PDF)
  const downloadReceipt = (id: string) => {
    console.log(`Downloading receipt for payment ${id}`);
    alert(`Receipt for payment ${id} would be downloaded here.`);
  };
  
  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by trip name or reference..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="failed">Failed</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="payment">Payments</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="refund">Refunds</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Payments Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip Name</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Reference</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.tripName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(payment.date, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className={cn(
                    payment.type === "refund" ? "text-green-600" : ""
                  )}>
                    {payment.type === "refund" ? "+" : ""}{formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {payment.reference}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReceipt(payment.id)}
                      disabled={payment.status !== "completed"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payment records found.</p>
            </div>
          )}
          
          {/* Pagination - Static for demo */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Sample payment data
const samplePayments: Payment[] = [
  {
    id: "p1",
    tripName: "Bali Adventure",
    amount: 1200,
    date: new Date(2025, 3, 15),
    status: "completed",
    type: "payment",
    paymentMethod: "Credit Card",
    reference: "BAL-1234-5678"
  },
  {
    id: "p2",
    tripName: "Tokyo Explorer",
    amount: 1800,
    date: new Date(2025, 2, 22),
    status: "completed",
    type: "payment",
    paymentMethod: "PayPal",
    reference: "TOK-2345-6789"
  },
  {
    id: "p3",
    tripName: "Costa Rica Retreat",
    amount: 350,
    date: new Date(2025, 2, 10),
    status: "pending",
    type: "payment",
    paymentMethod: "Bank Transfer",
    reference: "COS-3456-7890"
  },
  {
    id: "p4",
    tripName: "Rome & Tuscany",
    amount: 500,
    date: new Date(2025, 1, 28),
    status: "failed",
    type: "payment",
    paymentMethod: "Credit Card",
    reference: "ROM-4567-8901"
  },
  {
    id: "p5",
    tripName: "Thailand Beach Hopping",
    amount: 1100,
    date: new Date(2025, 1, 14),
    status: "completed",
    type: "payment",
    paymentMethod: "Credit Card",
    reference: "THA-5678-9012"
  },
  {
    id: "p6",
    tripName: "Peruvian Andes",
    amount: 750,
    date: new Date(2025, 0, 30),
    status: "completed",
    type: "refund",
    paymentMethod: "Original Method",
    reference: "REF-6789-0123"
  },
  {
    id: "p7",
    tripName: "Greek Islands",
    amount: 2200,
    date: new Date(2025, 0, 15),
    status: "completed",
    type: "payment",
    paymentMethod: "Credit Card",
    reference: "GRE-7890-1234"
  },
  {
    id: "p8",
    tripName: "Morocco Desert Tour",
    amount: 1600,
    date: new Date(2024, 11, 20),
    status: "completed",
    type: "payment",
    paymentMethod: "PayPal",
    reference: "MOR-8901-2345"
  }
];
