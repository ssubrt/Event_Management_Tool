import { notFound } from "next/navigation";
import Link from "next/link"; // Import Link
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { RSVPForm } from "@/components/events/rsvp-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Import Button
import { Calendar, MapPin, Users, Clock, User, ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

interface EventPageProps {
  params: {
    id: string;
  };
}

async function getEvent(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { rsvps: true },
        },
      },
    });

    return event;
  } catch (error :any) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function PublicEventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id);

  if (!event || !event.isPublic || event.status !== "PUBLISHED") {
    notFound();
  }

  const isEventFull = event.maxAttendees && event._count.rsvps >= event.maxAttendees;
  const isEventPast = new Date(event.startDate) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {event.title}
            </h1>
            <p className="text-lg text-gray-600">
              You`re invited to join this event
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Event Details</CardTitle>
                  <Badge
                    variant={event.status === "PUBLISHED" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {event.status.toLowerCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {event.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                )}

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Date & Time</h4>
                      <p className="text-gray-600">
                        {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
                      </p>
                      <p className="text-gray-600">
                        {format(new Date(event.startDate), "h:mm a")}
                        {event.endDate && (
                          <> - {format(new Date(event.endDate), "h:mm a")}</>
                        )}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900">Location</h4>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Attendees</h4>
                      <p className="text-gray-600">
                        {event._count.rsvps} registered
                        {event.maxAttendees && (
                          <> of {event.maxAttendees} max</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Organizer</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {event.creator.name?.[0] || event.creator.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-gray-600">
                          {event.creator.name || event.creator.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {isEventPast && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-yellow-800 font-medium">
                        This event has already taken place.
                      </p>
                    </div>
                  </div>
                )}

                {isEventFull && !isEventPast && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-red-600 mr-2" />
                      <p className="text-red-800 font-medium">
                        This event is currently full.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RSVP Form */}
          <div className="lg:col-span-1">
            {!isEventPast && !isEventFull ? (
              <RSVPForm eventId={event.id} eventTitle={event.title} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>RSVP Not Available</CardTitle>
                  <CardDescription>
                    {isEventPast 
                      ? "This event has already taken place."
                      : "This event is currently full."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      {isEventPast ? (
                        <Clock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Users className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-500">
                      {isEventPast 
                        ? "We hope it was a great event!"
                        : "Check back later in case spots open up."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}