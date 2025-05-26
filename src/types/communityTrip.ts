
import { z } from "zod";

export const communityTripFormSchema = z.object({
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

export type CommunityTripFormValues = z.infer<typeof communityTripFormSchema>;
