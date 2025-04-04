import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Github } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import axios from '@/axios/axios';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeTerms: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: 'Terms not accepted',
        description: 'You must agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await axios.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created!',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Error creating account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-codeverse-dark grid-pattern p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-codeverse-purple opacity-10 rounded-full blur-[100px] -z-10"></div>
      
      <Card className="w-full max-w-md border-border">
        <form onSubmit={handleSubmit}>
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
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="codingmaster" 
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agreeTerms" 
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="agreeTerms"
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
            
            <Button 
              type="submit"
              className="w-full bg-codeverse-purple hover:bg-codeverse-purple/90"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="h-[1px] flex-1 bg-border"></div>
              <span className="px-3 text-sm text-muted-foreground">OR</span>
              <div className="h-[1px] flex-1 bg-border"></div>
            </div>
            
            <Button variant="outline" className="w-full" type="button">
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
        </form>
      </Card>
    </div>
  );
};

export default Register;