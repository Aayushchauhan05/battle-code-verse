'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Timer, Code, Check, Play, ClipboardCheck } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';
import { Badge } from '@/components/ui/badge';
import questions from '@/data/questions.json';

interface TestResult {
  input: any;
  expected: any;
  actual: any;
  passed: boolean;
}

const Battle = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("// Write your solution here\n\nfunction solve(input) {\n  // Your code here\n  \n  return result;\n}");
  const [score, setScore] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string>("");
  const [battleData, setBattleData] = useState(questions[0]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);

  // Pick a random problem on load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setBattleData(questions[randomIndex]);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const runTests = (solutionFn: Function): TestResult[] => {
    if (!battleData.problem.testCases) return [];
    
    return battleData.problem.testCases.map(testCase => {
      try {
        const actual = solutionFn(testCase.input);
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual,
          passed: JSON.stringify(actual) === JSON.stringify(testCase.expected)
        };
      } catch (error) {
        return {
          input: testCase.input,
          expected: testCase.expected,
          actual: error instanceof Error ? error.message : 'Runtime error',
          passed: false
        };
      }
    });
  };

  const evaluateSolution = async () => {
    try {
      setSubmitting(true);
      setScore(null);
      setTestResults([]);
      setShowTestResults(false);

      // First try to execute the user's code to run tests
      try {
        // Create a function from the user's code
        const functionRegex = /function\s+solve\(([^)]*)\)\s*{([^]*)}/;
        const match = code.match(functionRegex);
        
        if (match) {
          const args = match[1].trim();
          const body = match[2];
          const solutionFn = new Function(args, body);
          const results = runTests(solutionFn);
          setTestResults(results);
          setShowTestResults(true);
        }
      } catch (error) {
        console.error('Code execution error:', error);
      }

      // Then send to AI for evaluation
      const response = await fetch("http://localhost:8181/evaluate", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pseudocode: code,
          question: battleData.problem,
          testResults: testResults.filter(t => !t.passed)
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawEval: string = data.evaluation || "";
        const scoreMatch = rawEval.match(/^\d+/);
        const extractedScore = scoreMatch ? parseInt(scoreMatch[0]) : null;
        setScore(extractedScore);
        setSuggestions(data.evaluation);
      } else {
        console.error("Server error:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const { opponent, problem } = battleData;

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
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <Badge className={
              `${problem.difficulty === 'Easy' ? 'bg-codeverse-green' :
                problem.difficulty === 'Medium' ? 'bg-codeverse-blue' :
                'bg-codeverse-pink'} text-white`
            }>
              {problem.difficulty}
            </Badge>
          </div>

          <Card className="w-full md:w-auto border border-codeverse-blue/30 bg-card/80">
            <CardContent className="p-4 flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={opponent.avatar} />
                  <AvatarFallback className="bg-codeverse-purple text-white">
                    {opponent.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{opponent.name}</p>
                  <p className="text-xs text-muted-foreground">{opponent.rating} ELO</p>
                </div>
              </div>
              <div className="w-40">
                <p className="text-xs text-muted-foreground mb-1">Opponent Progress</p>
                <Progress value={opponent.progress} className="h-2" />
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
                <p className="whitespace-pre-line mb-6">{problem.description}</p>
                <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
                <ul className="list-disc list-inside space-y-1 mb-6">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="text-muted-foreground">{c}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                {problem.examples.map((ex, i) => (
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
                  <TabsTrigger value="code" className="gap-2"><Code className="h-4 w-4" /><span>Code</span></TabsTrigger>
                  <TabsTrigger value="pseudocode" className="gap-2"><ClipboardCheck className="h-4 w-4" /><span>Pseudocode</span></TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="flex-1 min-h-[400px]">
                <CodeEditor value={code} onChange={setCode} language="javascript" />
              </div>

              <div className="border-t border-border p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    onClick={evaluateSolution} 
                    disabled={submitting}
                  >
                    <Play className="h-4 w-4" />
                    Test
                  </Button>

                  <Button 
                    onClick={evaluateSolution} 
                    disabled={submitting} 
                    className="gap-2 bg-codeverse-green hover:bg-codeverse-green/90"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin">
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
                  <div className="mt-2">
                    <p className="text-sm text-codeverse-blue font-semibold">Evaluation Score: {score}/20</p>
                    <p className="text-sm">{suggestions.trim().split(" ").slice(1).join(" ")}</p>
                  </div>
                )}

                {testResults.length > 0 && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-codeverse-pink mb-2"
                      onClick={() => setShowTestResults(!showTestResults)}
                    >
                      {showTestResults ? 'Hide Test Results' : 'Show Test Results'}
                    </Button>

                    {showTestResults && (
                      <div className="space-y-3">
                        {testResults.map((result, index) => (
                          <Card 
                            key={index} 
                            className={`border ${result.passed ? 'border-codeverse-green/30' : 'border-codeverse-pink/30'}`}
                          >
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-mono">
                                    <span className="text-codeverse-blue">Input:</span> {JSON.stringify(result.input)}
                                  </p>
                                  <p className="text-sm font-mono">
                                    <span className="text-codeverse-green">Expected:</span> {JSON.stringify(result.expected)}
                                  </p>
                                  <p className="text-sm font-mono">
                                    <span className={result.passed ? "text-codeverse-green" : "text-codeverse-pink"}>
                                      Actual: {JSON.stringify(result.actual)}
                                    </span>
                                  </p>
                                </div>
                                <Badge 
                                  variant={result.passed ? "default" : "destructive"}
                                  className="ml-2"
                                >
                                  {result.passed ? "Passed" : "Failed"}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-white text-lg font-semibold">Evaluating Solution...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Battle;