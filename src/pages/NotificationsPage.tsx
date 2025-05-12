
import React, { useState } from "react";
import { Bell, CheckCircle, Calendar, MessageCircle, CreditCard, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  type: "trip-update" | "message" | "payment" | "join-request" | "invite";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionText?: string;
  actionUrl?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-4 px-2.5">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark All as Read
        </Button>
      </div>

      <Card className="overflow-hidden">
        <ScrollArea className="h-[calc(100vh-220px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-1">
                You're all caught up!
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "flex p-4 md:p-5 hover:bg-muted/50",
                    !notification.read && "bg-muted/20"
                  )}
                >
                  <div className="mr-4 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      {notification.actionText && notification.actionUrl && (
                        <Button size="sm" asChild>
                          <a href={notification.actionUrl}>{notification.actionText}</a>
                        </Button>
                      )}
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}

// Helper function to format the timestamp
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return "Just now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }
  
  return format(date, "MMM d, yyyy");
}

// Helper function to get the appropriate icon for each notification type
function getNotificationIcon(type: string) {
  switch (type) {
    case "trip-update":
      return (
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-blue-600" />
        </div>
      );
    case "message":
      return (
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <MessageCircle className="h-4 w-4 text-green-600" />
        </div>
      );
    case "payment":
      return (
        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <CreditCard className="h-4 w-4 text-yellow-600" />
        </div>
      );
    case "join-request":
      return (
        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
          <User className="h-4 w-4 text-purple-600" />
        </div>
      );
    case "invite":
      return (
        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
          <MapPin className="h-4 w-4 text-red-600" />
        </div>
      );
    default:
      return (
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Bell className="h-4 w-4 text-gray-600" />
        </div>
      );
  }
}

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "trip-update",
    title: "Bali Trip Itinerary Updated",
    description: "The itinerary for your upcoming Bali trip has been updated. Check out the changes!",
    timestamp: new Date(2025, 4, 15, 10, 30),
    read: false,
    actionText: "View Updates",
    actionUrl: "/community-trip-details"
  },
  {
    id: "2",
    type: "message",
    title: "New Message from Sarah",
    description: "Sarah sent you a message about your upcoming trip to Japan.",
    timestamp: new Date(2025, 4, 14, 15, 45),
    read: false,
    actionText: "Reply",
    actionUrl: "/community-chat"
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Confirmed",
    description: "Your payment of $350 for the Tokyo Explorer trip has been confirmed.",
    timestamp: new Date(2025, 4, 13, 9, 20),
    read: true,
    actionText: "View Receipt",
    actionUrl: "/payment-history"
  },
  {
    id: "4",
    type: "join-request",
    title: "New Join Request",
    description: "Alex wants to join your Costa Rica Wildlife trip. Review their profile and approve or decline.",
    timestamp: new Date(2025, 4, 12, 14, 10),
    read: false,
    actionText: "Review Request",
    actionUrl: "/community-trip-details"
  },
  {
    id: "5",
    type: "invite",
    title: "Trip Invitation",
    description: "Maria invited you to join their 'Greek Island Hopping' trip in August.",
    timestamp: new Date(2025, 4, 11, 18, 5),
    read: true,
    actionText: "View Invitation",
    actionUrl: "/discover"
  },
  {
    id: "6",
    type: "trip-update",
    title: "Hotel Booking Confirmed",
    description: "The hotel for your stay in Rome has been confirmed. Check your itinerary for details.",
    timestamp: new Date(2025, 4, 10, 11, 30),
    read: true,
    actionText: "View Booking",
    actionUrl: "/community-trip-details"
  },
  {
    id: "7",
    type: "message",
    title: "Group Chat Message",
    description: "There are 5 new messages in the Bali Adventure group chat.",
    timestamp: new Date(2025, 4, 9, 20, 15),
    read: true,
    actionText: "Go to Chat",
    actionUrl: "/community-chat"
  },
  {
    id: "8",
    type: "payment",
    title: "Payment Request",
    description: "You have a pending payment of $120 for the shared accommodation in Costa Rica.",
    timestamp: new Date(2025, 4, 8, 12, 45),
    read: true,
    actionText: "Make Payment",
    actionUrl: "/payment-history"
  }
];
