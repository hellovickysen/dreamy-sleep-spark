
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, BookOpen, FileText } from "lucide-react";

const SleepBlogSection = () => {
  return (
    <div className="glass-panel p-6 w-full max-w-4xl mx-auto my-12 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-8">
        <BookOpen className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-sleep text-transparent bg-clip-text">
          Understanding Sleep Cycles
        </h2>
      </div>

      {/* Blog Article 1 */}
      <article className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">What is a Sleep Cycle?</h3>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="mb-3">
              A sleep cycle is a progression through various stages of sleep that your body 
              goes through repeatedly during the night. Each complete cycle typically lasts 
              about 90 minutes and includes both non-REM (NREM) and REM sleep.
            </p>
            <p className="mb-3">
              During a typical night, you'll go through multiple complete sleep cycles (usually 4-6):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li><strong>Stage 1 (NREM):</strong> Light sleep where you drift in and out of consciousness</li>
              <li><strong>Stage 2 (NREM):</strong> Body temperature drops and heart rate slows</li>
              <li><strong>Stage 3 (NREM):</strong> Deep, restorative sleep</li>
              <li><strong>REM Sleep:</strong> Brain becomes more active, dreaming occurs</li>
            </ul>
            <p>
              Our sleep calculator helps you plan your bedtime or wake-up time to align with 
              these natural 90-minute cycles, helping you wake up between cycles rather than in the middle of one.
            </p>
          </CardContent>
        </Card>
      </article>

      {/* Blog Article 2 */}
      <article className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Why Sleep Cycles Matter</h3>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="mb-3">
              Understanding your sleep cycles is crucial for optimizing your rest and improving your overall health:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                <strong>Waking between cycles:</strong> You'll feel more refreshed and alert when you wake up between 
                sleep cycles rather than during deep sleep.
              </li>
              <li>
                <strong>Cognitive function:</strong> Proper sleep cycle completion improves memory, learning, 
                and problem-solving abilities.
              </li>
              <li>
                <strong>Physical recovery:</strong> Deep sleep stages are when your body repairs tissues, 
                builds bone and muscle, and strengthens the immune system.
              </li>
              <li>
                <strong>Emotional well-being:</strong> REM sleep plays a key role in emotional processing and mood regulation.
              </li>
            </ul>
            <p>
              By planning your sleep schedule around complete sleep cycles, you can maximize the benefits of your rest time 
              and wake feeling more energized.
            </p>
          </CardContent>
        </Card>
      </article>

      {/* Blog Article 3 */}
      <article className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Tips for Better Sleep Quality</h3>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="mb-3">
              Beyond timing your sleep cycles, these habits can help improve your sleep quality:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                <strong>Consistent schedule:</strong> Try to go to bed and wake up at the same time every day,
                even on weekends.
              </li>
              <li>
                <strong>Create a restful environment:</strong> Keep your bedroom cool, dark, and quiet.
              </li>
              <li>
                <strong>Limit screen time:</strong> Avoid phones, computers, and TVs for at least 1 hour before bed.
              </li>
              <li>
                <strong>Watch your diet:</strong> Avoid large meals, caffeine, and alcohol close to bedtime.
              </li>
              <li>
                <strong>Regular exercise:</strong> Physical activity can help you fall asleep faster and enjoy deeper sleep.
              </li>
            </ul>
            <p>
              Combining these habits with our sleep cycle calculator can help you establish an optimal sleep routine
              for long-term health and well-being.
            </p>
          </CardContent>
        </Card>
      </article>

      <div className="mt-8 flex flex-col items-center">
        <Separator className="mb-6" />
        <p className="text-sm text-muted-foreground text-center max-w-2xl">
          Our sleep cycle calculator uses the scientific understanding that the average sleep cycle 
          lasts approximately 90 minutes, with most people needing 4-6 complete cycles per night for 
          optimal rest. Individual variations may occur.
        </p>
      </div>
    </div>
  );
};

export default SleepBlogSection;
