
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, BarChart, Award } from "lucide-react";

type Activity = {
  id: number;
  type: string;
  message: string;
  time: string;
};

type RecentActivityProps = {
  activities: Activity[];
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
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
  );
};

export default RecentActivity;
