
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Trophy, Bell, Award } from "lucide-react";
import RecentActivity from "./RecentActivity";
import UpcomingMatchesPreview from "./UpcomingMatchesPreview";
import NotificationsPreview from "./NotificationsPreview";
import MatchHistoryTable from "./MatchHistoryTable";
import UpcomingMatchesTable from "./UpcomingMatchesTable";
import NotificationsFullList from "./NotificationsFullList";
import StatsDisplay from "./StatsDisplay";

type DashboardTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  recentActivities: any[];
  upcomingMatches: any[];
  notifications: any[];
  matchHistory: any[];
  statsData: {
    languagesUsed: any[];
    problemsSolved: {
      easy: number;
      medium: number;
      hard: number;
      total: number;
    };
  };
  handleChallengeResponse: (notificationId: number, response: string) => void;
};

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  recentActivities,
  upcomingMatches,
  notifications,
  matchHistory,
  statsData,
  handleChallengeResponse,
}) => {
  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
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
        <RecentActivity activities={recentActivities} />
        <UpcomingMatchesPreview matches={upcomingMatches} />
        <NotificationsPreview 
          notifications={notifications} 
          onChallengeResponse={handleChallengeResponse} 
          onViewAllClick={() => setActiveTab("notifications")}
        />
      </TabsContent>

      <TabsContent value="matches">
        <div className="space-y-6">
          <UpcomingMatchesTable matches={upcomingMatches} />
          <MatchHistoryTable matches={matchHistory} />
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsFullList 
          notifications={notifications} 
          onChallengeResponse={handleChallengeResponse} 
        />
      </TabsContent>

      <TabsContent value="stats">
        <StatsDisplay 
          languagesUsed={statsData.languagesUsed} 
          problemsSolved={statsData.problemsSolved} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
