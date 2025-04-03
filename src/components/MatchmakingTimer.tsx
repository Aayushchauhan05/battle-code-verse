import React, { useState, useEffect } from 'react';
import { CircleOff, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MatchmakingTimerProps {
  initialTime: number; // in seconds
  onMatchFound: () => void;
  onCancel: () => void;
}

const MatchmakingTimer: React.FC<MatchmakingTimerProps> = ({ 
  initialTime, 
  onMatchFound,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSearching && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isSearching) {
      toast({
        title: "Match Found!",
        description: "Opponent found. Preparing your battle...",
      });
      setIsSearching(false);
      onMatchFound();
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, isSearching, onMatchFound, toast]);
  
  const handleCancel = () => {
    setIsSearching(false);
    onCancel();
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;
  
  return (
    <div className="bg-codevs-dark rounded-lg p-6 w-full max-w-md shadow-lg border border-slate-800">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full flex items-center justify-center bg-codevs-dark border-4 border-codevs-primary">
            <Clock className="w-12 h-12 text-codevs-accent animate-pulse-slow" />
          </div>
          <div className="absolute -top-2 -right-2 bg-codevs-primary text-white rounded-full py-1 px-3 text-sm font-medium">
            Season 1
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Finding Opponent</h2>
      <p className="text-gray-400 text-center mb-6">Matching you with a coder based on your rating</p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Estimated wait time</span>
          <span className="text-white font-medium">{formatTime(timeLeft)}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="bg-slate-800/50 rounded p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Rating Range</span>
          <span className="text-white">1600 - 2000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Status</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-400">Searching</span>
          </span>
        </div>
      </div>
      
      <Button 
        onClick={handleCancel} 
        variant="outline" 
        className="w-full border-red-600 text-red-500 hover:bg-red-950 hover:text-red-400"
      >
        <CircleOff className="w-4 h-4 mr-2" />
        Cancel Matchmaking
      </Button>
    </div>
  );
};

export default MatchmakingTimer;
