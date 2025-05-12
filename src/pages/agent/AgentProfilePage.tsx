
import React, { useState } from "react";
import { 
  Upload, 
  Edit, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Star, 
  Award, 
  Calendar, 
  FileText, 
  Users,
  Check
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Sample data for agent profile
const agentProfile = {
  name: "Bali Spiritual Journeys",
  location: "Denpasar, Bali, Indonesia",
  about: "Founded in 2018, Bali Spiritual Journeys specializes in authentic cultural experiences throughout Bali and Indonesia. Our expert guides are all locally born and trained in sustainable tourism practices. We focus on small-group experiences that connect travelers with local traditions, sacred sites, and hidden gems, while ensuring respectful interactions with local communities.",
  rating: 4.8,
  reviews: 124,
  contactInfo: {
    email: "info@balispiritualjourney.com",
    phone: "+62 812 3456 7890",
    website: "www.balispiritualjourney.com"
  },
  licenses: [
    { name: "BTM-45693", issuer: "Bali Tourism Board", expiry: "2026-05-15" },
    { name: "INT-78321", issuer: "International Tour Operators Alliance", expiry: "2025-12-31" }
  ],
  specialties: ["Cultural Tours", "Temple Visits", "Spiritual Retreats", "Adventure Trekking", "Food Tours"],
  languages: ["English", "Indonesian", "Japanese", "Mandarin"],
  logo: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=300&auto=format&fit=crop",
  coverPhoto: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1000&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1558005530-a7958896ec60?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=300&auto=format&fit=crop"
  ],
  featuredTrips: [
    {
      id: "GT-12345",
      title: "Sacred Temples of Bali Tour",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=600&auto=format&fit=crop",
      duration: 7,
      price: 1499,
      nextDate: "2025-06-15"
    },
    {
      id: "GT-12346",
      title: "Ubud Spiritual Retreat",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
      duration: 5,
      price: 899,
      nextDate: "2025-07-10"
    },
    {
      id: "GT-12347",
      title: "Bali Rice Terrace & Water Temple Explorer",
      image: "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?q=80&w=600&auto=format&fit=crop",
      duration: 3,
      price: 699,
      nextDate: "2025-05-05"
    }
  ],
  awards: [
    { name: "Best Cultural Tour Operator 2024", issuer: "Bali Tourism Awards" },
    { name: "Sustainable Tourism Excellence", issuer: "Green Travel Alliance" }
  ]
};

export default function AgentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize the form with current profile data
  const form = useForm({
    defaultValues: {
      name: agentProfile.name,
      location: agentProfile.location,
      about: agentProfile.about,
      email: agentProfile.contactInfo.email,
      phone: agentProfile.contactInfo.phone,
      website: agentProfile.contactInfo.website,
    }
  });
  
  const handleSaveProfile = (data: any) => {
    console.log("Updated profile data:", data);
    
    // In a real app, you would save this data to your backend
    toast.success("Profile updated successfully!", {
      description: "Your agent profile changes have been saved.",
    });
    
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Cover image and profile top section */}
      <div className="relative mb-20 rounded-lg overflow-hidden">
        <div className="h-64 w-full relative">
          <img
            src={agentProfile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={agentProfile.logo} alt={agentProfile.name} />
            <AvatarFallback>BSJ</AvatarFallback>
          </Avatar>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          Change Cover
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{agentProfile.name}</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{agentProfile.location}</span>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Badge className="bg-primary hover:bg-primary">
            <Star className="h-3.5 w-3.5 mr-1 text-white fill-white" />
            <span>{agentProfile.rating} ({agentProfile.reviews} reviews)</span>
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="mx-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="trips">Published Trips</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your agency information and details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
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
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About</FormLabel>
                          <FormControl>
                            <Textarea rows={5} {...field} />
                          </FormControl>
                          <FormDescription>
                            A brief description of your agency and the unique experiences you offer.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" className="mr-2">
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>About</CardTitle>
                      <CardDescription>
                        Your agency description and specialties
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {agentProfile.about}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {agentProfile.specialties.map((specialty, i) => (
                            <Badge key={i} variant="secondary">{specialty}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {agentProfile.languages.map((language, i) => (
                            <Badge key={i} variant="outline">{language}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                    <CardDescription>Images from your guided trips</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {agentProfile.gallery.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Gallery image ${index + 1}`} 
                            className="object-cover w-full h-full" 
                          />
                        </div>
                      ))}
                      <div className="aspect-square rounded-md border-2 border-dashed flex items-center justify-center bg-muted/50">
                        <Button variant="ghost" className="flex flex-col h-full w-full">
                          <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Add Photo</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span>{agentProfile.contactInfo.email}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{agentProfile.contactInfo.phone}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span>{agentProfile.contactInfo.website}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Licenses & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {agentProfile.licenses.map((license, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{license.name}</p>
                            <p className="text-sm text-muted-foreground">{license.issuer}</p>
                            <p className="text-xs text-muted-foreground">
                              Expires: {new Date(license.expiry).toLocaleDateString()}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="outline" className="w-full mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Add License
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Awards & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {agentProfile.awards.map((award, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{award.name}</p>
                            <p className="text-sm text-muted-foreground">{award.issuer}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="trips">
          <h2 className="text-xl font-bold mb-4">Published Trips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProfile.featuredTrips.map((trip, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={trip.image} 
                    alt={trip.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-lg line-clamp-1">{trip.title}</h3>
                  <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{trip.duration} days</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>From ${trip.price}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Next departure: {new Date(trip.nextDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Create New Trip Card */}
            <Card className="overflow-hidden border-dashed">
              <div className="aspect-video flex items-center justify-center bg-muted/50">
                <div className="flex flex-col items-center text-center p-6">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="font-medium">Create a new trip</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add more guided trips to attract travelers
                  </p>
                </div>
              </div>
              <CardFooter className="mt-4">
                <Button className="w-full">Create New Trip</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          {/* Reviews tab content - placeholder for future implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>
                Reviews from travelers who booked your guided trips
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Star className="h-10 w-10 text-amber-400 mb-4" />
              <h3 className="text-2xl font-bold">{agentProfile.rating}/5.0</h3>
              <p className="text-muted-foreground mb-6">Based on {agentProfile.reviews} reviews</p>
              
              <div className="w-full max-w-md p-6 bg-muted/50 rounded-lg">
                <p className="text-center text-muted-foreground">
                  Detailed reviews will be displayed here. This feature is coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
