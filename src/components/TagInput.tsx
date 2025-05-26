
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface TagInputProps {
  control: Control<any>;
  name: string;
}

export function TagInput({ control, name }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const tags = Array.isArray(field.value) ? field.value : [];

        const addTag = (tag: string) => {
          const trimmedTag = tag.trim().toLowerCase();
          if (trimmedTag && !tags.includes(trimmedTag)) {
            field.onChange([...tags, trimmedTag]);
          }
          setInputValue("");
        };

        const removeTag = (tagToRemove: string) => {
          field.onChange(tags.filter((tag: string) => tag !== tagToRemove));
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
          }
        };

        return (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(inputValue)}
                    disabled={!inputValue.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="pr-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Add tags to help others find your trip. Press Enter or comma to add each tag.
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
