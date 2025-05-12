
import React, { useState } from "react";
import { User, Edit, MapPin, Calendar, Tag, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

// Sample user data
const travelerData = {
  id: "user-123",
  name: "Alex Johnson",
  avatar: "https://i.pravatar.cc/300?u=alex",
  bio: "Travel enthusiast and photographer. Love exploring new cultures, trying local cuisines and hiking mountains. Always looking for authentic experiences off the beaten path.",
  location: "San Francisco, CA",
  joinedDate: "March 2024",
  travelStyle: ["adventure", "culture", "photography", "foodie", "backpacking", "eco-friendly"],
  pastTrips: [
    {
      id: "trip1",
      title: "Hiking in Patagonia",
      location: "Chile & Argentina",
      date: "Jan 2025",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop&q=80",
      participants: 6
    },
    {
      id: "trip2",
      title: "Cultural Tour of Japan",
      location: "Tokyo, Kyoto, Osaka",
      date: "Sep 2024",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=300&fit=crop&q=80",
      participants: 4
    },
    {
      id: "trip3",
      title: "Beach Retreat in Bali",
      location: "Bali, Indonesia",
      date: "May 2024",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=500&h=300&fit=crop&q=80",
      participants: 8
    }
  ],
  upcomingTrips: [
    {
      id: "trip4",
      title: "Exploring Bali's Hidden Gems",
      location: "Bali, Indonesia",
      date: "Jun 2025",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=300&fit=crop&q=80",
      participants: 5
    }
  ],
  stats: {
    trips: 12,
    countries: 18,
    companions: 42,
    reviews: 9
  }
};

// Schema for profile editing form
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }).max(500, { message: "Bio cannot exceed 500 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
  travelStyle: z.string().min(3, { message: "Add at least one travel style/interest" })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function TravelerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: travelerData.name,
      bio: travelerData.bio,
      location: travelerData.location,
      travelStyle: travelerData.travelStyle.join(", ")
    }
  });
  
  function onSubmit(data: ProfileFormValues) {
    console.log("Updated profile:", data);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  }

  const renderTripCard = (trip: any) => (
    <Card key={trip.id} className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{trip.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{trip.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{trip.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5 mr-1" />
            <span>{trip.participants} travelers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={travelerData.avatar} alt={travelerData.name} />
                <AvatarFallback>{travelerData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{travelerData.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {travelerData.location}
              </CardDescription>
              
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4" size="sm">
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile information
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself and your travel interests..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Briefly describe your travel style and interests.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="travelStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel Style & Interests</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="adventure, culture, photography, etc. (comma separated)"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Add tags that describe your travel preferences
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">About</h3>
                  <p className="text-sm text-muted-foreground">{travelerData.bio}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Travel Style & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {travelerData.travelStyle.map((style) => (
                      <Badge key={style} variant="secondary">
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Member Since</h3>
                  <p className="text-sm text-muted-foreground">{travelerData.joinedDate}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Travel Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-md p-3 text-center">
                      <div className="text-xl font-medium">{travelerData.stats.trips}</div>
                      <div className="text-xs text-muted-foreground">Trips</div>
                    </div>
                    <div className="bg-muted rounded-md p-3 text-center">
                      <div className="text-xl font-medium">{travelerData.stats.countries}</div>
                      <div className="text-xs text-muted-foreground">Countries</div>
                    </div>
                    <div className="bg-muted rounded-md p-3 text-center">
                      <div className="text-xl font-medium">{travelerData.stats.companions}</div>
                      <div className="text-xs text-muted-foreground">Co-Travelers</div>
                    </div>
                    <div className="bg-muted rounded-md p-3 text-center">
                      <div className="text-xl font-medium">{travelerData.stats.reviews}</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Trips Tabs */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Traveler Profile</h1>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4 w-full grid grid-cols-2 lg:w-auto">
              <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
              <TabsTrigger value="past">Trip History</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {travelerData.upcomingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travelerData.upcomingTrips.map(renderTripCard)}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming trips</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      You don't have any trips planned yet.
                    </p>
                    <Button>Create or Join a Trip</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {travelerData.pastTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travelerData.pastTrips.map(renderTripCard)}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Star className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No trip history</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Your completed trips will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
