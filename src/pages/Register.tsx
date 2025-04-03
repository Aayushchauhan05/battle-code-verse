
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Github } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
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
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Join thousands of coders in real-time battles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="codingmaster" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-codeverse-blue hover:underline">
                terms of service
              </Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-codeverse-blue hover:underline">
                privacy policy
              </Link>
            </label>
          </div>
          
          <Button className="w-full bg-codeverse-purple hover:bg-codeverse-purple/90">
            Create Account
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="h-[1px] flex-1 bg-border"></div>
            <span className="px-3 text-sm text-muted-foreground">OR</span>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Sign up with GitHub
          </Button>
        </CardContent>
        <CardFooter className="text-sm text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-codeverse-blue hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
