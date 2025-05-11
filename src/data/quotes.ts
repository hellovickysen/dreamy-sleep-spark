
interface Quote {
  text: string;
  author: string;
}

const sleepQuotes: Quote[] = [
  {
    text: "A good laugh and a long sleep are the best cures in the doctor's book.",
    author: "Irish Proverb"
  },
  {
    text: "Sleep is the golden chain that ties health and our bodies together.",
    author: "Thomas Dekker"
  },
  {
    text: "The best bridge between despair and hope is a good night's sleep.",
    author: "E. Joseph Cossman"
  },
  {
    text: "Sleep is that golden chain that ties health and our bodies together.",
    author: "Thomas Dekker"
  },
  {
    text: "Your future depends on your dreams, so go to sleep.",
    author: "Mesut Barazany"
  },
  {
    text: "A well-spent day brings happy sleep.",
    author: "Leonardo da Vinci"
  },
  {
    text: "The amount of sleep required by the average person is five minutes more.",
    author: "Wilson Mizener"
  },
  {
    text: "Sleep is the best meditation.",
    author: "Dalai Lama"
  },
  {
    text: "Never waste any time you can spend sleeping.",
    author: "Frank H. Knight"
  },
  {
    text: "There is a time for many words, and there is also a time for sleep.",
    author: "Homer"
  },
  {
    text: "Sleep is an investment in the energy you need to be effective tomorrow.",
    author: "Tom Roth"
  },
  {
    text: "Sleep is the swiss army knife of health. When sleep is deficient, there is sickness and disease. And when sleep is abundant, there is vitality and health.",
    author: "Matthew Walker"
  },
  {
    text: "I love sleep. My life has the tendency to fall apart when I'm awake, you know?",
    author: "Ernest Hemingway"
  },
  {
    text: "Sleep is the single most effective thing we can do to reset our brain and body health each day.",
    author: "Matthew Walker"
  },
  {
    text: "Your body is your temple. You do your soul a favor by getting enough rest.",
    author: "Anonymous"
  }
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * sleepQuotes.length);
  return sleepQuotes[randomIndex];
}

export default sleepQuotes;
