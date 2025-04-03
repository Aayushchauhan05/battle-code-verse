
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Award } from "lucide-react";

type LanguageStats = {
  language: string;
  percentage: number;
};

type ProblemStats = {
  easy: number;
  medium: number;
  hard: number;
  total: number;
};

type StatsDisplayProps = {
  languagesUsed: LanguageStats[];
  problemsSolved: ProblemStats;
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ languagesUsed, problemsSolved }) => {
  return (
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
            {languagesUsed.map((lang) => (
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
              <span className="text-lg font-semibold text-codeverse-green">{problemsSolved.easy}</span>
              <span className="text-sm text-muted-foreground">Easy</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-lg font-semibold text-codeverse-blue">{problemsSolved.medium}</span>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-lg font-semibold text-codeverse-pink">{problemsSolved.hard}</span>
              <span className="text-sm text-muted-foreground">Hard</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-lg font-semibold">{problemsSolved.total}</span>
              <span className="text-sm text-muted-foreground">Total</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsDisplay;
