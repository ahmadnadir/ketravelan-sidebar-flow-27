
import React from "react";
import { CommunityTripForm } from "@/components/CommunityTrip/CommunityTripForm";

export default function CreateCommunityTripPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Create Community Trip
        </h1>
        <CommunityTripForm />
      </div>
    </div>
  );
}
