
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ItineraryBuilder } from "@/components/ItineraryBuilder";
import { TagInput } from "@/components/TagInput";
import { BasicTripInfoSection } from "./BasicTripInfoSection";
import { DateRangeSection } from "./DateRangeSection";
import { GroupSizeBudgetSection } from "./GroupSizeBudgetSection";
import { communityTripFormSchema, CommunityTripFormValues } from "@/types/communityTrip";

export function CommunityTripForm() {
  const navigate = useNavigate();
  
  const form = useForm<CommunityTripFormValues>({
    resolver: zodResolver(communityTripFormSchema),
    defaultValues: {
      title: "",
      location: "",
      groupSize: 4,
      budget: 1000,
      description: "",
      tags: [],
      itinerary: [
        {
          day: 1,
          title: "",
          description: "",
        }
      ],
    },
  });
  
  function onSubmit(data: CommunityTripFormValues) {
    console.log("Trip data:", data);
    
    toast({
      title: "Trip Created!",
      description: "Your community trip has been created successfully.",
    });
    
    navigate("/community-trip-details");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Community Trip</CardTitle>
        <CardDescription>
          Plan a trip and find travel companions to share the experience.
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <BasicTripInfoSection control={form.control} />
            <DateRangeSection control={form.control} />
            <GroupSizeBudgetSection control={form.control} />
            <TagInput control={form.control} name="tags" />
            <ItineraryBuilder control={form.control} name="itinerary" />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Trip</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
