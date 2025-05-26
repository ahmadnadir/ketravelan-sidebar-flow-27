
import React from "react";
import { Control } from "react-hook-form";
import { Users, DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommunityTripFormValues } from "@/types/communityTrip";

interface GroupSizeBudgetSectionProps {
  control: Control<CommunityTripFormValues>;
}

export function GroupSizeBudgetSection({ control }: GroupSizeBudgetSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
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
      
      <FormField
        control={control}
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
  );
}
