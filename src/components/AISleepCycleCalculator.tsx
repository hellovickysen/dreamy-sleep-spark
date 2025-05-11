
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Clock, Moon, Loader2 } from "lucide-react";
import { formatTime } from "@/utils/sleepCalculator";

const AISleepCycleCalculator = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    recommendedBedtime: string;
    recommendedWakeupTime: string;
    sleepDuration: string;
    explanation: string;
    cycles: number;
  }>(null);

  const handleGenerateAdvice = () => {
    setLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      // This is a simulation of an AI response
      // In a real application, this would call an API
      const now = new Date();
      let bedtimeHour = 22; // Default to 10 PM
      
      // Simple keyword processing
      if (query.toLowerCase().includes("early")) {
        bedtimeHour = 21; // 9 PM
      } else if (query.toLowerCase().includes("late")) {
        bedtimeHour = 23; // 11 PM
      } else if (query.toLowerCase().includes("midnight")) {
        bedtimeHour = 0; // 12 AM
      }
      
      // Set a recommended bedtime
      const bedtime = new Date(now);
      bedtime.setHours(bedtimeHour, 0, 0, 0);
      
      // Calculate wakeup time (bedtime + 7.5 hours for 5 sleep cycles)
      const wakeupTime = new Date(bedtime.getTime() + (7.5 * 60 * 60 * 1000));
      
      // Generate a result
      setResult({
        recommendedBedtime: formatTime(bedtime),
        recommendedWakeupTime: formatTime(wakeupTime),
        sleepDuration: "7.5",
        explanation: getExplanationForQuery(query, bedtimeHour),
        cycles: 5
      });
      
      setLoading(false);
    }, 1500);
  };

  const getExplanationForQuery = (query: string, bedtimeHour: number): string => {
    if (query.toLowerCase().includes("tired") || query.toLowerCase().includes("exhausted")) {
      return "Based on your indication of feeling tired, I recommend a full 5 sleep cycles (7.5 hours) to help your body recover. This will allow you to complete enough deep sleep and REM sleep phases, which are crucial for physical recovery and mental restoration.";
    } else if (query.toLowerCase().includes("early") || bedtimeHour < 22) {
      return "Going to bed earlier can help align your sleep with your body's natural circadian rhythm. I've recommended 5 complete sleep cycles (7.5 hours) starting at an earlier time to help you wake up feeling refreshed and energized.";
    } else if (query.toLowerCase().includes("late") || bedtimeHour >= 23) {
      return "Even with a later bedtime, I've recommended a full 5 sleep cycles (7.5 hours) to ensure you get adequate rest. Try to maintain consistent sleep times even on weekends to stabilize your circadian rhythm.";
    } else {
      return "I've recommended a sleep schedule with 5 complete sleep cycles (7.5 hours). This optimal duration allows your body to go through sufficient cycles of light, deep, and REM sleep for physical restoration and memory consolidation.";
    }
  };

  const placeholderText = "Describe your sleep habits, concerns, or goals. For example:\n- I feel tired during the day\n- I want to wake up feeling energized\n- I need to wake up early tomorrow\n- I often stay up late working";

  return (
    <div className="space-y-6">
      <div>
        <Textarea
          placeholder={placeholderText}
          className="min-h-32 glass-panel"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Button
        onClick={handleGenerateAdvice}
        className="w-full bg-primary hover:bg-primary/90 text-white"
        disabled={loading || query.trim().length < 5}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing sleep patterns...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Sleep Advice
          </>
        )}
      </Button>

      {result && (
        <div className="animate-fade-in mt-6 space-y-6">
          <Card className="p-4 bg-accent/30 border-accent">
            <h3 className="font-medium text-center mb-4">AI Personalized Sleep Recommendation</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="glass-panel p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Moon className="h-4 w-4" />
                  <span className="text-sm">Bedtime</span>
                </div>
                <p className="font-bold text-xl">{result.recommendedBedtime}</p>
              </div>
              
              <div className="glass-panel p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Wake Up</span>
                </div>
                <p className="font-bold text-xl">{result.recommendedWakeupTime}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="glass-panel p-4 text-center">
                <p className="text-muted-foreground text-sm mb-1">Sleep Duration</p>
                <p className="font-bold text-xl">{result.sleepDuration} hours</p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-muted-foreground text-sm mb-1">Sleep Cycles</p>
                <p className="font-bold text-xl">{result.cycles}</p>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground glass-panel p-4">
              <p className="italic">{result.explanation}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AISleepCycleCalculator;
