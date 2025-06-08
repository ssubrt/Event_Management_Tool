"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MapPin, Users, MoreVertical, Edit, Trash2, Eye, ExternalLink } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    status: string;
    isPublic: boolean;
    creator: {
      id: string;
      name?: string;
      email: string;
    };
    _count: {
      rsvps: number;
    };
  };
  onEdit?: (event: any) => void;
  onDelete?: (eventId: string) => void;
  showActions?: boolean;
}

export function EventCard({ event, onEdit, onDelete, showActions = true }: EventCardProps) {
  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-800",
    PUBLISHED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    COMPLETED: "bg-blue-100 text-blue-800",
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {event.description || "No description provided"}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Badge 
              className={`${statusColors[event.status as keyof typeof statusColors]} capitalize`}
            >
              {event.status.toLowerCase()}
            </Badge>
            
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/events/${event.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/event/${event.id}`} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Public Page
                    </Link>
                  </DropdownMenuItem>
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(event)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onDelete && event.status !== 'COMPLETED' && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(event.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>
              {format(new Date(event.startDate), "PPp")}
              {event.endDate && (
                <> - {format(new Date(event.endDate), "PPp")}</>
              )}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{event._count.rsvps} attendees</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {event.creator.name?.[0] || event.creator.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {event.creator.name || event.creator.email}
            </span>
          </div>
          
          {event.isPublic && event.status === 'PUBLISHED' && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/event/${event.id}`}>
                View Public Page
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}