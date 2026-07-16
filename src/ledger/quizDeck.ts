export interface QuizProbe {
  id: string;
  prompt: string;
  options: string[];
}

export const QUIZ_DECK: QuizProbe[] = [
  {
    id: 'goal',
    prompt: 'What is your primary goal?',
    options: [
      'Lose Weight',
      'Build Muscle',
      'Improve Endurance',
      'Improve Technique',
      'Get Faster',
      'Improve Mobility',
      'Prepare to Compete',
    ],
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
    id: 'duration',
    prompt: 'How long should a typical workout be?',
    options: ['15–20 Minutes', '30–40 Minutes', '45–60 Minutes', '60+ Minutes'],
  },
  {
    id: 'intensity',
    prompt: 'What training intensity feels right?',
    options: ['Gentle', 'Moderate', 'High', 'Maximum'],
  },
  {
    id: 'place',
    prompt: 'Where will you train most often?',
    options: ['At Home', 'At a Gym', 'Outdoors', 'Kickboxing Club'],
  },
  {
    id: 'gear',
    prompt: 'What equipment do you have?',
    options: ['Bodyweight Only', 'Resistance Bands', 'Dumbbells', 'Heavy Bag'],
  },
  {
    id: 'skill',
    prompt: 'Which skill would you like to improve most?',
    options: [
      'Punching Speed',
      'Kicking Power',
      'Footwork & Reactions',
      'Core Stability',
      'Overall Conditioning',
      'Mobility & Balance',
    ],
  },
  {
    id: 'bodyFocus',
    prompt: 'Which area needs the most attention?',
    options: ['Full Body', 'Upper Body', 'Legs', 'Core'],
  },
];
