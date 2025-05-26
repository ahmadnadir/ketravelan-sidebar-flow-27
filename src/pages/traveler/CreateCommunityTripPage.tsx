
import React from "react";
import { CommunityTripForm } from "@/components/CommunityTrip/CommunityTripForm";

export default function CreateCommunityTripPage() {
  return (
    <div className="container max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Community Trip</h1>
      <CommunityTripForm />
    </div>
  );
}
