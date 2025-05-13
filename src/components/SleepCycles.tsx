
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

  const colorStyles = [
    { base: "#E5DEFF", light: "#F2EFFF", glow: "rgba(229, 222, 255, 0.6)" }, // light
    { base: "#9B87F5", light: "#BEB0F8", glow: "rgba(155, 135, 245, 0.6)" }, // mid
    { base: "#7E69AB", light: "#A08DC1", glow: "rgba(126, 105, 171, 0.6)" }, // deep
    { base: "#D6BCFA", light: "#E5D6FC", glow: "rgba(214, 188, 250, 0.6)" }, // dream
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between gap-4">
        {cycles.map((cycle, index) => {
          const isSelected = index === selectedIndex;
          const colorIndex = index % colorStyles.length;
          const colorStyle = colorStyles[colorIndex];
          
          return (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div
                className={cn(
                  "sleep-cycle-dot cursor-pointer",
                  isSelected && "active animate-pulse-gentle"
                )}
                style={{
                  '--dot-color': colorStyle.base,
                  '--dot-color-light': colorStyle.light,
                  '--dot-glow-color': colorStyle.glow,
                } as React.CSSProperties}
                onClick={() => onSelect(index)}
              ></div>
              <div className="text-xs text-center text-muted-foreground font-medium">
                {cycle.cycles} cycles
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full">
        {cycles.map((_, index) => {
          const colorIndex = index % colorStyles.length;
          return (
            <div
              key={index}
              className={cn(
                "sleep-cycle-connection",
                index < selectedIndex
                  ? "bg-primary shadow-sm"
                  : "bg-primary/20"
              )}
            ></div>
          );
        })}
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

