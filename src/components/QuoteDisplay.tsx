
import React, { useEffect, useState } from "react";
import { getRandomQuote } from "@/data/quotes";
import { Quote } from "lucide-react";

interface QuoteDisplayProps {
  triggerNewQuote: number;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ triggerNewQuote }) => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (triggerNewQuote > 0) {
      // Start fade out
      setIsAnimating(true);
      
      // After fade out, change the quote
      const timeout1 = setTimeout(() => {
        setQuote(getRandomQuote());
      }, 500);
      
      // After updating the quote, start fade in
      const timeout2 = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [triggerNewQuote]);

  return (
    <div className="glass-panel p-6 my-8 max-w-2xl mx-auto transition-opacity duration-500 ease-in-out animate-float" style={{ opacity: isAnimating ? 0 : 1 }}>
      <div className="flex items-start">
        <Quote className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg italic">{quote.text}</p>
          <p className="text-sm text-muted-foreground mt-2">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
