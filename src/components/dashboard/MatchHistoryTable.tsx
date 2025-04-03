
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
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
  date: string;
  result: string;
  ratingChange: string;
  problem: string;
};

type MatchHistoryTableProps = {
  matches: Match[];
};

const MatchHistoryTable: React.FC<MatchHistoryTableProps> = ({ matches }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-codeverse-purple" />
          Match History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Opponent</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Rating Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{match.date}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {match.opponent.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{match.opponent}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={match.problem}>
                  {match.problem}
                </TableCell>
                <TableCell>
                  <Badge className={
                    match.result === "win" 
                      ? "bg-codeverse-green" 
                      : "bg-codeverse-pink"
                  }>
                    {match.result === "win" ? "Victory" : "Defeat"}
                  </Badge>
                </TableCell>
                <TableCell className={
                  match.result === "win" 
                    ? "text-codeverse-green" 
                    : "text-codeverse-pink"
                }>
                  {match.ratingChange}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4">
          <Button variant="outline">Load More History</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchHistoryTable;
