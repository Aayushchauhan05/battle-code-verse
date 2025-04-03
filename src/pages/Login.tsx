
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-codeverse-dark grid-pattern p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-codeverse-purple opacity-10 rounded-full blur-[100px] -z-10"></div>
      
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-codeverse-blue to-codeverse-purple flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CodeVersus</span>
          </Link>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/reset-password" className="text-xs text-codeverse-blue hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full bg-codeverse-purple hover:bg-codeverse-purple/90">Sign In</Button>
          
          <div className="flex items-center justify-between">
            <div className="h-[1px] flex-1 bg-border"></div>
            <span className="px-3 text-sm text-muted-foreground">OR</span>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Sign In with GitHub
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-codeverse-blue hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
