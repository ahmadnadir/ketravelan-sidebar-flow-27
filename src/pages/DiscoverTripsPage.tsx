
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Calendar, DollarSign, Users, Star } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Trip = {
  id: number;
  title: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  type: "Community" | "Guided";
  organizer?: string;
  maxParticipants?: number;
  currentParticipants?: number;
};

export default function DiscoverTripsPage() {
  const [activeTab, setActiveTab] = useState<string>("community");
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [budget, setBudget] = useState<number[]>([2000]);
  
  // Filter trips based on selected filters
  const filteredTrips = trips.filter((trip) => {
    // Filter by trip type (Community or Guided)
    if (
      (activeTab === "community" && trip.type !== "Community") ||
      (activeTab === "guided" && trip.type !== "Guided")
    ) {
      return false;
    }
    
    // Filter by location if provided
    if (location && !trip.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by date range if provided
    if (dateRange.from && dateRange.to) {
      if (trip.startDate < dateRange.from || trip.endDate > dateRange.to) {
        return false;
      }
    }
    
    // Filter by budget
    if (trip.price > budget[0]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Trips</h1>
      
      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Location filter */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Any location"
                  className="pl-8"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            {/* Date range filter */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM d")} -{" "}
                          {format(dateRange.to, "MMM d, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM d, yyyy")
                      )
                    ) : (
                      <span>Select dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Budget slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Maximum Budget</Label>
                <span className="text-sm font-medium">${budget[0]}</span>
              </div>
              <Slider
                defaultValue={[2000]}
                max={5000}
                step={100}
                onValueChange={(values) => setBudget(values)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$5000</span>
              </div>
            </div>
            
            {/* Reset filters button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setLocation("");
                  setDateRange({});
                  setBudget([2000]);
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for Community vs Guided Trips */}
      <Tabs defaultValue="community" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="community">Community Trips</TabsTrigger>
            <TabsTrigger value="guided">Guided Trips</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredTrips.length} trips
          </div>
        </div>
        
        {/* Community Trips Tab Content */}
        <TabsContent value="community" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden flex flex-col">
                <div className="h-48 relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
                    {trip.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{trip.title}</span>
                    <span className="text-lg font-bold">${trip.price}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {trip.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{trip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">
                        {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d")}
                      </span>
                    </div>
                    {trip.type === "Community" && (
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">{trip.currentParticipants}/{trip.maxParticipants}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({trip.reviewCount} reviews)
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {trip.type === "Community" ? "Join Trip" : "Book Trip"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Guided Trips Tab Content (Same grid layout) */}
        <TabsContent value="guided" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden flex flex-col">
                <div className="h-48 relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
                    {trip.type}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{trip.title}</span>
                    <span className="text-lg font-bold">${trip.price}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {trip.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{trip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">
                        {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d")}
                      </span>
                    </div>
                    {trip.type === "Guided" && (
                      <div className="text-xs">
                        <span className="font-medium">Guide:</span> {trip.organizer}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({trip.reviewCount} reviews)
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {trip.type === "Community" ? "Join Trip" : "Book Trip"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const trips: Trip[] = [
  {
    id: 1,
    title: "Bali Adventure",
    location: "Bali, Indonesia",
    description: "Explore beautiful beaches, temples, and rice terraces with fellow travelers.",
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 22),
    price: 1200,
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1935&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    type: "Community",
    maxParticipants: 8,
    currentParticipants: 5
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    location: "Tokyo, Japan",
    description: "Discover the bustling metropolis and serene temples with our expert local guide.",
    startDate: new Date(2025, 6, 10),
    endDate: new Date(2025, 6, 15),
    price: 1800,
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1936&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 36,
    type: "Guided",
    organizer: "Akira Tours"
  },
  {
    id: 3,
    title: "Costa Rica Wildlife",
    location: "Costa Rica",
    description: "Experience the lush rainforests and amazing wildlife in this tropical paradise.",
    startDate: new Date(2025, 7, 5),
    endDate: new Date(2025, 7, 15),
    price: 1500,
    image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?q=80&w=1936&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 19,
    type: "Community",
    maxParticipants: 10,
    currentParticipants: 4
  },
  {
    id: 4,
    title: "Rome & Tuscany",
    location: "Italy",
    description: "Explore Rome's ancient history and enjoy Tuscany's delicious food and wine.",
    startDate: new Date(2025, 8, 12),
    endDate: new Date(2025, 8, 20),
    price: 2200,
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=1936&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 42,
    type: "Guided",
    organizer: "Italia Expeditions"
  },
  {
    id: 5,
    title: "Thailand Beach Hopping",
    location: "Thailand",
    description: "Island hop through Thailand's most beautiful beaches with new friends.",
    startDate: new Date(2025, 9, 1),
    endDate: new Date(2025, 9, 10),
    price: 1100,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1939&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 28,
    type: "Community",
    maxParticipants: 12,
    currentParticipants: 8
  },
  {
    id: 6,
    title: "Peruvian Andes",
    location: "Peru",
    description: "Hike the majestic Andes mountains and visit ancient Incan ruins.",
    startDate: new Date(2025, 10, 5),
    endDate: new Date(2025, 10, 15),
    price: 1900,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 31,
    type: "Guided",
    organizer: "Andean Explorers"
  }
];
