
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

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
          <UserProfileCard userData={userData} />

          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            <DashboardTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              recentActivities={recentActivities}
              upcomingMatches={upcomingMatches}
              notifications={notifications}
              matchHistory={matchHistory}
              statsData={statsData}
              handleChallengeResponse={handleChallengeResponse}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
