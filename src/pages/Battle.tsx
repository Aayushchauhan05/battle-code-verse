import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Timer, 
  Code, 
  Check, 
  Play,
  ClipboardCheck
} from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import { Badge } from '@/components/ui/badge';

const Battle = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("// Write your solution here\n\nfunction solve(input) {\n  // Your code here\n  \n  return result;\n}");
  const [score, setScore] = useState<number | null>(null);
const [suggestions,setSuggestions]=useState<string>("")
  const battleData = {
    opponent: {
      name: "AlgorithmAce",
      avatar: "/placeholder.svg",
      rating: 1345,
      progress: 65,
    },
    problem: {
      title: "Two Sum",
      difficulty: "Medium",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
      
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]"
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ]
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const fetchAiModel = async () => {
    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:8181/evaluate", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pseudocode: code,
          question: battleData.problem
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawEval: string = data.evaluation || "";
        const scoreMatch = rawEval.match(/^\d+/);
        const extractedScore = scoreMatch ? parseInt(scoreMatch[0]) : null;
        setScore(extractedScore);
        setSuggestions(data.evaluation)
        setSubmitting(false);
        
      } else {
        console.error("Server error:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setScore(null);

    setTimeout(() => {
      setSubmitting(false);
      fetchAiModel();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-codeverse-dark grid-pattern">
      <Navbar />

      <div className="container py-6 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Card className="p-2 border border-codeverse-pink/30">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Timer className="h-5 w-5 text-codeverse-pink animate-pulse" />
                <span className="text-codeverse-pink">{formatTime(timeLeft)}</span>
              </div>
            </Card>

            <h1 className="text-2xl font-bold">{battleData.problem.title}</h1>

            <Badge className={
              `${battleData.problem.difficulty === 'Easy' ? 'bg-codeverse-green' :
                battleData.problem.difficulty === 'Medium' ? 'bg-codeverse-blue' :
                'bg-codeverse-pink'} text-white`
            }>
              {battleData.problem.difficulty}
            </Badge>
          </div>

          <Card className="w-full md:w-auto border border-codeverse-blue/30 bg-card/80">
            <CardContent className="p-4 flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={battleData.opponent.avatar} />
                  <AvatarFallback className="bg-codeverse-purple text-white">
                    {battleData.opponent.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{battleData.opponent.name}</p>
                  <p className="text-xs text-muted-foreground">{battleData.opponent.rating} ELO</p>
                </div>
              </div>

              <div className="w-40">
                <p className="text-xs text-muted-foreground mb-1">Opponent Progress</p>
                <Progress value={battleData.opponent.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
          <Card className="lg:col-span-2 border-border overflow-auto max-h-[calc(100vh-300px)] lg:max-h-none">
            <CardHeader className="border-b border-border">
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-line mb-6">{battleData.problem.description}</p>

                <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  {battleData.problem.constraints.map((c, i) => (
                    <li key={i} className="text-muted-foreground">{c}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                {battleData.problem.examples.map((ex, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Example {i + 1}:</p>
                    <div className="bg-card/50 rounded-md p-3 mb-2">
                      <p className="text-sm font-mono mb-1"><span className="text-codeverse-blue">Input:</span> {ex.input}</p>
                      <p className="text-sm font-mono"><span className="text-codeverse-green">Output:</span> {ex.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-border flex flex-col overflow-hidden">
            <CardHeader className="border-b border-border py-3 px-4">
              <Tabs defaultValue="code">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="code" className="gap-2">
                    <Code className="h-4 w-4" />
                    <span>Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="pseudocode" className="gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    <span>Pseudocode</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 min-h-[400px]">
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language="javascript"
                />
              </div>

              <div className="border-t border-border p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleSubmit}
                    disabled={submitting}>
                    <Play className="h-4 w-4" />
                    Test
                  </Button>

                  <Button 
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="gap-2 bg-codeverse-green hover:bg-codeverse-green/90"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin">
                          <svg 
                            className="h-4 w-4" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        </span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Submit Solution</span>
                      </>
                    )}
                  </Button>
                </div>

                {score !== null && (
                <>  <p className="text-sm text-codeverse-blue font-semibold">
                    Evaluation Score: {score}/20
                  </p>
                  <p>{suggestions.trim().split(" ").slice(1).join(" ")}</p></>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Battle;
