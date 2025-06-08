"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, CheckCircle } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalEvents: number;
    publishedEvents: number;
    totalRsvps: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      description: "Events created",
    },
    {
      title: "Published Events",
      value: stats.publishedEvents,
      icon: CheckCircle,
      description: "Live events",
    },
    {
      title: "Total RSVPs",
      value: stats.totalRsvps,
      icon: Users,
      description: "Total attendees",
    },
    {
      title: "Average RSVPs",
      value: stats.totalEvents > 0 ? Math.round(stats.totalRsvps / stats.totalEvents) : 0,
      icon: TrendingUp,
      description: "Per event",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}