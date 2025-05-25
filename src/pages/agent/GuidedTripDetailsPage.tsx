import React, { useState } from "react";
import { Calendar, MapPin, Users, Clock, DollarSign, Clipboard, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicPaymentCalculator } from "@/components/DynamicPaymentCalculator";
import { type DynamicPayment } from "@/utils/paymentUtils";

// Demo data for the trip
const tripData = {
  id: "GT-12345",
  title: "Sacred Temples of Bali Tour",
  location: "Bali, Indonesia",
  description: "Immerse yourself in the spiritual culture of Bali with our guided temple tour. Visit ancient temples, participate in traditional ceremonies, and experience local cuisine while enjoying comfortable accommodations throughout your stay.",
  duration: 7,
  basePrice: 1499,
  depositAmount: 299,
  maxParticipants: 10,
  remainingSpots: 4,
  inclusions: [
    "Airport transfers",
    "6 nights accommodation",
    "Daily breakfast and select meals",
    "English-speaking guide",
    "All entrance fees",
    "Welcome dinner",
    "Transportation between sites"
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Optional activities",
    "Visa fees if applicable"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival & Welcome",
      description: "Arrive at Denpasar International Airport. Transfer to your hotel in Ubud. Welcome dinner with the group.",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"]
    },
    {
      day: 2,
      title: "Ubud Sacred Sites",
      description: "Visit the Sacred Monkey Forest Sanctuary and Tirta Empul Temple for a purification ceremony.",
      activities: ["Sacred Monkey Forest", "Tirta Empul Temple", "Traditional lunch"]
    },
    {
      day: 3,
      title: "Besakih Temple Complex",
      description: "Full day excursion to Bali's Mother Temple, Besakih, located on the slopes of Mount Agung.",
      activities: ["Besakih Temple tour", "Traditional Balinese lunch", "Rice terrace visit"]
    },
    {
      day: 4,
      title: "Tanah Lot & Uluwatu",
      description: "Visit the iconic sea temples of Tanah Lot and Uluwatu with sunset views.",
      activities: ["Tanah Lot visit", "Uluwatu Temple", "Kecak Fire Dance performance"]
    },
    {
      day: 5,
      title: "North Bali Exploration",
      description: "Explore the northern region including Bedugul and the floating temple of Ulun Danu.",
      activities: ["Ulun Danu Temple", "Bali Botanical Garden", "Git Git waterfall"]
    },
    {
      day: 6,
      title: "Free Day & Optional Activities",
      description: "Enjoy a free day for relaxation or optional activities like cooking classes.",
      activities: ["Free time", "Optional cooking class", "Optional spa treatment"]
    },
    {
      day: 7,
      title: "Departure Day",
      description: "Final breakfast at the hotel and transfer to the airport for departure.",
      activities: ["Breakfast", "Souvenir shopping time", "Airport transfer"]
    }
  ],
  paymentSchedule: [
    {
      description: "Initial deposit (20%)",
      amount: 299.80,
      dueDate: "Upon booking"
    },
    {
      description: "Second payment (40%)",
      amount: 599.60,
      dueDate: "60 days before departure"
    },
    {
      description: "Final payment (40%)",
      amount: 599.60,
      dueDate: "30 days before departure"
    }
  ],
  dates: [
    { startDate: "Jun 15, 2025", endDate: "Jun 21, 2025", availability: "available" },
    { startDate: "Jul 10, 2025", endDate: "Jul 16, 2025", availability: "available" },
    { startDate: "Aug 5, 2025", endDate: "Aug 11, 2025", availability: "limited" },
    { startDate: "Sep 12, 2025", endDate: "Sep 18, 2025", availability: "sold_out" }
  ],
  agentInfo: {
    name: "Bali Spiritual Journeys",
    rating: 4.8,
    reviewCount: 124,
    yearsOperating: 7,
    license: "BTM-45693",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60"
  }
};

