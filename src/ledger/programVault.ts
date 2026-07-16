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
  starter: {
    id: 'starter', title: 'Kickboxing Starter',
    focus: ['Fundamentals', 'Confidence', 'Mobility', 'Easy conditioning'],
    calories: 2100, water: '2.4 L', sleep: '8 h',
    week: build([
      ['Shadow Boxing', 'Jab Cross Drill'], ['Front Kick Practice', 'Squats'],
      { rest: true, moves: ['Stretching'] }, ['Fast Footwork Drill', 'Jab Cross Drill'],
      ['Walking Lunges', 'Plank Hold'], ['Shadow Boxing', 'Jump Rope'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  speed: {
    id: 'speed', title: 'Speed & Reactions',
    focus: ['Punching speed', 'Fast feet', 'Coordination', 'Reaction time'],
    calories: 2350, water: '2.8 L', sleep: '8 h',
    week: build([
      ['Fast Footwork Drill', 'Jab Cross Drill', 'Jump Rope'], ['Shadow Boxing', 'High Knees'],
      { rest: true, moves: ['Mobility'] }, ['Jab Cross Drill', 'Resistance Band Punches'],
      ['Fast Footwork Drill', 'Mountain Climbers'], ['Shadow Boxing', 'Jump Rope'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  core: {
    id: 'core', title: 'Fighter Core',
    focus: ['Core strength', 'Rotation', 'Balance', 'Stability'],
    calories: 2200, water: '2.6 L', sleep: '8 h',
    week: build([
      ['Plank Hold', 'Russian Twists', 'Bicycle Crunches'], ['Side Plank', 'Front Kick Practice'],
      { rest: true, moves: ['Stretching'] }, ['Mountain Climbers', 'Knee Strike Drill'],
      ['Plank Hold', 'Squats'], ['Russian Twists', 'Shadow Boxing'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  legs: {
    id: 'legs', title: 'Powerful Legs',
    focus: ['Leg strength', 'Kicking base', 'Balance', 'Explosiveness'],
    calories: 2500, water: '3 L', sleep: '8 h',
    week: build([
      ['Squats', 'Walking Lunges', 'Front Kick Practice'], ['Jump Squats', 'Roundhouse Kick Drill'],
      { rest: true, moves: ['Mobility'] }, ['Walking Lunges', 'Knee Strike Drill'],
      ['Squats', 'Jump Squats'], ['Front Kick Practice', 'Roundhouse Kick Drill'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  upperbody: {
    id: 'upperbody', title: 'Upper Body Fighter',
    focus: ['Punch endurance', 'Shoulders', 'Chest', 'Guard strength'],
    calories: 2450, water: '2.8 L', sleep: '8 h',
    week: build([
      ['Push-Ups', 'Resistance Band Punches', 'Jab Cross Drill'], ['Plank Hold', 'Shadow Boxing'],
      { rest: true, moves: ['Mobility'] }, ['Push-Ups', 'Resistance Band Punches'],
      ['Jab Cross Drill', 'Burpees'], ['Shadow Boxing', 'Side Plank'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  hiit: {
    id: 'hiit', title: 'Kickboxing HIIT',
    focus: ['Intervals', 'Fat burn', 'Speed', 'Full body'],
    calories: 2250, water: '3 L', sleep: '8 h',
    week: build([
      ['Burpees', 'High Knees', 'Jab Cross Drill'], ['Jump Rope', 'Mountain Climbers'],
      { rest: true, moves: ['Walking 30 min'] }, ['Jump Squats', 'Shadow Boxing'],
      ['Fast Footwork Drill', 'Knee Strike Drill'], ['Burpees', 'Front Kick Practice'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  mobility: {
    id: 'mobility', title: 'Mobility & Balance',
    focus: ['Flexibility', 'Balance', 'Control', 'Active recovery'],
    calories: 2050, water: '2.4 L', sleep: '8 h',
    week: build([
      ['Front Kick Practice', 'Side Plank'], ['Walking Lunges', 'Fast Footwork Drill'],
      { rest: true, moves: ['Stretching'] }, ['Roundhouse Kick Drill', 'Plank Hold'],
      ['Shadow Boxing', 'Squats'], ['Front Kick Practice', 'Walking Lunges'],
      { rest: true, moves: ['Mobility'] },
    ]),
  },
  fightcamp: {
    id: 'fightcamp', title: 'Fight Camp',
    focus: ['Fight conditioning', 'Technique', 'Power', 'Mental toughness'],
    calories: 2900, water: '3.4 L', sleep: '9 h',
    week: build([
      ['Shadow Boxing', 'Jab Cross Drill', 'Jump Rope'], ['Roundhouse Kick Drill', 'Burpees'],
      ['Push-Ups', 'Squats', 'Plank Hold'], ['Fast Footwork Drill', 'Knee Strike Drill'],
      ['Resistance Band Punches', 'Mountain Climbers'], ['Shadow Boxing', 'Front Kick Practice'],
      { rest: true, moves: ['Full recovery'] },
    ]),
  },
  home: {
    id: 'home', title: 'No-Equipment Home Plan',
    focus: ['Bodyweight', 'Small space', 'Fitness', 'Consistency'],
    calories: 2150, water: '2.5 L', sleep: '8 h',
    week: build([
      ['Shadow Boxing', 'Squats', 'Push-Ups'], ['Walking Lunges', 'Plank Hold'],
      { rest: true, moves: ['Stretching'] }, ['High Knees', 'Front Kick Practice'],
      ['Jump Squats', 'Bicycle Crunches'], ['Shadow Boxing', 'Burpees'],
      { rest: true, moves: ['Recovery'] },
    ]),
  },
  comeback: {
    id: 'comeback', title: 'Return to Training',
    focus: ['Gradual load', 'Technique reset', 'Mobility', 'Recovery'],
    calories: 2200, water: '2.6 L', sleep: '8 h',
    week: build([
      ['Shadow Boxing', 'Fast Footwork Drill'], ['Squats', 'Plank Hold'],
      { rest: true, moves: ['Walking 30 min'] }, ['Jab Cross Drill', 'Front Kick Practice'],
      { rest: true, moves: ['Stretching'] }, ['Jump Rope', 'Walking Lunges'],
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
  const intensity = a.intensity;
  const place = a.place;
  const duration = a.duration;
  const bodyFocus = a.bodyFocus;

  if (exp === 'Returning After A Break') return 'comeback';

  if (
    goal === 'Prepare to Compete' &&
    (exp === 'Advanced' || days === '5+ Days' || place === 'Kickboxing Club')
  ) return 'fightcamp';

  if (goal === 'Improve Mobility' || skill === 'Mobility & Balance') return 'mobility';
  if (bodyFocus === 'Core' || skill === 'Core Stability') return 'core';
  if (bodyFocus === 'Upper Body') return 'upperbody';
  if (bodyFocus === 'Legs' && skill !== 'Kicking Power') return 'legs';
  if (goal === 'Get Faster' || skill === 'Footwork & Reactions' || skill === 'Punching Speed')
    return 'speed';

  if (
    place === 'At Home' &&
    gear === 'Bodyweight Only' &&
    (duration === '15–20 Minutes' || duration === '30–40 Minutes')
  ) return 'home';
  if (exp === 'Beginner' && (intensity === 'Gentle' || days === '2 Days')) return 'starter';

  if (goal === 'Lose Weight' && (intensity === 'High' || intensity === 'Maximum'))
    return 'hiit';
  if (goal === 'Lose Weight') return 'weightloss';
  if (goal === 'Build Muscle') return 'muscle';
  if (skill === 'Kicking Power' || gear === 'Heavy Bag') return 'power';
  if (goal === 'Improve Technique') return 'technique';
  if (goal === 'Improve Endurance' || skill === 'Overall Conditioning') return 'endurance';
  if (goal === 'Prepare to Compete') return 'power';
  return exp === 'Beginner' ? 'starter' : 'technique';
};

export const CALORIE_GOALS = [
  { id: 'cut', label: 'Lose Weight', kcal: 1900, hint: 'Slight calorie deficit for fat loss' },
  { id: 'gain', label: 'Build Muscle', kcal: 2600, hint: 'Calorie surplus to support growth' },
  { id: 'maintain', label: 'Maintain Weight', kcal: 2250, hint: 'Balanced intake to hold steady' },
  { id: 'bulk', label: 'Gain Weight', kcal: 2900, hint: 'Higher intake for mass gain' },
];
