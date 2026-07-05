export interface DayPlan {
  label: string;
  rest: boolean;
  moves: string[];
  note?: string;
}

export interface TrainProgram {
  id: string;
  title: string;
  focus: string[];
  calories: number;
  water: string;
  sleep: string;
  week: DayPlan[];
}

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const build = (
  rows: (string[] | { rest: true; moves: string[]; note?: string })[],
): DayPlan[] =>
  rows.map((row, i) =>
    Array.isArray(row)
      ? { label: WEEKDAYS[i], rest: false, moves: row }
      : { label: WEEKDAYS[i], rest: true, moves: row.moves, note: row.note },
  );

export const PROGRAM_VAULT: Record<string, TrainProgram> = {
  weightloss: {
    id: 'weightloss',
    title: 'Weight Loss Program',
    focus: ['Fat burning', 'Cardio', 'Mobility', 'Light strength'],
    calories: 1900,
    water: '2.5 L',
    sleep: '8 h',
    week: build([
      ['Shadow Boxing', 'Jump Rope', 'Mountain Climbers'],
      ['Push-Ups', 'Walking Lunges', 'High Knees'],
      { rest: true, moves: ['Walking 30 min', 'Stretching'] },
      ['Jab Cross Drill', 'Burpees', 'Plank Hold'],
      ['Front Kick Practice', 'Jump Squats', 'Bicycle Crunches'],
      ['Shadow Boxing', 'Squats', 'Resistance Band Punches'],
      { rest: true, moves: ['Stretching'] },
    ]),
  },
  muscle: {
    id: 'muscle',
    title: 'Muscle Building Program',
    focus: ['Strength', 'Progressive overload', 'Resistance training', 'Recovery'],
    calories: 2600,
    water: '3 L',
    sleep: '8 h',
    week: build([
      ['Push-Ups', 'Squats', 'Resistance Band Punches'],
      ['Walking Lunges', 'Russian Twists', 'Plank Hold'],
      { rest: true, moves: ['Mobility'] },
      ['Jump Squats', 'Burpees', 'Knee Strike Drill'],
      ['Front Kick Practice', 'Side Plank', 'Push-Ups'],
      ['Jab Cross Drill', 'Squats', 'Resistance Band Punches'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  endurance: {
    id: 'endurance',
    title: 'Endurance Program',
    focus: ['Cardio', 'HIIT', 'Conditioning', 'Recovery'],
    calories: 2300,
    water: '2.8 L',
    sleep: '8 h',
    week: build([
      ['Jump Rope', 'Shadow Boxing', 'High Knees'],
      ['Burpees', 'Mountain Climbers', 'Fast Footwork Drill'],
      { rest: true, moves: ['Mobility'] },
      ['Jab Cross Drill', 'Front Kick Practice', 'Jump Rope'],
      ['High Knees', 'Walking Lunges', 'Bicycle Crunches'],
      ['Shadow Boxing', 'Burpees', 'Mountain Climbers'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  technique: {
    id: 'technique',
    title: 'Technique Program',
    focus: ['Shadow boxing', 'Precision', 'Coordination', 'Footwork'],
    calories: 2200,
    water: '2.6 L',
    sleep: '8 h',
    week: build([
      ['Shadow Boxing', 'Jab Cross Drill', 'Front Kick Practice'],
      ['Roundhouse Kick Drill', 'Knee Strike Drill', 'Fast Footwork Drill'],
      { rest: true, moves: ['Stretching'] },
      ['Shadow Boxing', 'Resistance Band Punches', 'Side Plank'],
      ['Jab Cross Drill', 'Front Kick Practice', 'Walking Lunges'],
      ['Roundhouse Kick Drill', 'Shadow Boxing', 'Plank Hold'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  power: {
    id: 'power',
    title: 'Power Program',
    focus: ['Explosive strength', 'Powerful kicks', 'Plyometrics', 'Heavy bag work'],
    calories: 2800,
    water: '3.2 L',
    sleep: '9 h',
    week: build([
      ['Jump Squats', 'Squats', 'Burpees'],
      ['Resistance Band Punches', 'Push-Ups', 'Knee Strike Drill'],
      { rest: true, moves: ['Mobility'] },
      ['Roundhouse Kick Drill', 'Jump Squats', 'Russian Twists'],
      ['Burpees', 'Front Kick Practice', 'Side Plank'],
      ['Squats', 'Push-Ups', 'Resistance Band Punches'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
};

export type QuizAnswers = Record<string, string>;

export const pickProgram = (a: QuizAnswers): string => {
  const goal = a.goal;
  const skill = a.skill;
  const exp = a.experience;
  const days = a.days;
  const gear = a.gear;

  if (goal === 'Build Muscle') return 'muscle';
  if (
    skill === 'Kicking Power' ||
    exp === 'Advanced' ||
    gear === 'Heavy Bag' ||
    days === '5+ Days'
  )
    return 'power';
  if (goal === 'Improve Technique' || skill === 'Punching Speed' || skill === 'Footwork & Balance')
    return 'technique';
  if (goal === 'Improve Endurance' || skill === 'Overall Conditioning')
    return 'endurance';
  if (goal === 'Lose Weight' || (exp === 'Beginner' && (days === '2 Days' || days === '3 Days')))
    return 'weightloss';
  return 'weightloss';
};

export const CALORIE_GOALS = [
  { id: 'cut', label: 'Lose Weight', kcal: 1900, hint: 'Slight calorie deficit for fat loss' },
  { id: 'gain', label: 'Build Muscle', kcal: 2600, hint: 'Calorie surplus to support growth' },
  { id: 'maintain', label: 'Maintain Weight', kcal: 2250, hint: 'Balanced intake to hold steady' },
  { id: 'bulk', label: 'Gain Weight', kcal: 2900, hint: 'Higher intake for mass gain' },
];
