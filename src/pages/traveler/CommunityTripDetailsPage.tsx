
import React, { useState } from "react";
import { MapPin, Calendar, Users, DollarSign, Tag, MessageSquare, User, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock data for the community trip
const tripDetails = {
  id: "trip-123",
  title: "Exploring Bali's Hidden Gems",
  location: "Bali, Indonesia",
  dateRange: "Jun 15 - Jun 30, 2025",
  creator: {
    id: "user-1",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  description: "Join me on an adventure to discover Bali beyond the tourist spots. We'll explore hidden beaches, local villages, authentic cuisine, and immerse ourselves in Balinese culture. This trip is perfect for photography enthusiasts and those seeking authentic cultural experiences.",
  itinerary: [
    { day: 1, title: "Arrival & Welcome Dinner", description: "Check in to our villa in Ubud, welcome drinks and dinner" },
    { day: 2, title: "Sacred Monkey Forest & Rice Terraces", description: "Morning visit to the Monkey Forest, afternoon exploring Tegalalang Rice Terraces" },
    { day: 3, title: "Mount Batur Sunrise Trek", description: "Early morning hike to catch the sunrise, afternoon free for spa treatments" },
    { day: 4, title: "Traditional Cooking Class", description: "Learn to make authentic Balinese dishes with local ingredients" },
    { day: 5, title: "Beach Day & Night Market", description: "Relaxing day at Nusa Dua beach followed by evening at local market" }
  ],
  budget: 1200,
  maxGroupSize: 8,
  currentMembers: 5,
  tags: ["beach", "culture", "photography", "food", "adventure"],
  members: [
    { id: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", isCreator: true },
    { id: "user-2", name: "Miguel Torres", avatar: "https://i.pravatar.cc/150?u=miguel", isCreator: false },
    { id: "user-3", name: "Aisha Patel", avatar: "https://i.pravatar.cc/150?u=aisha", isCreator: false },
    { id: "user-4", name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david", isCreator: false },
    { id: "user-5", name: "Olivia Johnson", avatar: "https://i.pravatar.cc/150?u=olivia", isCreator: false },
  ],
};

export default function CommunityTripDetailsPage() {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  
  const handleJoinTrip = () => {
    setIsJoined(true);
    toast({
      title: "Trip Joined!",
      description: "You have successfully joined this community trip.",
    });
  };
  
  const handleChat = () => {
    navigate("/community-chat");
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trip Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{tripDetails.title}</h1>
            <div className="flex gap-2">
              {isJoined ? (
                <Button onClick={handleChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Chat
                </Button>
              ) : (
                <Button onClick={handleJoinTrip}>
                  <Users className="mr-2 h-4 w-4" />
                  Join Trip
                </Button>
              )}
            </div>
          </div>

          {/* Trip Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Trip Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{tripDetails.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{tripDetails.dateRange}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{tripDetails.currentMembers}/{tripDetails.maxGroupSize} travelers</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>${tripDetails.budget} per person</span>
                </div>
              </div>
              
              {/* Created By */}
              <div className="flex items-center mt-4">
                <span className="text-sm text-muted-foreground mr-2">Created by:</span>
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={tripDetails.creator.avatar} alt={tripDetails.creator.name} />
                  <AvatarFallback>{tripDetails.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{tripDetails.creator.name}</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tripDetails.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium mb-2">About this trip</h3>
                <p className="text-muted-foreground">{tripDetails.description}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle>Itinerary</CardTitle>
              <CardDescription>Planned activities and schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripDetails.itinerary.map((item) => (
                  <div key={item.day} className="border-l-2 border-primary pl-4 ml-2">
                    <h4 className="font-semibold">Day {item.day}: {item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Participants */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>
                {tripDetails.currentMembers}/{tripDetails.maxGroupSize} travelers joined
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripDetails.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        {member.isCreator && (
                          <div className="text-xs text-muted-foreground">Trip Creator</div>
                        )}
                      </div>
                    </div>
                    {member.isCreator && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {isJoined ? (
                <Button variant="outline" className="w-full" onClick={handleChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Open Group Chat
                </Button>
              ) : (
                <Button className="w-full" onClick={handleJoinTrip}>
                  <User className="mr-2 h-4 w-4" />
                  Join This Trip
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
