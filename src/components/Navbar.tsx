import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Code, Trophy, Sword, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-codeverse-blue to-codeverse-purple flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">CodeVersus</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/find-opponent" className="text-foreground/80 hover:text-foreground transition-colors">
            Battles
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Leaderboard
          </Link>
          <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          {/* <a href="https://agent.ai/agent/Antares" className=" underline text-lg text-foreground/80 hover:text-foreground transition-colors">Agent.ai</a> */}
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-codeverse-blue" />
                    <span>{user.rating || 1000} ELO</span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-1 h-auto">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-codeverse-purple text-white">
                            {user.username?.substring(0, 2) || 'US'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="bg-codeverse-purple hover:bg-codeverse-purple/90" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </>
          )}
          
          <Button variant="outline" size="sm" className="gap-2 neon-border animate-pulse-glow" asChild>
            <Link to={user ? "/find-opponent" : "/login"}>
              <Sword className="h-4 w-4" />
              <span>Battle Now</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;