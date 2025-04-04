
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Sword, Trophy, Code2, Zap, Users, Brain } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Footer from '@/components/Footer';

const Index = () => {
  // Top players mock data
  const topPlayers = [
    { id: 1, name: "CodingWizard", rating: 2145, avatar: "/placeholder.svg", rank: "Grandmaster" },
    { id: 2, name: "AlgorithmQueen", rating: 2089, avatar: "/placeholder.svg", rank: "Grandmaster" },
    { id: 3, name: "ByteMaster", rating: 1967, avatar: "/placeholder.svg", rank: "Master" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-codeverse-purple opacity-10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-codeverse-blue opacity-30 rounded-full blur-[50px] -z-10"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-codeverse-pink opacity-20 rounded-full blur-[60px] -z-10"></div>
        
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 border border-codeverse-blue/50 text-codeverse-blue">
            The Next-Gen Coding Battle Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            <span className="gradient-text">1v1 Coding Battles</span> <br />With
            Real-Time AI Evaluation
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Challenge your peers to real-time coding duels, solve problems using pseudocode or your favorite language, and climb the global ranks.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-codeverse-purple hover:bg-codeverse-purple/90 gap-2 animate-pulse-glow">
              <Sword className="h-5 w-5" />
              Start Battle
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Trophy className="h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Brain, title: "Code in Any Style", description: "Submit solutions in pseudocode or your preferred language" },
              { icon: Zap, title: "Real-time Battles", description: "Compete head-to-head with time pressure and live feedback" },
              { icon: Trophy, title: "ELO Rating System", description: "Fair matchmaking and competitive global ranking" },
            ].map((feature, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur border-border hover:border-codeverse-blue/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-codeverse-purple/20 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-codeverse-blue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Players Section */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-codeverse-blue" />
                Top Players
              </h2>
              <p className="text-muted-foreground">The best coders leading our global leaderboard</p>
            </div>
            <Button variant="outline" className="border-codeverse-blue/30 text-codeverse-blue">
              View Full Leaderboard
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPlayers.map((player, index) => (
              <Card key={player.id} className={`overflow-hidden ${index === 0 ? 'neon-border' : 'border-border'}`}>
                <div className={`h-1 ${
                  index === 0 ? 'bg-codeverse-blue' : 
                  index === 1 ? 'bg-codeverse-purple' :
                  'bg-codeverse-pink'
                }`}></div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-border">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className={`
                        ${index === 0 ? 'bg-codeverse-blue' : 
                          index === 1 ? 'bg-codeverse-purple' :
                          'bg-codeverse-pink'
                        } text-white text-lg font-bold
                      `}>
                        {player.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg">{player.name}</div>
                        <Badge className={`
                          ${index === 0 ? 'bg-codeverse-blue' : 
                            index === 1 ? 'bg-codeverse-purple' :
                            'bg-codeverse-pink'
                          } text-white
                        `}>
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-muted-foreground">{player.rank}</span>
                        <span className="font-mono font-bold">{player.rating} ELO</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-codeverse-pink/50 text-codeverse-pink">
              Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold mb-3">Not Just Another Coding Platform</h2>
            <p className="text-muted-foreground">
              CodeVersus combines competitive gaming mechanics with advanced code evaluation to create a unique learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-time Battles",
                description: "Compete head-to-head with other coders in timed challenges"
              },
              {
                icon: Brain,
                title: "AI Code Evaluation",
                description: "Our ML model evaluates your solution based on logic, not just syntax"
              },
              {
                icon: Users,
                title: "Fair Matchmaking",
                description: "ELO-based system ensures you compete with similarly skilled players"
              },
              {
                icon: Trophy,
                title: "Rankings & Rewards",
                description: "Earn coins, unlock achievements, and climb the global leaderboard"
              }
            ].map((feature, i) => (
              <Card key={i} className="border-border hover:border-codeverse-blue/50 transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-codeverse-purple/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-codeverse-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-codeverse-purple/20 to-codeverse-blue/20 border border-codeverse-blue/30 p-8 md:p-12">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-codeverse-blue opacity-20 rounded-full blur-[60px] -z-10"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-codeverse-purple opacity-10 rounded-full blur-[80px] -z-10"></div>
            
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Test Your Coding Skills?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of developers competing in real-time coding battles. Improve your skills, climb the ranks, and become a coding champion.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-codeverse-purple hover:bg-codeverse-purple/90 gap-2">
                  <Sword className="h-5 w-5" />
                  Start Your First Battle
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
