
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Match = {
  id: number;
  opponent: string;
  opponentRating: number;
  scheduledTime: string;
  timeLeft: string;
  difficulty: string;
};

type UpcomingMatchesTableProps = {
  matches: Match[];
};

const UpcomingMatchesTable: React.FC<UpcomingMatchesTableProps> = ({ matches }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-codeverse-blue" />
          Upcoming Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        {matches.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opponent</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Time Left</TableHead>
                <TableHead>Difficulty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.opponent}</TableCell>
                  <TableCell>{match.opponentRating}</TableCell>
                  <TableCell>{match.scheduledTime}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {match.timeLeft}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      match.difficulty === "hard" 
                        ? "bg-codeverse-pink" 
                        : match.difficulty === "medium" 
                        ? "bg-codeverse-blue" 
                        : "bg-codeverse-green"
                    }>
                      {match.difficulty}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-4 text-muted-foreground">No upcoming matches</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchesTable;
