
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeInput from "@/components/TimeInput";
import SleepCycles from "@/components/SleepCycles";
import QuoteDisplay from "@/components/QuoteDisplay";
import { calculateBedtimes, calculateWakeUpTimes, SleepCycle } from "@/utils/sleepCalculator";
import { Moon, Clock } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"bedtime" | "wakeup">("bedtime");
  const [wakeupTime, setWakeupTime] = useState<Date>(() => {
    const now = new Date();
    now.setHours(7, 0, 0, 0);
    return now;
  });
  const [bedtime, setBedtime] = useState<Date>(() => {
    const now = new Date();
    now.setHours(22, 0, 0, 0);
    return now;
  });

  const [sleepCycles, setSleepCycles] = useState<SleepCycle[]>([]);
  const [selectedCycleIndex, setSelectedCycleIndex] = useState(2); // Default to 5 cycles (3rd option)
  const [quoteRefreshTrigger, setQuoteRefreshTrigger] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Calculate sleep cycles when tab, bedtime or wakeup time changes
  const calculateSleepCycles = () => {
    if (activeTab === "bedtime") {
      setSleepCycles(calculateBedtimes(wakeupTime));
    } else {
      setSleepCycles(calculateWakeUpTimes(bedtime));
    }
    
    // Refresh the quote
    setQuoteRefreshTrigger(prev => prev + 1);
    
    // Mark as calculated and show results
    setHasCalculated(true);
    setShowResults(true);
  };

  const resetCalculation = () => {
    setShowResults(false);
  };

  // Initial calculation
  useEffect(() => {
    if (hasCalculated) {
      calculateSleepCycles();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex flex-col items-center px-4 py-10">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Moon className="text-amber-300 h-8 w-8" />
          <h1 className="text-4xl font-bold bg-gradient-sleep text-transparent bg-clip-text">
            Sleep Calculator
          </h1>
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          Optimize your sleep by waking up between cycles instead of in the middle of one.
        </p>
      </header>
      
      <div className="glass-panel p-8 w-full max-w-md mx-auto">
        {!showResults ? (
          <>
            <Tabs
              defaultValue="bedtime"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "bedtime" | "wakeup")}
              className="mb-6"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="bedtime" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Find Bedtime</span>
                </TabsTrigger>
                <TabsTrigger value="wakeup" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Find Wake Time</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bedtime" className="space-y-4 pt-4">
                <TimeInput
                  selectedTime={wakeupTime}
                  onChange={setWakeupTime}
                  label="What time do you want to wake up?"
                />
              </TabsContent>
              
              <TabsContent value="wakeup" className="space-y-4 pt-4">
                <TimeInput
                  selectedTime={bedtime}
                  onChange={setBedtime}
                  label="If you want to go to bed now..."
                />
              </TabsContent>
            </Tabs>
            
            <Button 
              onClick={calculateSleepCycles}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 mt-4"
            >
              Calculate {activeTab === "bedtime" ? "bedtime" : "wake-up time"}
            </Button>
          </>
        ) : (
          <SleepCycles
            cycles={sleepCycles}
            selectedIndex={selectedCycleIndex}
            onSelect={setSelectedCycleIndex}
            calculationType={activeTab}
            onReset={resetCalculation}
          />
        )}
      </div>
      
      {hasCalculated && <QuoteDisplay triggerNewQuote={quoteRefreshTrigger} />}
      
      <footer className="mt-auto pt-8 text-center text-muted-foreground text-sm">
        <p>Sleep better, live better. Each sleep cycle lasts about 90 minutes.</p>
        <p className="mt-2">© {new Date().getFullYear()} | Sweet Dreams</p>
      </footer>
    </div>
  );
};

export default Index;
