export interface ReadEntry {
  id: string;
  art: string;
  title: string;
  blurb: string;
  paragraphs: string[];
}

export const READS_LIBRARY: ReadEntry[] = [
  {
    id: 'habits',
    art: 'habits',
    title: 'Building Better Fight Habits',
    blurb: 'Train smarter every week.',
    paragraphs: [
      'Consistent training is more effective than occasional intense workouts. Build a schedule that matches your lifestyle and stick to it. Small improvements every session create long-term progress. Focus on quality instead of quantity.',
      'Missing one workout is not a failure. Return to your routine as soon as possible without losing motivation. Track your progress and celebrate small achievements. Discipline grows through repetition.',
    ],
  },
  {
    id: 'fuel',
    art: 'fuel',
    title: 'Fuel for Kickboxing',
    blurb: 'Simple nutrition for performance.',
    paragraphs: [
      'Your body needs enough energy to perform during training. Choose balanced meals with protein, carbohydrates, and healthy fats. Stay consistent with meal timing whenever possible. Proper nutrition supports both performance and recovery.',
      'Avoid skipping meals before demanding workouts. Drink enough water throughout the day to stay hydrated. Recovery begins with proper fueling after training. Small nutritional improvements make a noticeable difference.',
    ],
  },
  {
    id: 'recovery',
    art: 'recovery',
    title: 'Why Recovery Matters',
    blurb: 'Rest supports better progress.',
    paragraphs: [
      'Training stimulates improvement, but recovery is where your body adapts. Muscles become stronger when they have enough time to recover. Rest also helps reduce injury risk and fatigue. Never underestimate the value of recovery days.',
      'Light stretching and mobility exercises can improve circulation. Good sleep helps your body repair muscle tissue. Recovery supports both physical and mental performance. Balance hard work with proper rest.',
    ],
  },
  {
    id: 'hydration',
    art: 'hydration',
    title: 'Hydration and Focus',
    blurb: 'Water helps training quality.',
    paragraphs: [
      'Hydration affects endurance, coordination, and concentration. Even mild dehydration can reduce athletic performance. Drink water consistently instead of waiting until you feel thirsty. Carry a bottle during every workout.',
      'Replace fluids lost through sweat after training. Increase water intake during hot weather or long sessions. Staying hydrated helps your body recover faster. Good hydration is part of every successful routine.',
    ],
  },
  {
    id: 'footwork',
    art: 'footwork',
    title: 'Master Your Footwork',
    blurb: 'Move faster with control.',
    paragraphs: [
      'Strong footwork creates better balance and positioning during every exchange. Stay light on your feet and avoid crossing your legs while moving. Practice small controlled steps before increasing speed. Efficient movement saves energy.',
      'Always return to your fighting stance after moving. Good footwork improves both offense and defense. Practice regularly to build natural movement patterns. Confidence starts with stable positioning.',
    ],
  },
  {
    id: 'accuracy',
    art: 'accuracy',
    title: 'Improve Punch Accuracy',
    blurb: 'Precision beats raw power.',
    paragraphs: [
      'Landing clean punches is more important than throwing many strikes. Focus on proper technique before increasing speed. Keep your eyes on the target throughout every combination. Accuracy improves with repetition.',
      'Relax your shoulders to generate smoother movement. Return your hands to guard after every punch. Train slowly before performing combinations at full speed. Consistency produces reliable technique.',
    ],
  },
  {
    id: 'core',
    art: 'core',
    title: 'Strong Core Strong Fighter',
    blurb: 'Power starts from core.',
    paragraphs: [
      'A strong core supports every punch and kick you throw. It also improves balance and reduces injury risk. Include core exercises in every training week. Stability increases striking efficiency.',
      'Train your abdominal and lower back muscles equally. Controlled movements are more effective than rushing repetitions. Proper breathing helps maintain stability. Strong foundations improve overall performance.',
    ],
  },
  {
    id: 'power',
    art: 'power',
    title: 'Building Explosive Power',
    blurb: 'Speed through explosive movement.',
    paragraphs: [
      'Explosive exercises develop quick reactions and stronger strikes. Focus on maximum effort during each repetition. Allow enough recovery between sets to maintain quality. Quality matters more than quantity.',
      'Jump squats and medicine ball exercises are effective options. Combine explosive work with strength training. Progress gradually to avoid overtraining. Consistent practice improves athletic performance.',
    ],
  },
  {
    id: 'injuries',
    art: 'injuries',
    title: 'Prevent Common Injuries',
    blurb: 'Train safely every session.',
    paragraphs: [
      'Warm up before every workout to prepare your muscles and joints. Increase training intensity gradually instead of rushing progress. Listen to your body when discomfort appears. Prevention is easier than recovery.',
      'Stretch after demanding sessions to improve flexibility. Replace worn training equipment when necessary. Rest if you experience persistent pain. Healthy athletes train more consistently.',
    ],
  },
  {
    id: 'motivation',
    art: 'motivation',
    title: 'Stay Motivated Daily',
    blurb: 'Progress through consistency.',
    paragraphs: [
      'Motivation changes from day to day, but discipline keeps you moving forward. Set realistic goals that you can achieve consistently. Track your progress to stay encouraged. Celebrate improvements of every size.',
      'Avoid comparing yourself with others. Focus on becoming better than yesterday. Every completed workout builds confidence. Long-term consistency always wins.',
    ],
  },
  {
    id: 'balance',
    art: 'balance',
    title: 'Improve Training Balance',
    blurb: 'Mix strength and cardio.',
    paragraphs: [
      'Effective training includes strength, endurance, mobility, and recovery. Avoid repeating the same workout every day. Balanced routines reduce fatigue and improve overall performance. Variety keeps training enjoyable.',
      'Schedule rest days as part of your program. Alternate hard and easy sessions throughout the week. Listen to your recovery level before increasing intensity. Smart planning produces better results.',
    ],
  },
  {
    id: 'discipline',
    art: 'discipline',
    title: 'Build Long-Term Discipline',
    blurb: 'Success comes from routine.',
    paragraphs: [
      'Creating healthy habits is more valuable than short periods of extreme effort. Build a routine that you can maintain for months. Consistency produces lasting improvements. Small actions accumulate over time.',
      'Focus on daily progress instead of perfection. Learn from setbacks without losing momentum. Continue improving one workout at a time. Discipline is the foundation of every successful athlete.',
    ],
  },
];

export const FREE_READ_COUNT = 4;
