import React from 'react';
import { User, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OpponentCardProps {
  name: string;
  rating: number;
  winRate: string;
  lastActive: string;
  isOnline: boolean;
  onChallenge: () => void;
}

const OpponentCard: React.FC<OpponentCardProps> = ({
  name,
  rating,
  winRate,
  lastActive,
  isOnline,
  onChallenge
}) => {
  return (
    <div className="bg-codevs-dark rounded-lg p-5 border border-slate-800 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-300" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${isOnline ? 'online-indicator' : 'offline-indicator'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
          <p className="text-codevs-accent text-sm">{rating} Rating</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-gray-400 text-xs mb-1">Win Rate</div>
          <div className="text-white font-medium">{winRate}</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Last Active</div>
          <div className="text-white font-medium">{lastActive}</div>
        </div>
      </div>
      
      <div className="mt-auto grid grid-cols-1 gap-3">
        <Button 
          onClick={onChallenge}
          disabled={!isOnline}
          className={`w-full ${isOnline 
            ? 'bg-codevs-primary hover:bg-codevs-secondary' 
            : 'bg-gray-700 cursor-not-allowed'}`}
        >
          {isOnline ? 'Challenge' : 'Unavailable'}
        </Button>
        
        <Button variant="outline" className="w-full border-slate-700 text-gray-300 hover:bg-slate-800">
          View Profile <ExternalLink className="ml-2 w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default OpponentCard;