export default function GuidedTripDetailsPage() {
  const [selectedBookingDate, setSelectedBookingDate] = useState<number | null>(null);
  const [currentPaymentSchedule, setCurrentPaymentSchedule] = useState<DynamicPayment | null>(null);
  
  const handlePaymentScheduleChange = (schedule: DynamicPayment) => {
    setCurrentPaymentSchedule(schedule);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{tripData.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{tripData.location}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex gap-2">
            <Clipboard className="h-4 w-4" />
            Duplicate
          </Button>
          <Button>Edit Trip</Button>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Trip Details</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="payment">Payment Plan</TabsTrigger>
          <TabsTrigger value="dynamic-payment">Dynamic Payment</TabsTrigger>
          <TabsTrigger value="dates">Available Dates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trip Overview</CardTitle>
              <CardDescription>
                Key information about this guided trip.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-base leading-relaxed">{tripData.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{tripData.duration} days</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                    <DollarSign className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">${tripData.basePrice}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Group Size</span>
                    <span className="font-medium">Max {tripData.maxParticipants}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Next Trip</span>
                    <span className="font-medium">{tripData.dates[0].startDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tripData.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What's Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tripData.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-red-500/20 text-red-600 flex items-center justify-center mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={tripData.agentInfo.avatar} 
                        alt={tripData.agentInfo.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{tripData.agentInfo.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-sm">{tripData.agentInfo.rating} ({tripData.agentInfo.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Years operating:</span>
                      <span className="font-medium">{tripData.agentInfo.yearsOperating} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">License number:</span>
                      <span className="font-medium">{tripData.agentInfo.license}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <Button className="w-full mt-2">View Agent Profile</Button>
                </CardContent>
              </Card>
              
              <Card className="mt-4 border-primary/50">
                <CardHeader>
                  <CardTitle>Trip Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-background border">
                    <File className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="font-medium block">Detailed Itinerary.pdf</span>
                      <span className="text-xs text-muted-foreground">2.3 MB</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-md bg-background border">
                    <File className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <span className="font-medium block">Packing List.pdf</span>
                      <span className="text-xs text-muted-foreground">1.1 MB</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle>Day-by-Day Itinerary</CardTitle>
              <CardDescription>
                Detailed plan for each day of the {tripData.duration}-day journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tripData.itinerary.map((day) => (
                  <div 
                    key={day.day} 
                    className="relative border-l-2 border-primary/30 pl-6 pb-6 last:pb-0"
                  >
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary" />
                    <div>
                      <h3 className="text-lg font-medium">Day {day.day}: {day.title}</h3>
                      <p className="mt-1 text-muted-foreground">{day.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {day.activities.map((activity, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/10">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Plan</CardTitle>
              <CardDescription>
                Payment schedule and pricing details for this trip.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Base Price</TableCell>
                        <TableCell className="text-right">${tripData.basePrice.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Initial Deposit</TableCell>
                        <TableCell className="text-right">${tripData.depositAmount.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Balance Due</TableCell>
                        <TableCell className="text-right">${(tripData.basePrice - tripData.depositAmount).toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Payment Schedule</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tripData.paymentSchedule.map((payment, i) => (
                        <TableRow key={i}>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment & Cancellation Policy</h3>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="payment">
                    <AccordionTrigger>Payment Terms</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">A non-refundable deposit of ${tripData.depositAmount} is required to secure your booking. The remaining balance is due 30 days prior to departure. For bookings made within 30 days of departure, full payment is required at the time of booking.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="cancellation">
                    <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 text-muted-foreground space-y-2">
                        <li>More than 60 days before departure: Deposit only</li>
                        <li>30-59 days before departure: 50% of total trip cost</li>
                        <li>15-29 days before departure: 75% of total trip cost</li>
                        <li>Less than 15 days before departure: 100% of total trip cost</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="refunds">
                    <AccordionTrigger>Refunds & Changes</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">All cancellations must be received in writing. Refunds will be processed within 14 business days. Trip date changes may be requested and are subject to availability and a change fee of $100 per person.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dynamic-payment">
          <DynamicPaymentCalculator
            totalAmount={tripData.basePrice}
            minimumDeposit={tripData.depositAmount}
            paymentTermMonths={6}
            agentInfo={{
              businessName: tripData.agentInfo.name,
              contactInfo: "info@balispiritualjourney.com"
            }}
            onPaymentScheduleChange={handlePaymentScheduleChange}
          />
        </TabsContent>
        
        <TabsContent value="dates">
          <Card>
            <CardHeader>
              <CardTitle>Available Departure Dates</CardTitle>
              <CardDescription>
                Select a departure date to see availability and booking details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripData.dates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedBookingDate === index ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedBookingDate(index)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{date.startDate} - {date.endDate}</div>
                          <div className="text-sm text-muted-foreground">
                            {tripData.duration} days trip
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {date.availability === 'available' && (
                          <Badge className="bg-green-500 hover:bg-green-500/90">Available</Badge>
                        )}
                        {date.availability === 'limited' && (
                          <Badge className="bg-amber-500 hover:bg-amber-500/90">Limited Spots</Badge>
                        )}
                        {date.availability === 'sold_out' && (
                          <Badge variant="outline" className="border-red-200 text-red-500">Sold Out</Badge>
                        )}
                      </div>
                    </div>
                    
                    {selectedBookingDate === index && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="text-sm mb-1">
                              <span className="text-muted-foreground">Availability:</span>
                              {' '}
                              {date.availability === 'available' && <span className="font-medium">{tripData.remainingSpots} spots left</span>}
                              {date.availability === 'limited' && <span className="font-medium">Only 2 spots left!</span>}
                              {date.availability === 'sold_out' && <span className="font-medium">No spots available</span>}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Price:</span>
                              {' '}
                              <span className="font-medium">${tripData.basePrice} per person</span>
                            </div>
                          </div>
                          
                          <div>
                            {date.availability !== 'sold_out' ? (
                              <Button className="w-full sm:w-auto">
                                Book Now
                              </Button>
                            ) : (
                              <Button disabled>Sold Out</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
