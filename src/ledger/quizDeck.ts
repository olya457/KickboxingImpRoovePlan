export interface QuizProbe {
  id: string;
  prompt: string;
  options: string[];
}

export const QUIZ_DECK: QuizProbe[] = [
  {
    id: 'goal',
    prompt: 'What is your primary goal?',
    options: ['Lose Weight', 'Build Muscle', 'Improve Endurance', 'Improve Technique'],
  },
  {
    id: 'experience',
    prompt: 'What is your current experience?',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Returning After A Break'],
  },
  {
    id: 'days',
    prompt: 'How many days can you train each week?',
    options: ['2 Days', '3 Days', '4 Days', '5+ Days'],
  },
  {
    id: 'gear',
    prompt: 'What equipment do you have?',
    options: ['Bodyweight Only', 'Resistance Bands', 'Dumbbells', 'Heavy Bag'],
  },
  {
    id: 'skill',
    prompt: 'Which skill would you like to improve most?',
    options: ['Punching Speed', 'Kicking Power', 'Footwork & Balance', 'Overall Conditioning'],
  },
];
