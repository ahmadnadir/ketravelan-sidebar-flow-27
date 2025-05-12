
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  PackageOpen, 
  MoreHorizontal, 
  Download, 
  Edit, 
  Copy, 
  Trash, 
  Filter, 
  ChevronDown 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample data for the dashboard
const dashboardData = {
  stats: {
    activeTrips: 8,
    totalRevenue: 27850,
    totalTravelers: 42,
    upcomingDepartures: 5
  },
  trips: [
    {
      id: "GT-12345",
      title: "Sacred Temples of Bali Tour",
      location: "Bali, Indonesia",
      duration: 7,
      price: 1499,
      nextDeparture: "2025-06-15",
      totalParticipants: 10,
      confirmedParticipants: 6,
      totalRevenue: 8994,
      percentPaid: 85,
      status: "active"
    },
    {
      id: "GT-12346",
      title: "Northern Lights Explorer",
      location: "Iceland",
      duration: 5,
      price: 1899,
      nextDeparture: "2025-09-20",
      totalParticipants: 8,
      confirmedParticipants: 8,
      totalRevenue: 15192,
      percentPaid: 100,
      status: "active"
    },
    {
      id: "GT-12347",
      title: "Kyoto Cultural Immersion",
      location: "Japan",
      duration: 8,
      price: 2299,
      nextDeparture: "2025-05-10",
      totalParticipants: 6,
      confirmedParticipants: 3,
      totalRevenue: 3448.50,
      percentPaid: 50,
      status: "active"
    },
    {
      id: "GT-12348",
      title: "Amazon Rainforest Expedition",
      location: "Brazil",
      duration: 9,
      price: 2599,
      nextDeparture: "2025-08-05",
      totalParticipants: 12,
      confirmedParticipants: 0,
      totalRevenue: 0,
      percentPaid: 0,
      status: "draft"
    },
    {
      id: "GT-12349",
      title: "Ancient Egypt Discovery",
      location: "Egypt",
      duration: 10,
      price: 1899,
      nextDeparture: "2025-11-12",
      totalParticipants: 14,
      confirmedParticipants: 0,
      totalRevenue: 0,
      percentPaid: 0,
      status: "draft"
    },
    {
      id: "GT-12350",
      title: "Tuscan Wine Trail",
      location: "Italy",
      duration: 6,
      price: 1699,
      nextDeparture: "2025-07-18",
      totalParticipants: 10,
      confirmedParticipants: 0,
      totalRevenue: 0,
      percentPaid: 0,
      status: "upcoming"
    },
    {
      id: "GT-12351",
      title: "New Zealand Adventure",
      location: "New Zealand",
      duration: 12,
      price: 2999,
      nextDeparture: "2025-03-15",
      totalParticipants: 8,
      confirmedParticipants: 8,
      totalRevenue: 23992,
      percentPaid: 100,
      status: "completed"
    },
    {
      id: "GT-12352",
      title: "Moroccan Desert Expedition",
      location: "Morocco",
      duration: 8,
      price: 1399,
      nextDeparture: "2025-10-05",
      totalParticipants: 10,
      confirmedParticipants: 0,
      totalRevenue: 0,
      percentPaid: 0,
      status: "upcoming"
    }
  ]
};

export default function AgentDashboardPage() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter trips based on status and search query
  const filteredTrips = dashboardData.trips.filter(trip => {
    const matchesStatus = filterStatus === "all" || trip.status === filterStatus;
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "draft":
        return <Badge variant="outline" className="border-gray-400 text-muted-foreground">Draft</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleCreateTrip = () => {
    navigate("/create-guided-trip");
  };
  
  const handleEditTrip = (tripId: string) => {
    navigate(`/guided-trip-details`);
  };

  const handleViewTrip = (tripId: string) => {
    navigate(`/guided-trip-details`);
  };
  
  const handleDuplicateTrip = (tripId: string) => {
    console.log("Duplicate trip:", tripId);
  };
  
  const handleDeleteTrip = (tripId: string) => {
    console.log("Delete trip:", tripId);
  };
  
  const handleExportCSV = () => {
    console.log("Export trips to CSV");
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <Button onClick={handleCreateTrip} className="mt-4 md:mt-0">Create New Trip</Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Trips</p>
              <p className="text-3xl font-bold">{dashboardData.stats.activeTrips}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PackageOpen className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold">${dashboardData.stats.totalRevenue}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Travelers</p>
              <p className="text-3xl font-bold">{dashboardData.stats.totalTravelers}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Departures</p>
              <p className="text-3xl font-bold">{dashboardData.stats.upcomingDepartures}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue Chart - Placeholder for future implementation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue from all guided trips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border rounded-md">
            <div className="flex flex-col items-center text-center px-4">
              <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground mb-2">Revenue chart will be displayed here</p>
              <Button variant="outline" size="sm">Generate Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Trip Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Your Trips</CardTitle>
              <CardDescription>
                Manage all your guided trips and monitor bookings
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-1" onClick={handleExportCSV}>
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trips..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Next Departure</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No trips found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">
                        <div 
                          className="cursor-pointer hover:underline"
                          onClick={() => handleViewTrip(trip.id)}
                        >
                          {trip.title}
                        </div>
                        <div className="text-xs text-muted-foreground">{trip.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {trip.location}
                          <span className="text-muted-foreground text-xs">({trip.duration} days)</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(trip.nextDeparture).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {trip.confirmedParticipants}/{trip.totalParticipants}
                          </div>
                          <Progress 
                            value={(trip.confirmedParticipants / trip.totalParticipants) * 100}
                            className="h-1 mt-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">${trip.totalRevenue}</div>
                          <div className="text-xs text-muted-foreground">
                            {trip.percentPaid}% collected
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(trip.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewTrip(trip.id)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditTrip(trip.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateTrip(trip.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="text-red-600 focus:text-red-500"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Search(props: React.ComponentProps<typeof Filter>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
