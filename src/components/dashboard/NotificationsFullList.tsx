
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Trophy, Award, CheckCircle, XCircle } from "lucide-react";

type Notification = {
  id: number;
  type: string;
  from?: string;
  fromRating?: number;
  time: string;
  status?: string;
  scheduledTime?: string;
  message?: string;
  achievement?: string;
};

type NotificationsFullListProps = {
  notifications: Notification[];
  onChallengeResponse: (notificationId: number, response: string) => void;
};

const NotificationsFullList: React.FC<NotificationsFullListProps> = ({ notifications, onChallengeResponse }) => {
  return (
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
                            onClick={() => onChallengeResponse(notification.id, "accept")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                            onClick={() => onChallengeResponse(notification.id, "decline")}
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
  );
};

export default NotificationsFullList;
