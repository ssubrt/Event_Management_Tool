"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Download, 
  ExternalLink, 
  Edit,
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import Link from "next/link";

interface EventDetailsProps {
  params: {
    id: string;
  };
}

export default function EventDetailsPage({ params }: EventDetailsProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  
useEffect(() => {
  if (!authLoading && !isAuthenticated) {
    toast.error("You must be logged in to access this event.");
    router.push("/auth/login");
    return;
  }
  if (isAuthenticated && user) {
    fetchEventDetails();
  }
}, [isAuthenticated, authLoading, user, router, params.id]);

if (authLoading || !isAuthenticated || !user) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await fetch(`/api/events/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push("/auth/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else if (response.status === 404) {
        toast.error("Event not found");
        router.push("/events");
      } else {
        toast.error("Failed to fetch event details");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("An error occurred while fetching event details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAttendees = async () => {
    setIsExporting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/events/${params.id}/attendees/export`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `event-${params.id}-attendees.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Attendees exported successfully");
      } else {
        toast.error("Failed to export attendees");
      }
    } catch (error) {
      console.error("Error exporting attendees:", error);
      toast.error("An error occurred while exporting attendees");
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "text-green-600";
      case "PENDING":
        return "text-yellow-600";
      case "DECLINED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4" />;
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "DECLINED":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (authLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
            <Button asChild>
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                <p className="text-gray-600">Event details and attendee management</p>
              </div>
            </div>
            {/* <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/event/${event.id}`} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Public Page
                </Link>
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Event
              </Button>
            </div> */}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Event Information</CardTitle>
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
                        <h4 className="font-medium text-gray-900">har</h4>
                        <p className="text-gray-600">
                          {event.rsvps?.length || 0} registered
                          {event.maxAttendees && (
                            <> of {event.maxAttendees} max</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attendees Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Attendees ({event.rsvps?.length || 0})</CardTitle>
                      <CardDescription>
                        Manage and view all event attendees
                      </CardDescription>
                    </div>
                    {event.rsvps?.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={handleExportAttendees}
                        disabled={isExporting}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {isExporting ? "Exporting..." : "Export CSV"}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {event.rsvps?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>RSVP Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {event.rsvps.map((rsvp: any) => (
                            <TableRow key={rsvp.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {rsvp.name[0].toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div>{rsvp.name}</div>
                                    {rsvp.message && (
                                      <div className="text-xs text-gray-500 flex items-center">
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        Has message
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{rsvp.email}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                {rsvp.phone ? (
                                  <div className="flex items-center space-x-1">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{rsvp.phone}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center space-x-1 ${getStatusColor(rsvp.status)}`}>
                                  {getStatusIcon(rsvp.status)}
                                  <span className="capitalize">{rsvp.status.toLowerCase()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-600">
                                {format(new Date(rsvp.createdAt), "MMM d, yyyy")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No attendees yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Share your event to start getting RSVPs.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href={`/event/${event.id}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Public Page
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total RSVPs</span>
                    <span className="font-semibold">{event.rsvps?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Confirmed</span>
                    <span className="font-semibold text-green-600">
                      {event.rsvps?.filter((r: any) => r.status === "CONFIRMED").length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-semibold text-yellow-600">
                      {event.rsvps?.filter((r: any) => r.status === "PENDING").length || 0}
                    </span>
                  </div>
                  {event.maxAttendees && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold">
                        {Math.round(((event.rsvps?.length || 0) / event.maxAttendees) * 100)}%
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Creator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {event.creator.name?.[0] || event.creator.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {event.creator.name || "Event Creator"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.creator.email}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Public Event</span>
                    <Badge variant={event.isPublic ? "default" : "secondary"}>
                      {event.isPublic ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="text-sm">
                      {format(new Date(event.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="text-sm">
                      {format(new Date(event.updatedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}