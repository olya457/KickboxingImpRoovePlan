import { pickProgram, PROGRAM_VAULT, QuizAnswers } from '../src/ledger/programVault';

const base: QuizAnswers = {
  goal: 'Improve Technique',
  experience: 'Intermediate',
  days: '4 Days',
  duration: '45–60 Minutes',
  intensity: 'Moderate',
  place: 'At a Gym',
  gear: 'Dumbbells',
  skill: 'Overall Conditioning',
  bodyFocus: 'Full Body',
};

const cases: Array<[string, QuizAnswers]> = [
  ['weightloss', { ...base, goal: 'Lose Weight' }],
  ['muscle', { ...base, goal: 'Build Muscle' }],
  ['endurance', { ...base, goal: 'Improve Endurance' }],
  ['technique', { ...base, goal: 'Improve Technique' }],
  ['power', { ...base, skill: 'Kicking Power' }],
  ['starter', { ...base, experience: 'Beginner', days: '2 Days' }],
  ['speed', { ...base, goal: 'Get Faster' }],
  ['core', { ...base, bodyFocus: 'Core' }],
  ['legs', { ...base, bodyFocus: 'Legs' }],
  ['upperbody', { ...base, bodyFocus: 'Upper Body' }],
  ['hiit', { ...base, goal: 'Lose Weight', intensity: 'High' }],
  ['mobility', { ...base, goal: 'Improve Mobility' }],
  ['fightcamp', { ...base, goal: 'Prepare to Compete', experience: 'Advanced' }],
  ['home', { ...base, place: 'At Home', gear: 'Bodyweight Only', duration: '30–40 Minutes' }],
  ['comeback', { ...base, experience: 'Returning After A Break' }],
];

describe('pickProgram', () => {
  test.each(cases)('can select %s', (expected, answers) => {
    expect(pickProgram(answers)).toBe(expected);
  });

  test('every available program is reachable by the questionnaire', () => {
    expect(new Set(cases.map(([id]) => id))).toEqual(new Set(Object.keys(PROGRAM_VAULT)));
  });
});
