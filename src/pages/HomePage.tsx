
import React from "react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome to Ketravelan</h1>
      <p className="text-lg mb-4">
        Your ultimate travel companion for both individual and guided trips.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-primary">Community Trips</h2>
          <p>Plan trips with friends and family, split expenses and chat in real-time.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-primary">Guided Experiences</h2>
          <p>Discover expert-led trips with professional travel agents for unique adventures.</p>
        </div>
      </div>
    </div>
  );
}
