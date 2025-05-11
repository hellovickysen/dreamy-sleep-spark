
import React from "react";
import { cn } from "@/lib/utils";
import { SleepCycle, formatTime } from "@/utils/sleepCalculator";

interface SleepCyclesProps {
  cycles: SleepCycle[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  calculationType: "bedtime" | "wakeup";
}

const SleepCycles: React.FC<SleepCyclesProps> = ({
  cycles,
  selectedIndex,
  onSelect,
  calculationType,
}) => {
  const cycleSummaryText = (cycle: SleepCycle) => {
    return calculationType === "bedtime"
      ? `Go to bed at ${formatTime(cycle.bedtime)}`
      : `Wake up at ${formatTime(cycle.wakeupTime)}`;
  };

  const colorClasses = [
    "bg-sleep-light",
    "bg-sleep-mid",
    "bg-sleep-deep",
    "bg-sleep-dream",
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between gap-4">
        {cycles.map((cycle, index) => {
          const isSelected = index === selectedIndex;
          const colorIndex = index % colorClasses.length;
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "sleep-cycle-dot cursor-pointer transition-transform",
                  isSelected
                    ? `${colorClasses[colorIndex]} scale-150 animate-pulse-gentle`
                    : `${colorClasses[colorIndex]} opacity-50 hover:scale-125`
                )}
                onClick={() => onSelect(index)}
              ></div>
              <div className="text-xs text-center text-muted-foreground">
                {cycle.cycles} cycles
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full">
        {cycles.map((_, index) => (
          <div
            key={index}
            className={cn(
              "sleep-cycle-connection",
              index < selectedIndex
                ? "bg-primary"
                : "bg-primary/20"
            )}
          ></div>
        ))}
      </div>
      <div className="text-xl font-medium text-center animate-fade-in">
        {cycleSummaryText(cycles[selectedIndex])}
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="glass-panel p-4">
          <p className="text-muted-foreground text-sm mb-1">Sleep Duration</p>
          <p className="font-bold text-xl">
            {cycles[selectedIndex].totalSleepHours} hours
          </p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-muted-foreground text-sm mb-1">Sleep Cycles</p>
          <p className="font-bold text-xl">{cycles[selectedIndex].cycles}</p>
        </div>
      </div>
    </div>
  );
};

export default SleepCycles;
