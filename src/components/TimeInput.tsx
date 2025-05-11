
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  selectedTime: Date;
  onChange: (time: Date) => void;
  label: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  selectedTime,
  onChange,
  label,
}) => {
  const [hours, setHours] = useState<number>(selectedTime.getHours());
  const [minutes, setMinutes] = useState<number>(selectedTime.getMinutes());
  const [period, setPeriod] = useState<"AM" | "PM">(
    selectedTime.getHours() >= 12 ? "PM" : "AM"
  );

  // Handle hour change
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHour = parseInt(e.target.value);
    if (!isNaN(newHour) && newHour >= 1 && newHour <= 12) {
      setHours(newHour);
      updateTime(newHour, minutes, period);
    }
  };

  // Handle minute change
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinute = parseInt(e.target.value);
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      setMinutes(newMinute);
      updateTime(hours, newMinute, period);
    }
  };

  // Handle period change (AM/PM)
  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  // Update the time and call the onChange prop
  const updateTime = (h: number, m: number, p: "AM" | "PM") => {
    const newDate = new Date(selectedTime);
    let hour24 = h % 12;
    if (p === "PM") hour24 += 12;
    newDate.setHours(hour24);
    newDate.setMinutes(m);
    onChange(newDate);
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="time">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="time"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              "border-2 border-primary/20 hover:bg-primary/5"
            )}
          >
            <Clock className="mr-2 h-4 w-4 text-primary" />
            {format(selectedTime, "h:mm a")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-4 glass-panel">
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  className="text-center"
                  value={hours === 0 ? 12 : hours}
                  onChange={handleHourChange}
                  min={1}
                  max={12}
                  type="number"
                />
              </div>
              <div>
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  className="text-center"
                  value={minutes.toString().padStart(2, "0")}
                  onChange={handleMinuteChange}
                  min={0}
                  max={59}
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant={period === "AM" ? "default" : "outline"}
                    onClick={() => handlePeriodChange("AM")}
                    className={cn(
                      "flex-1",
                      period === "AM" && "bg-primary text-white"
                    )}
                  >
                    AM
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={period === "PM" ? "default" : "outline"}
                    onClick={() => handlePeriodChange("PM")}
                    className={cn(
                      "flex-1",
                      period === "PM" && "bg-primary text-white"
                    )}
                  >
                    PM
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeInput;
