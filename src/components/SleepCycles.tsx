
import React from "react";
import { cn } from "@/lib/utils";
import { SleepCycle, formatTime } from "@/utils/sleepCalculator";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface SleepCyclesProps {
  cycles: SleepCycle[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  calculationType: "bedtime" | "wakeup";
  onReset: () => void;
}

const SleepCycles: React.FC<SleepCyclesProps> = ({
  cycles,
  selectedIndex,
  onSelect,
  calculationType,
  onReset,
}) => {
  // Determine which times to highlight as "suggested" (5-6 cycles is ideal)
  const suggestedCycles = [2, 3]; // Indexes for cycles that are 5 and 6 (array is 0-indexed)
  
  const targetTime = calculationType === "bedtime" 
    ? formatTime(cycles[0].wakeupTime) 
    : formatTime(cycles[0].bedtime);

  const explanationText = calculationType === "bedtime"
    ? `The average human takes 15 minutes to fall asleep.\nTo wake up refreshed at ${targetTime}, you need go to sleep at one of the following times:`
    : `The average human takes 15 minutes to fall asleep.\nIf you go to bed at ${targetTime}, you should try to wake up at one of these times:`;

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-center text-amber-300 dark:text-amber-300">
        {calculationType === "bedtime" ? "Bedtime" : "Wake-up Time"}
      </h2>
      
      <p className="text-center text-sm md:text-base whitespace-pre-line">
        {explanationText}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {suggestedCycles.map((index) => (
          <div key={`suggested-${index}`} className="time-box suggested-time">
            <div className="suggested-badge">Suggested</div>
            {calculationType === "bedtime" 
              ? formatTime(cycles[index].bedtime) 
              : formatTime(cycles[index].wakeupTime)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 mt-2">
        {cycles.filter((_, index) => !suggestedCycles.includes(index))
          .map((cycle, index) => (
            <div key={`cycle-${index}`} className="time-box">
              {calculationType === "bedtime"
                ? formatTime(cycle.bedtime)
                : formatTime(cycle.wakeupTime)}
            </div>
          ))}
      </div>
      
      <p className="text-center text-sm md:text-base mt-4">
        If you {calculationType === "bedtime" ? "wake up" : "go to bed"} at one of these times, you'll rise in between 90-minute sleep cycles.
        <br />A good night's sleep consists of 5-6 complete sleep cycles.
      </p>

      <div className="mt-6 text-center">
        <Button 
          onClick={onReset}
          variant="outline" 
          className="border-amber-400/40 hover:bg-amber-400/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
      </div>
    </div>
  );
};

export default SleepCycles;
