
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Twitter, Discord } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm py-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-codeverse-blue to-codeverse-purple flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CodeVersus</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              The next-generation AI-powered coding battle platform that makes learning algorithms fun and competitive.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/battles" className="text-muted-foreground hover:text-foreground">Battles</Link></li>
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              <li><Link to="/practice" className="text-muted-foreground hover:text-foreground">Practice</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground">Challenges</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-foreground">API</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CodeVersus. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
