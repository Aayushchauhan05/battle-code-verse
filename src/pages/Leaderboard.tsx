
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Medal, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { 
      id: 1, 
      rank: 1, 
      name: "CodingWizard", 
      rating: 2145, 
      avatar: "/placeholder.svg", 
      winRate: 76,
      battles: 320,
      rankChange: "up"
    },
    { 
      id: 2, 
      rank: 2, 
      name: "AlgorithmQueen", 
      rating: 2089, 
      avatar: "/placeholder.svg", 
      winRate: 71,
      battles: 285, 
      rankChange: "same"
    },
    { 
      id: 3, 
      rank: 3, 
      name: "ByteMaster", 
      rating: 1967, 
      avatar: "/placeholder.svg", 
      winRate: 68,
      battles: 410, 
      rankChange: "up"
    },
    { 
      id: 4, 
      rank: 4, 
      name: "CodeNinja", 
      rating: 1854, 
      avatar: "/placeholder.svg", 
      winRate: 64,
      battles: 198, 
      rankChange: "down"
    },
    { 
      id: 5, 
      rank: 5, 
      name: "SyntaxSorcerer", 
      rating: 1812, 
      avatar: "/placeholder.svg", 
      winRate: 62,
      battles: 276, 
      rankChange: "up"
    },
    { 
      id: 6, 
      rank: 6, 
      name: "DevDragon", 
      rating: 1788, 
      avatar: "/placeholder.svg", 
      winRate: 60,
      battles: 305, 
      rankChange: "down"
    },
    { 
      id: 7, 
      rank: 7, 
      name: "ProgramProdigy", 
      rating: 1732, 
      avatar: "/placeholder.svg", 
      winRate: 58,
      battles: 186, 
      rankChange: "same"
    },
    { 
      id: 8, 
      rank: 8, 
      name: "LogicLegend", 
      rating: 1705, 
      avatar: "/placeholder.svg", 
      winRate: 56,
      battles: 234, 
      rankChange: "up"
    },
    { 
      id: 9, 
      rank: 9, 
      name: "FunctionFury", 
      rating: 1690, 
      avatar: "/placeholder.svg", 
      winRate: 55,
      battles: 190, 
      rankChange: "down"
    },
    { 
      id: 10, 
      rank: 10, 
      name: "RecursionRanger", 
      rating: 1675, 
      avatar: "/placeholder.svg", 
      winRate: 54,
      battles: 218, 
      rankChange: "same"
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-gray-400" />;
    if (rank === 3) return <Medal className="h-4 w-4 text-amber-700" />;
    return <span className="text-muted-foreground font-mono">{rank}</span>;
  };

  const getRankChangeIcon = (change: string) => {
    if (change === "up") return <ArrowUp className="h-4 w-4 text-codeverse-green" />;
    if (change === "down") return <ArrowDown className="h-4 w-4 text-codeverse-pink" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 2000) return "text-yellow-400 font-bold";
    if (rating >= 1800) return "text-codeverse-purple font-bold";
    if (rating >= 1600) return "text-codeverse-blue font-bold";
    return "text-foreground";
  };

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-codeverse-blue" />
              Global Leaderboard
            </h1>
            <p className="text-muted-foreground">
              The top coding warriors ranked by their performance
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-codeverse-purple text-white py-1 px-3">Season 1</Badge>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-400">2000+</span>
              <span>Grandmaster</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-codeverse-purple">1800+</span>
              <span>Master</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-codeverse-blue">1600+</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead className="text-right">Win Rate</TableHead>
                  <TableHead className="text-right">Battles</TableHead>
                  <TableHead className="text-right w-24">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((player) => (
                  <TableRow 
                    key={player.id} 
                    className={player.rank <= 3 ? "bg-gradient-to-r from-transparent via-codeverse-purple/5 to-transparent" : ""}
                  >
                    <TableCell className="font-medium flex items-center gap-2">
                      {getRankIcon(player.rank)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className={`
                            ${player.rank === 1 ? 'bg-codeverse-blue' : 
                              player.rank === 2 ? 'bg-codeverse-purple' :
                              player.rank === 3 ? 'bg-codeverse-pink' :
                              'bg-muted'
                            } text-white
                          `}>
                            {player.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={getRatingClass(player.rating)}>
                        {player.rating}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{player.winRate}%</TableCell>
                    <TableCell className="text-right">{player.battles}</TableCell>
                    <TableCell className="text-right">
                      {getRankChangeIcon(player.rankChange)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
