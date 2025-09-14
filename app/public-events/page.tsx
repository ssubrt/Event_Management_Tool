"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";


const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

interface EventProps {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  maxAttendees: number | null;
  creator: {
    id: string;
    name: string | null;
  };
  _count: {
    rsvps: number;
  };
}

function PublicEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPublicEvents();
  }, []);

  const fetchPublicEvents = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth_token");
      if (!token) {
        return;
      }

      const response = await fetch("/api/public-events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      } else {
        toast.error("Failed to load public events");
      }
    } catch (error) {
      console.error("Error loading public events:", error);
      toast.error("Error loading public events");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Discover Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4 pb-2">
                  <Skeleton className="h-16 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Discover Events</h2>
          </div>
          <Card className="bg-muted/50">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                No public events available at the moment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Discover Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                <CardDescription>
                  by {event.creator.name || "Anonymous"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 pb-2">
                {event.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(event.startDate)}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                  )}
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event._count.rsvps} attendee(s)
                    {event.maxAttendees && ` / ${event.maxAttendees}`}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => router.push(`/event/${event.id}`)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View & RSVP
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicEvents;
