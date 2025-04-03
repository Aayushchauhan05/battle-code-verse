
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

type UpcomingMatch = {
  id: number;
  opponent: string;
  opponentRating: number;
  scheduledTime: string;
  timeLeft: string;
  difficulty: string;
};

type UpcomingMatchesPreviewProps = {
  matches: UpcomingMatch[];
};

const UpcomingMatchesPreview: React.FC<UpcomingMatchesPreviewProps> = ({ matches }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Upcoming Matches</CardTitle>
        <CardDescription>Your next coding battles</CardDescription>
      </CardHeader>
      <CardContent>
        {matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{match.opponent.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{match.opponent}</p>
                    <p className="text-xs text-muted-foreground">
                      {match.scheduledTime} · {match.difficulty} difficulty
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {match.timeLeft}
                  </Badge>
                  <Badge>{match.opponentRating}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-muted-foreground">No upcoming matches</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchesPreview;
