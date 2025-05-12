
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Travel Better, Together</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Connect with fellow travelers or professional guides to create unforgettable journeys
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/discover")}>
              Explore Trips
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/create-community-trip")}>
              Create a Trip
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Trips Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden">
              <div className="h-48 bg-muted relative">
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
                <CardTitle>{trip.title}</CardTitle>
                <CardDescription>{trip.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{trip.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-medium">${trip.price}</p>
                  <p className="text-sm text-muted-foreground">{trip.duration} days</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate(trip.type === "Community" ? "/community-trip-details" : "/guided-trip-details")}
                >
                  {trip.type === "Community" ? "Join Trip" : "Book Trip"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 bg-muted/30 rounded-lg my-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.type} Trip</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// Sample data for the featured trips
const featuredTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    location: "Indonesia",
    description: "Explore the beautiful beaches and vibrant culture of Bali with like-minded travelers.",
    price: 1200,
    duration: 7,
    type: "Community",
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1935&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    location: "Japan",
    description: "Discover the bustling metropolis and serene temples of Tokyo with a professional guide.",
    price: 1800,
    duration: 5,
    type: "Guided",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1936&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Costa Rica Retreat",
    location: "Costa Rica",
    description: "Experience the lush rainforests and amazing wildlife in this tropical paradise.",
    price: 1500,
    duration: 10,
    type: "Community",
    image: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?q=80&w=1936&auto=format&fit=crop"
  }
];

// Sample data for testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    type: "Community",
    text: "The community trip to Thailand was amazing! I met so many wonderful people and we're already planning our next trip together."
  },
  {
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    type: "Guided",
    text: "Our guide in Peru was incredibly knowledgeable and made the trip unforgettable. Well worth every penny!"
  },
  {
    name: "Emma Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    type: "Community",
    text: "Being able to split costs and plan activities together made this the most affordable and fun trip I've ever taken."
  }
];
