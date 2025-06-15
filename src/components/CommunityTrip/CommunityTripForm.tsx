
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
import { CoverImageUpload } from "./CoverImageUpload";
import { communityTripFormSchema, CommunityTripFormValues } from "@/types/communityTrip";

export function CommunityTripForm() {
  const navigate = useNavigate();
  
  const form = useForm<CommunityTripFormValues>({
    resolver: zodResolver(communityTripFormSchema),
    defaultValues: {
      title: "",
      location: "",
      coverImage: "",
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
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">New Community Trip</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Plan a trip and find travel companions to share the experience.
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardContent className="space-y-6 px-4 sm:px-6">
            <BasicTripInfoSection control={form.control} />
            <CoverImageUpload control={form.control} />
            <DateRangeSection control={form.control} />
            <GroupSizeBudgetSection control={form.control} />
            <TagInput control={form.control} name="tags" />
            <ItineraryBuilder control={form.control} name="itinerary" />
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 px-4 sm:px-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto order-1 sm:order-2">
              Create Trip
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
