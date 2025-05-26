
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Users, DollarSign } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ItineraryBuilder } from "@/components/ItineraryBuilder";
import { TagInput } from "@/components/TagInput";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  location: z.string().min(3, {
    message: "Location is required.",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(data => data.from && data.to, {
    message: "Date range is required.",
  }),
  groupSize: z.number().min(2, {
    message: "Group size must be at least 2.",
  }).max(20, {
    message: "Group size cannot exceed 20.",
  }),
  budget: z.number().min(100, {
    message: "Budget must be at least $100.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Add at least one tag.",
  }),
  itinerary: z.array(z.object({
    day: z.number(),
    title: z.string().min(1, "Activity title is required"),
    description: z.string().min(1, "Activity description is required"),
  })).min(1, {
    message: "Add at least one day to your itinerary.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateCommunityTripPage() {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  
  function onSubmit(data: FormValues) {
    console.log("Trip data:", data);
    
    // Show success toast
    toast({
      title: "Trip Created!",
      description: "Your community trip has been created successfully.",
    });
    
    // Redirect to trip details page (in a real app, would include the new trip ID)
    navigate("/community-trip-details");
  }

  return (
    <div className="container max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Community Trip</h1>
      
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
              {/* Trip Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer in Bali" {...field} />
                    </FormControl>
                    <FormDescription>
                      Create a catchy title for your trip
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="Bali, Indonesia" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Date Range */}
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Select date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value as DateRange}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Group Size */}
                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Group Size</FormLabel>
                      <div className="flex items-center gap-4">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Slider
                            defaultValue={[field.value]}
                            min={2}
                            max={20}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <span className="w-12 text-right">{field.value}</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Budget */}
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget per Person ($)</FormLabel>
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Slider
                            defaultValue={[field.value]}
                            min={100}
                            max={10000}
                            step={100}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                        </FormControl>
                        <span className="w-16 text-right">${field.value}</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your trip plans, activities, and what you're looking for in travel companions..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Tags */}
              <TagInput control={form.control} name="tags" />
              
              {/* Itinerary Builder */}
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
    </div>
  );
}
