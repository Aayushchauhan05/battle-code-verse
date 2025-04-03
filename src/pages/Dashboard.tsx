
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  Calendar,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  BarChart,
  Award,
  User,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock user data
  const userData = {
    username: "CodingWizard",
    avatar: "/placeholder.svg",
    rating: 2145,
    rank: 1,
    winRate: 76,
    totalBattles: 320,
    winStreak: 5,
    level: 42,
  };

  // Mock match history data
  const matchHistory = [
    {
      id: 1,
      opponent: "AlgorithmQueen",
      opponentRating: 2089,
      date: "2025-04-02",
      result: "win",
      ratingChange: "+15",
      problem: "Binary Tree Maximum Path Sum",
    },
    {
      id: 2,
      opponent: "ByteMaster",
      opponentRating: 1967,
      date: "2025-04-01",
      result: "win",
      ratingChange: "+12",
      problem: "Merge Intervals",
    },
    {
      id: 3,
      opponent: "CodeNinja",
      opponentRating: 1854,
      date: "2025-03-29",
      result: "loss",
      ratingChange: "-10",
      problem: "LRU Cache Implementation",
    },
    {
      id: 4,
      opponent: "SyntaxSorcerer",
      opponentRating: 1812,
      date: "2025-03-27",
      result: "win",
      ratingChange: "+13",
      problem: "Word Break Problem",
    },
    {
      id: 5,
      opponent: "DevDragon",
      opponentRating: 1788,
      date: "2025-03-25",
      result: "win",
      ratingChange: "+11",
      problem: "Regular Expression Matching",
    },
  ];

  // Mock upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      opponent: "LogicLegend",
      opponentRating: 2201,
      scheduledTime: "2025-04-04 15:00",
      timeLeft: "23 hours",
      difficulty: "hard",
    },
    {
      id: 2,
      opponent: "FunctionFury",
      opponentRating: 2089,
      scheduledTime: "2025-04-06 10:30",
      timeLeft: "3 days",
      difficulty: "medium",
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "challenge",
      from: "RecursionRanger",
      fromRating: 2010,
      time: "2 hours ago",
      status: "pending",
      scheduledTime: "2025-04-05 13:00",
    },
    {
      id: 2,
      type: "system",
      message: "New weekly challenge available!",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "achievement",
      message: "You've reached level 42!",
      achievement: "Code Master",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "challenge",
      from: "LogicLoremaster",
      fromRating: 2250,
      time: "2 days ago",
      status: "pending",
      scheduledTime: "2025-04-07 16:00",
    },
  ];

  const handleChallengeResponse = (notificationId, response) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      toast({
        title: response === "accept" ? "Challenge Accepted!" : "Challenge Declined",
        description: response === "accept" 
          ? `You will face ${notification.from} on ${notification.scheduledTime}.`
          : `You have declined the challenge from ${notification.from}.`,
      });
    }
  };

  // Recent activities
  const recentActivities = [
    { id: 1, type: "level-up", message: "Reached Level 42", time: "2 hours ago" },
    { id: 2, type: "rating", message: "Rating increased to 2145", time: "1 day ago" },
    { id: 3, type: "achievement", message: "Earned 'Winning Streak' badge", time: "3 days ago" },
  ];

  // Statistics data
  const statsData = {
    languagesUsed: [
      { language: "JavaScript", percentage: 45 },
      { language: "Python", percentage: 30 },
      { language: "Java", percentage: 15 },
      { language: "C++", percentage: 10 },
    ],
    problemsSolved: {
      easy: 120,
      medium: 85,
      hard: 42,
      total: 247,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          {/* User Profile Card */}
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

          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="gap-2">
                  <BarChart className="h-4 w-4" /> Overview
                </TabsTrigger>
                <TabsTrigger value="matches" className="gap-2">
                  <Trophy className="h-4 w-4" /> Matches
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="stats" className="gap-2">
                  <Award className="h-4 w-4" /> Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Recent Activity */}
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className="bg-muted/30 p-2 rounded-full">
                            {activity.type === "level-up" && <User className="h-4 w-4" />}
                            {activity.type === "rating" && <BarChart className="h-4 w-4" />}
                            {activity.type === "achievement" && <Award className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Matches Preview */}
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming Matches</CardTitle>
                    <CardDescription>Your next coding battles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingMatches.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingMatches.map((match) => (
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

                {/* Notifications Preview */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Notifications</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {notifications.filter(n => n.type === "challenge" && n.status === "pending").length}
                      </Badge>
                    </div>
                    <CardDescription>Your pending challenges and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {notifications.slice(0, 2).map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 border-b border-border last:border-0">
                        <div className={`p-2 rounded-full ${
                          notification.type === "challenge" 
                            ? "bg-codeverse-purple/10" 
                            : notification.type === "achievement" 
                            ? "bg-codeverse-blue/10" 
                            : "bg-muted/30"
                        }`}>
                          {notification.type === "challenge" && <Trophy className="h-4 w-4 text-codeverse-purple" />}
                          {notification.type === "system" && <Bell className="h-4 w-4" />}
                          {notification.type === "achievement" && <Award className="h-4 w-4 text-codeverse-blue" />}
                        </div>
                        <div className="flex-1">
                          {notification.type === "challenge" ? (
                            <div>
                              <p className="font-medium">Challenge from {notification.from}</p>
                              <p className="text-xs text-muted-foreground mb-3">
                                {notification.scheduledTime} · {notification.fromRating} ELO
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Button 
                                  size="sm" 
                                  className="h-8" 
                                  onClick={() => handleChallengeResponse(notification.id, "accept")}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => handleChallengeResponse(notification.id, "decline")}
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Decline
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium">{notification.message}</p>
                              {notification.achievement && (
                                <Badge className="mt-1 bg-codeverse-blue">{notification.achievement}</Badge>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {notifications.length > 2 && (
                      <Button 
                        variant="ghost" 
                        className="w-full mt-2" 
                        onClick={() => setActiveTab("notifications")}
                      >
                        View all notifications
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="matches">
                <div className="space-y-6">
                  {/* Upcoming Matches */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-codeverse-blue" />
                        Upcoming Matches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {upcomingMatches.length > 0 ? (
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
                            {upcomingMatches.map((match) => (
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

                  {/* Match History */}
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
                          {matchHistory.map((match) => (
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
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-codeverse-blue" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border border-border rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              notification.type === "challenge" 
                                ? "bg-codeverse-purple/10" 
                                : notification.type === "achievement" 
                                ? "bg-codeverse-blue/10" 
                                : "bg-muted/30"
                            }`}>
                              {notification.type === "challenge" && <Trophy className="h-4 w-4 text-codeverse-purple" />}
                              {notification.type === "system" && <Bell className="h-4 w-4" />}
                              {notification.type === "achievement" && <Award className="h-4 w-4 text-codeverse-blue" />}
                            </div>
                            <div className="flex-1">
                              {notification.type === "challenge" ? (
                                <div>
                                  <p className="font-medium">Challenge from {notification.from}</p>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    {notification.scheduledTime} · {notification.fromRating} ELO · {notification.time}
                                  </p>
                                  {notification.status === "pending" && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Button 
                                        size="sm" 
                                        className="h-8" 
                                        onClick={() => handleChallengeResponse(notification.id, "accept")}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" /> Accept
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8"
                                        onClick={() => handleChallengeResponse(notification.id, "decline")}
                                      >
                                        <XCircle className="h-4 w-4 mr-1" /> Decline
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div>
                                  <p className="font-medium">{notification.message}</p>
                                  {notification.achievement && (
                                    <Badge className="mt-1 bg-codeverse-blue">{notification.achievement}</Badge>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <div className="space-y-6">
                  {/* Languages Used */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-codeverse-blue" />
                        Languages Used
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {statsData.languagesUsed.map((lang) => (
                          <div key={lang.language}>
                            <div className="flex items-center justify-between mb-1">
                              <span>{lang.language}</span>
                              <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                            </div>
                            <Progress value={lang.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Problems Solved */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-codeverse-purple" />
                        Problems Solved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-lg font-semibold text-codeverse-green">{statsData.problemsSolved.easy}</span>
                          <span className="text-sm text-muted-foreground">Easy</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-lg font-semibold text-codeverse-blue">{statsData.problemsSolved.medium}</span>
                          <span className="text-sm text-muted-foreground">Medium</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-lg font-semibold text-codeverse-pink">{statsData.problemsSolved.hard}</span>
                          <span className="text-sm text-muted-foreground">Hard</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-lg font-semibold">{statsData.problemsSolved.total}</span>
                          <span className="text-sm text-muted-foreground">Total</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
