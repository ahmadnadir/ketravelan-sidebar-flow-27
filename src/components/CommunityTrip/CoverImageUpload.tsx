
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommunityTripFormValues } from "@/types/communityTrip";

interface CoverImageUploadProps {
  control: Control<CommunityTripFormValues>;
}

// Using placeholder images for demo purposes
const placeholderImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
];

export function CoverImageUpload({ control }: CoverImageUploadProps) {
  const [showImageSelector, setShowImageSelector] = useState(false);

  return (
    <FormField
      control={control}
      name="coverImage"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cover Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              {field.value ? (
                <div className="relative">
                  <img
                    src={field.value}
                    alt="Trip cover"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => field.onChange("")}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <Image className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose a cover image for your trip
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowImageSelector(!showImageSelector)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {showImageSelector && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {placeholderImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Option ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        field.onChange(imageUrl);
                        setShowImageSelector(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
