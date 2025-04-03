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
import MatchmakingTimer from '@/components/MatchmakingTimer';

const FindOpponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [ratingRange, setRatingRange] = useState([1600, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Dummy data for opponents
  const dummyOpponents = [
    { id: 1, name: 'CodeMaster', rating: 1800, status: 'online' },
    { id: 2, name: 'DevWarrior', rating: 1950, status: 'offline' },
    { id: 3, name: 'BugHunter', rating: 1700, status: 'online' },
  ];

  const handleStartMatchmaking = () => {
    setIsMatchmaking(true);
    toast({
      title: 'Searching for an opponent...',
      description: 'Finding the best match for you.',
    });

    setTimeout(() => {
      setIsMatchmaking(false);
      navigate('/battle');
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-6 w-6 text-codeverse-blue" />
            Find Opponents
          </h1>
          <Button onClick={handleStartMatchmaking} className="bg-codevs-primary hover:bg-codevs-secondary">
            <Clock className="h-4 w-4 mr-2" /> Quick Match
          </Button>
        </div>

        {isMatchmaking ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* ✅ Fixing the error by adding missing props */}
            <MatchmakingTimer 
              initialTime={5} 
              onMatchFound={() => navigate('/battle')} 
              onCancel={() => setIsMatchmaking(false)} 
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

            {/* Opponents List */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dummyOpponents
                .filter((opponent) => 
                  (filterOption === 'all' || opponent.status === filterOption) &&
                  (searchQuery === '' || opponent.name.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((opponent) => (
                  <Card key={opponent.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`/avatars/${opponent.id}.png`} alt={opponent.name} />
                          <AvatarFallback>{opponent.name[0]}</AvatarFallback>
                        </Avatar>
                        {opponent.name}
                        <Badge variant={opponent.status === 'online' ? 'default' : 'secondary'}>
  {opponent.status}
</Badge>

                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Rating: {opponent.rating}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" onClick={() => navigate(`/battle/${opponent.id}`)}>
                        <Play className="w-4 h-4 mr-2" /> Challenge
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindOpponent;
