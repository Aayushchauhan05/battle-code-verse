
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, Users, Clock, Trophy, ChevronRight, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FindOpponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingRange, setRatingRange] = useState([1600, 2000]);
  const [filterOption, setFilterOption] = useState('all');
  
  // Mock opponent data
  const [opponents] = useState([
    {
      id: 1,
      name: 'CodeNinja',
      rating: 1950,
      winRate: 76,
      online: true,
      avatar: '/placeholder.svg',
      recentActivity: '2 minutes ago'
    },
    {
      id: 2,
      name: 'AlgorithmQueen',
      rating: 2120,
      winRate: 82,
      online: true,
      avatar: '/placeholder.svg',
      recentActivity: 'Just now'
    },
    {
      id: 3,
      name: 'ByteMaster',
      rating: 1850,
      winRate: 65,
      online: false,
      avatar: '/placeholder.svg',
      recentActivity: '3 hours ago'
    },
    {
      id: 4,
      name: 'SyntaxSorcerer',
      rating: 1755,
      winRate: 60,
      online: true,
      avatar: '/placeholder.svg',
      recentActivity: '30 minutes ago'
    },
    {
      id: 5,
      name: 'ProgramProdigy',
      rating: 2050,
      winRate: 74,
      online: false,
      avatar: '/placeholder.svg',
      recentActivity: '1 day ago'
    },
    {
      id: 6,
      name: 'FunctionFury',
      rating: 1700,
      winRate: 58,
      online: true,
      avatar: '/placeholder.svg',
      recentActivity: '45 minutes ago'
    },
  ]);

  // Filter opponents based on current filters and search
  const filteredOpponents = opponents.filter(opponent => {
    // Filter by search query
    if (searchQuery && !opponent.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by rating range
    if (opponent.rating < ratingRange[0] || opponent.rating > ratingRange[1]) {
      return false;
    }
    
    // Filter by online status
    if (filterOption === 'online' && !opponent.online) {
      return false;
    }
    
    return true;
  });

  const handleChallenge = (opponentId: number, opponentName: string) => {
    toast({
      title: "Challenge Sent!",
      description: `You've challenged ${opponentName} to a coding battle.`,
    });
    
    // In a real app, this would send a challenge request to the backend
    // For now, we'll just simulate going to the battle page after a delay
    setTimeout(() => {
      navigate("/battles");
    }, 1500);
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Users className="h-6 w-6 text-codeverse-blue" />
              Find Opponents
            </h1>
            <p className="text-muted-foreground">
              Challenge other coders based on your preferences
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-codeverse-purple text-white py-1 px-3">Season 1</Badge>
            <Badge variant="outline" className="py-1 px-3">
              <Clock className="w-4 h-4 mr-1" /> Quick Match
            </Badge>
          </div>
        </div>
        
        {/* Filters and search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Search Opponents</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by username..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Rating Range: {ratingRange[0]} - {ratingRange[1]}</label>
                <Slider 
                  defaultValue={ratingRange} 
                  min={1000} 
                  max={2500} 
                  step={50}
                  onValueChange={setRatingRange}
                  className="py-4"
                />
              </div>
              
              <div className="w-full md:w-40">
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filterOption} onValueChange={setFilterOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full md:w-auto">
                <Filter className="w-4 h-4 mr-1" /> Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Opponents list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpponents.length > 0 ? (
            filteredOpponents.map((opponent) => (
              <Card key={opponent.id} className="overflow-hidden border-border hover:border-codeverse-blue/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={opponent.avatar} />
                          <AvatarFallback>
                            {opponent.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        {opponent.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{opponent.name}</CardTitle>
                        <span className={`text-sm ${getRatingClass(opponent.rating)}`}>
                          {opponent.rating} Rating
                        </span>
                      </div>
                    </div>
                    
                    <Badge variant={opponent.online ? "default" : "outline"} className="text-xs">
                      {opponent.online ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Win Rate</span>
                      <span className="font-medium">{opponent.winRate}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Last Active</span>
                      <span className="font-medium">{opponent.recentActivity}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-1 flex-col items-stretch gap-2">
                  <Button 
                    onClick={() => handleChallenge(opponent.id, opponent.name)}
                    disabled={!opponent.online}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    {opponent.online ? 'Challenge' : 'Unavailable'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    View Profile <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <Trophy className="h-12 w-12 text-codeverse-blue/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No opponents found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more opponents or check back later.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setRatingRange([1600, 2000]);
                  setFilterOption('all');
                }}>
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FindOpponent;
