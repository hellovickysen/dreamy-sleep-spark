
// Constants for sleep calculations
const SLEEP_CYCLE_MINUTES = 90; // Each sleep cycle is approximately 90 minutes
const FALL_ASLEEP_MINUTES = 15; // Average time to fall asleep

// Interface for sleep cycle results
export interface SleepCycle {
  bedtime: Date;
  wakeupTime: Date;
  cycles: number;
  totalSleepHours: number;
}

/**
 * Calculates optimal bedtimes based on desired wake-up time
 * @param wakeupTime The time the user wants to wake up
 * @param maxCycles Maximum number of sleep cycles to calculate
 * @returns An array of SleepCycle objects
 */
export function calculateBedtimes(wakeupTime: Date, maxCycles: number = 6): SleepCycle[] {
  const results: SleepCycle[] = [];
  
  // Create a range of sleep cycles (typically 5-6 cycles = 7.5-9 hours is ideal)
  for (let cycles = 3; cycles <= maxCycles; cycles++) {
    const totalMinutes = (cycles * SLEEP_CYCLE_MINUTES) + FALL_ASLEEP_MINUTES;
    const bedtime = new Date(wakeupTime.getTime() - totalMinutes * 60 * 1000);
    
    results.push({
      bedtime,
      wakeupTime: new Date(wakeupTime),
      cycles,
      totalSleepHours: Number(((totalMinutes - FALL_ASLEEP_MINUTES) / 60).toFixed(1))
    });
  }
  
  return results;
}

/**
 * Calculates optimal wake-up times based on bedtime
 * @param bedtime The time the user is going to bed
 * @param maxCycles Maximum number of sleep cycles to calculate
 * @returns An array of SleepCycle objects
 */
export function calculateWakeUpTimes(bedtime: Date, maxCycles: number = 6): SleepCycle[] {
  const results: SleepCycle[] = [];
  
  // Calculate a range of wake-up times (typically 3-6 sleep cycles)
  for (let cycles = 3; cycles <= maxCycles; cycles++) {
    const totalMinutes = (cycles * SLEEP_CYCLE_MINUTES) + FALL_ASLEEP_MINUTES;
    const wakeupTime = new Date(bedtime.getTime() + totalMinutes * 60 * 1000);
    
    results.push({
      bedtime: new Date(bedtime),
      wakeupTime,
      cycles,
      totalSleepHours: Number(((totalMinutes - FALL_ASLEEP_MINUTES) / 60).toFixed(1))
    });
  }
  
  return results;
}

/**
 * Format time for display
 * @param date Date object to format
 * @returns Formatted time string (h:mm a)
 */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${displayHours}:${displayMinutes} ${period}`;
}
