import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/axios/axios';
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
import MatchmakingTimer from '@/components/MatchmakingTimer';

// Dummy data for fallback when API fails
const dummyOpponents = [
  { _id: '1', username: 'CodeMaster', rating: 1800, status: 'online' },
  { _id: '2', username: 'DevWarrior', rating: 1950, status: 'offline' },
  { _id: '3', username: 'BugHunter', rating: 1700, status: 'online' },
  { _id: '4', username: 'AlgorithmKing', rating: 2100, status: 'online' },
  { _id: '5', username: 'SyntaxQueen', rating: 1650, status: 'offline' },
  { _id: '6', username: 'ByteNinja', rating: 1850, status: 'online' },
];

const FindOpponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [ratingRange, setRatingRange] = useState([1600, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [opponents, setOpponents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchmakingPoll, setMatchmakingPoll] = useState(null);
  const [usingDummyData, setUsingDummyData] = useState(false);

  // Fetch opponents based on filters
  useEffect(() => {
    const fetchOpponents = async () => {
      setIsLoading(true);
      try {
        const params = {
          minRating: ratingRange[0],
          maxRating: ratingRange[1],
          status: filterOption === 'all' ? undefined : filterOption,
          search: searchQuery || undefined
        };
        
        const response = await api.get('/api/opponents', { params });
        setOpponents(response.data);
        setUsingDummyData(false);
      } catch (error) {
        console.error('API Error - Using dummy data:', error);
        setOpponents(dummyOpponents);
        setUsingDummyData(true);
        // toast({
        //   title: 'Notice',
        //   description: 'Using demo data. Real opponents will appear when API is available.',
        //   variant: 'default'
        // });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOpponents();
  }, [ratingRange, filterOption, searchQuery, toast]);

  // Clean up matchmaking poll on unmount
  useEffect(() => {
    return () => {
      if (matchmakingPoll) {
        clearTimeout(matchmakingPoll);
      }
    };
  }, [matchmakingPoll]);

  const handleStartMatchmaking = async () => {
    setIsMatchmaking(true);
    toast({
      title: 'Searching for an opponent...',
      description: 'Finding the best match for you.',
    });

    try {
      const response = await api.post('/api/opponents/matchmaking', {
        minRating: ratingRange[0],
        maxRating: ratingRange[1]
      });
      
      if (response.data.success && response.data.opponent) {
        handleMatchFound(response.data.opponent, response.data.matchId);
      } else {
        // Start polling for match
        startMatchmakingPoll();
      }
    } catch (error) {
      console.error('Matchmaking error:', error);
      setIsMatchmaking(false);
      
      if (usingDummyData) {
        // Simulate matchmaking with dummy data when API is down
        setTimeout(() => {
          const randomOpponent = dummyOpponents[Math.floor(Math.random() * dummyOpponents.length)];
          handleMatchFound(randomOpponent, '');
        }, 2000);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to start matchmaking',
          variant: 'destructive'
        });
      }
    }
  };

  const startMatchmakingPoll = async () => {
    try {
      const response = await api.post('/api/opponents/matchmaking', {
        minRating: ratingRange[0],
        maxRating: ratingRange[1]
      });
      
      if (response.data.success && response.data.opponent) {
        handleMatchFound(response.data.opponent, response.data.matchId);
      } else {
        // Continue polling every 3 seconds
        const pollId = setTimeout(startMatchmakingPoll, 3000);
        setMatchmakingPoll(pollId);
      }
    } catch (error) {
      console.error('Polling error:', error);
      setIsMatchmaking(false);
      toast({
        title: 'Error',
        description: 'Matchmaking service unavailable',
        variant: 'destructive'
      });
    }
  };

  const handleMatchFound = (opponent, matchId) => {
    setIsMatchmaking(false);
    if (matchmakingPoll) {
      clearTimeout(matchmakingPoll);
      setMatchmakingPoll(null);
    }
    
    toast({
      title: 'Match found!',
      description: `You'll be battling ${opponent.username}`,
    });
    
    // Create a battle with the matched opponent
    createBattle(opponent._id, matchId);
  };

  const createBattle = async (opponentId, matchId) => {
    try {
      // Default problem ID - in a real app, you might select a random problem
      const defaultProblemId = '65d3b8a9f8a9b6a9b8f8a9b6';
      
      // If using dummy data, skip API call and navigate directly
      if (usingDummyData) {
        navigate(`/battles`);
        return;
      }
      
      const response = await api.post('/api/battles', {
        opponentId,
        problemId: defaultProblemId,
        language: 'javascript'
      });
      
      navigate(`/battle/${response.data._id}`);
    } catch (error) {
      console.error('Battle creation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create battle session',
        variant: 'destructive'
      });
    }
  };

  const handleCancelMatchmaking = async () => {
    try {
      if (!usingDummyData) {
        await api.post('/api/opponents/matchmaking/cancel');
      }
      setIsMatchmaking(false);
      if (matchmakingPoll) {
        clearTimeout(matchmakingPoll);
        setMatchmakingPoll(null);
      }
      toast({
        title: 'Matchmaking cancelled',
        description: 'You have stopped searching for an opponent',
      });
    } catch (error) {
      console.error('Cancel error:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel matchmaking',
        variant: 'destructive'
      });
    }
  };

  const handleChallengeOpponent = async (opponentId) => {
    try {
      // Default problem ID
      const defaultProblemId = '65d3b8a9f8a9b6a9b8f8a9b6';
      
      // If using dummy data, skip API call and navigate directly
      if (usingDummyData) {
        navigate(`/battle/${opponentId}`);
        return;
      }
      
      const response = await api.post('/api/battles', {
        opponentId,
        problemId: defaultProblemId,
        language: 'javascript'
      });
      
      navigate(`/battle/${response.data._id}`);
    } catch (error) {
      console.error('Challenge error:', error);
      toast({
        title: 'Error',
        description: 'Failed to challenge opponent',
        variant: 'destructive'
      });
    }
  };

  // Filter opponents based on current filters
  const filteredOpponents = opponents.filter(opponent => 
    opponent._id !== user?.id && // Don't show current user
    (filterOption === 'all' || opponent.status === filterOption) &&
    (searchQuery === '' || opponent.username.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (opponent.rating >= ratingRange[0] && opponent.rating <= ratingRange[1])
  );

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-6 w-6 text-codeverse-blue" />
            Find Opponents
          </h1>
          <Button 
            onClick={handleStartMatchmaking} 
            className="bg-codevs-primary hover:bg-codevs-secondary"
            disabled={isMatchmaking}
          >
            <Clock className="h-4 w-4 mr-2" /> 
            {isMatchmaking ? 'Searching...' : 'Quick Match'}
          </Button>
        </div>

        {isMatchmaking ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <MatchmakingTimer 
              initialTime={30} 
              onMatchFound={() => {}} // Handled by polling
              onCancel={handleCancelMatchmaking} 
            />
          </div>
        ) : (
          <>
            {/* Filters Section */}
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
                    <label className="text-sm font-medium mb-2 block">
                      Rating Range: {ratingRange[0]} - {ratingRange[1]}
                    </label>
                    <Slider 
                      value={ratingRange}
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
                  <Button 
                    onClick={() => {}} 
                    className="w-full md:w-auto"
                  >
                    <Filter className="w-4 h-4 mr-1" /> Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Opponents List */}
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-codeverse-blue"></div>
              </div>
            ) : (
              <>
                {usingDummyData && (
                  <div className="mb-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
                    <p className="text-yellow-400 text-sm">
                      ⚠️opponents will appear when connected to the server.
                    </p>
                  </div>
                )}
                
                {filteredOpponents.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredOpponents.map((opponent) => (
                      <Card key={opponent._id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={`/avatars/${opponent._id}.png`} alt={opponent.username} />
                              <AvatarFallback>{opponent.username[0]}</AvatarFallback>
                            </Avatar>
                            {opponent.username}
                            <Badge variant={opponent.status === 'online' ? 'default' : 'secondary'}>
                              {opponent.status}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm">Rating: {opponent.rating}</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => handleChallengeOpponent(opponent._id)}
                            disabled={opponent.status !== 'online'}
                          >
                            <Play className="w-4 h-4 mr-2" /> 
                            {opponent.status === 'online' ? 'Challenge' : 'Offline'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-400">No opponents found</h3>
                    <p className="text-gray-500 mt-2">
                      {usingDummyData 
                        ? "Try adjusting your filters" 
                        : "No players match your current filters"}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindOpponent;