
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus, Minus, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  inclusions: z.string().optional(),
  exclusions: z.string().optional(),
  availableDates: z.array(z.date()).min(1, { message: "At least one date is required" }),
  basePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  depositPercentage: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: "Deposit must be between 0% and 100%",
  }),
  maxParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Number of participants must be a positive number",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Duration must be a positive number",
  }),
  paymentSchedule: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateGuidedTripPage() {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [items, setItems] = useState<{ type: "inclusion" | "exclusion"; text: string }[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      inclusions: "",
      exclusions: "",
      availableDates: [],
      basePrice: "",
      depositPercentage: "20",
      maxParticipants: "10",
      duration: "7",
      paymentSchedule: "monthly",
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Check if date is already selected
    const dateExists = selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );
    
    if (dateExists) {
      // Remove date if already selected
      setSelectedDates(
        selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        )
      );
      form.setValue("availableDates", [
        ...selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        ),
      ]);
    } else {
      // Add date if not already selected
      setSelectedDates([...selectedDates, date]);
      form.setValue("availableDates", [...selectedDates, date]);
    }
  };

  const addItem = (type: "inclusion" | "exclusion") => {
    const fieldValue = type === "inclusion" 
      ? form.getValues("inclusions") 
      : form.getValues("exclusions");
    
    if (fieldValue && fieldValue.trim()) {
      setItems([...items, { type, text: fieldValue.trim() }]);
      form.setValue(type === "inclusion" ? "inclusions" : "exclusions", "");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const onSubmit = (values: FormValues) => {
    // Simulate submission
    console.log({
      ...values,
      basePrice: Number(values.basePrice),
      depositPercentage: Number(values.depositPercentage),
      maxParticipants: Number(values.maxParticipants),
      duration: Number(values.duration),
      inclusionsExclusions: items,
    });
    
    toast.success("Trip created successfully!", {
      description: "Your guided trip has been created and is now available for booking.",
    });
    
    navigate("/guided-trip-details");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create a Guided Trip</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>
                Provide the basic information about your guided trip.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Ancient Temples of Bali Tour" {...field} />
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
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bali, Indonesia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the experience travelers can expect..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Included & What's Not</CardTitle>
              <CardDescription>
                Specify what is included and excluded from your trip package.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Inclusions</h3>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="inclusions"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder="e.g. Airport transfers" 
                              {...field} 
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addItem("inclusion");
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => addItem("inclusion")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-md p-3 min-h-[150px] bg-background">
                    {items.filter(item => item.type === "inclusion").map((item, index) => (
                      <div key={`inc-${index}`} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span>• {item.text}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => removeItem(items.indexOf(item))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {items.filter(item => item.type === "inclusion").length === 0 && (
                      <p className="text-muted-foreground text-sm italic p-2">No inclusions added yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Exclusions</h3>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="exclusions"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder="e.g. Personal expenses" 
                              {...field} 
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addItem("exclusion");
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => addItem("exclusion")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-md p-3 min-h-[150px] bg-background">
                    {items.filter(item => item.type === "exclusion").map((item, index) => (
                      <div key={`exc-${index}`} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span>• {item.text}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => removeItem(items.indexOf(item))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {items.filter(item => item.type === "exclusion").length === 0 && (
                      <p className="text-muted-foreground text-sm italic p-2">No exclusions added yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Upload Itinerary Document</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload a detailed itinerary in PDF or image format</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="border border-dashed rounded-md p-8 mt-2 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop your files or <span className="text-primary cursor-pointer">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, JPG, PNG (max 10MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trip Dates & Availability</CardTitle>
              <CardDescription>
                Set available departure dates and trip duration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="availableDates"
                render={() => (
                  <FormItem>
                    <FormLabel>Available Departure Dates</FormLabel>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select multiple dates when this trip will be available
                    </p>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDates.length > 0
                              ? `${selectedDates.length} date${selectedDates.length > 1 ? 's' : ''} selected`
                              : "Select available dates"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={(dates) => {
                              if (Array.isArray(dates)) {
                                setSelectedDates(dates);
                                form.setValue("availableDates", dates);
                              }
                            }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      
                      {selectedDates.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedDates.map((date, i) => (
                            <div 
                              key={i} 
                              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md flex items-center gap-1"
                            >
                              {format(date, "MMM d, yyyy")}
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-4 w-4 p-0 text-primary"
                                onClick={() => {
                                  const newDates = selectedDates.filter((d) => d !== date);
                                  setSelectedDates(newDates);
                                  form.setValue("availableDates", newDates);
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Duration (days)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Payment</CardTitle>
              <CardDescription>
                Set pricing details and payment schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="depositPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deposit Percentage (%)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Participants</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="paymentSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Schedule</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full payment upfront</SelectItem>
                          <SelectItem value="deposit">Deposit + Full payment before trip</SelectItem>
                          <SelectItem value="monthly">Monthly installments</SelectItem>
                          <SelectItem value="custom">Custom schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <CardFooter className="flex justify-end border rounded-lg p-4 bg-background">
            <Button type="submit" className="w-full md:w-auto">Create Guided Trip</Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
