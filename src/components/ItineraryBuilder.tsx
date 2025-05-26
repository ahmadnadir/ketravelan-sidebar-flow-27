
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface ItineraryBuilderProps {
  control: Control<any>;
  name: string;
}

export function ItineraryBuilder({ control, name }: ItineraryBuilderProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addDay = () => {
    append({
      day: fields.length + 1,
      title: "",
      description: "",
    });
  };

  const removeDay = (index: number) => {
    remove(index);
    // Update day numbers after removal
    const currentValues = control._getWatch(name);
    const updatedValues = currentValues.map((item: ItineraryItem, i: number) => ({
      ...item,
      day: i + 1,
    }));
    control._reset({ [name]: updatedValues });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Trip Itinerary</h3>
        <Button type="button" variant="outline" size="sm" onClick={addDay}>
          <Plus className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </div>

      {fields.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No itinerary days added yet. Click "Add Day" to start planning your trip.
            </p>
          </CardContent>
        </Card>
      )}

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Day {index + 1}</CardTitle>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDay(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`${name}.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Arrival & Welcome Dinner"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name={`${name}.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the planned activities for this day..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
