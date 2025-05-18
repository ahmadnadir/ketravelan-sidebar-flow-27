
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { TipOrganizer } from "@/components/TipOrganizer";

interface GuidedChatHeaderProps {
  tripName: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function GuidedChatHeader({ tripName, organizer, currentUser }: GuidedChatHeaderProps) {
  return (
    <Card className="p-4 mb-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={organizer.avatar} alt={organizer.name} />
          <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{tripName}</h3>
          <p className="text-sm text-muted-foreground">Organized by {organizer.name}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <TipOrganizer 
          organizer={organizer} 
          currentUser={currentUser}
        />
      </div>
    </Card>
  );
}
