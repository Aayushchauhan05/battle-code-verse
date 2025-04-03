
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

type UserData = {
  username: string;
  avatar: string;
  rating: number;
  rank: number;
  winRate: number;
  totalBattles: number;
  winStreak: number;
  level: number;
};

type UserProfileCardProps = {
  userData: UserData;
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userData }) => {
  return (
    <Card className="w-full md:w-1/3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-codeverse-blue">
              <AvatarImage src={userData.avatar} alt={userData.username} />
              <AvatarFallback className="bg-codeverse-blue text-white text-xl">
                {userData.username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userData.username}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-codeverse-purple">Rank #{userData.rank}</Badge>
                <Badge className="bg-codeverse-blue">{userData.rating} ELO</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-lg font-semibold">{userData.winRate}%</span>
            <span className="text-sm text-muted-foreground">Win Rate</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-lg font-semibold">{userData.totalBattles}</span>
            <span className="text-sm text-muted-foreground">Battles</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-lg font-semibold">{userData.winStreak}</span>
            <span className="text-sm text-muted-foreground">Win Streak</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-lg font-semibold">{userData.level}</span>
            <span className="text-sm text-muted-foreground">Level</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Level Progress</span>
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" variant="default">
          Start New Battle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
