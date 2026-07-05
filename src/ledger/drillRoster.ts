export type Tier = 'Beginner' | 'Intermediate' | 'Advanced';

export type DrillStrand =
  | 'Technique'
  | 'Strength'
  | 'Endurance'
  | 'Explosive'
  | 'Mobility';

export interface DrillEntry {
  id: string;
  art: string;
  index: number;
  title: string;
  blurb: string;
  tier: Tier;
  strand: DrillStrand;
  detail: string;
  cues: string[];
  loads: { beginner: string; intermediate: string; advanced: string };
}

export const DRILL_ROSTER: DrillEntry[] = [
  {
    id: 'shadowbox',
    art: 'shadowbox',
    index: 1,
    title: 'Shadow Boxing',
    blurb: 'Practice movement, timing, and basic combinations.',
    tier: 'Beginner',
    strand: 'Technique',
    detail:
      'Shadow boxing helps improve footwork, coordination, balance, and striking accuracy. Focus on controlled punches, defensive movement, and maintaining proper fighting stance throughout the exercise.',
    cues: [
      'Keep your guard up throughout the entire drill',
      'Move your feet continuously — stay light on your toes',
      'Visualize a real opponent standing in front of you',
      'Breathe rhythmically in sync with each combination',
    ],
    loads: {
      beginner: '2 × 2 min',
      intermediate: '4 × 2 min',
      advanced: '6 × 3 min',
    },
  },
  {
    id: 'jabcross',
    art: 'jabcross',
    index: 2,
    title: 'Jab & Cross Drill',
    blurb: 'Develop speed and punching precision.',
    tier: 'Beginner',
    strand: 'Technique',
    detail:
      'Perform continuous jab-cross combinations while maintaining correct body rotation and guard position. Emphasize speed without sacrificing technique.',
    cues: [
      'Rotate through the hips on every cross',
      'Snap the punch back to guard instantly',
      'Keep the non-punching hand protecting the chin',
      'Exhale sharply on each strike',
    ],
    loads: {
      beginner: '3 × 20 punches',
      intermediate: '4 × 30 punches',
      advanced: '5 × 40 punches',
    },
  },
  {
    id: 'frontkick',
    art: 'frontkick',
    index: 3,
    title: 'Front Kick Practice',
    blurb: 'Improve balance and kicking technique.',
    tier: 'Beginner',
    strand: 'Technique',
    detail:
      'Practice controlled front kicks while maintaining posture and returning quickly to your fighting stance after every repetition.',
    cues: [
      'Drive the knee up before extending the kick',
      'Strike with the ball of the foot',
      'Keep your hands up for balance',
      'Reset to stance under control',
    ],
    loads: {
      beginner: '2 × 10 each leg',
      intermediate: '3 × 15 each leg',
      advanced: '4 × 20 each leg',
    },
  },
  {
    id: 'roundhouse',
    art: 'roundhouse',
    index: 4,
    title: 'Roundhouse Kick Drill',
    blurb: 'Increase hip power and flexibility.',
    tier: 'Intermediate',
    strand: 'Technique',
    detail:
      'Focus on hip rotation, chamber position, and controlled impact. Return to your stance after every kick.',
    cues: [
      'Pivot the support foot fully',
      'Turn the hip over on impact',
      'Chamber the knee before releasing',
      'Recover the leg quickly',
    ],
    loads: { beginner: '2 × 10', intermediate: '3 × 15', advanced: '5 × 20' },
  },
  {
    id: 'kneestrike',
    art: 'kneestrike',
    index: 5,
    title: 'Knee Strike Drill',
    blurb: 'Develop explosive knee strikes.',
    tier: 'Intermediate',
    strand: 'Explosive',
    detail:
      'Practice alternating knee strikes while maintaining proper posture and strong core engagement.',
    cues: [
      'Drive the knee upward explosively',
      'Pull imaginary targets into the strike',
      'Keep the core braced throughout',
      'Alternate legs with rhythm',
    ],
    loads: { beginner: '2 × 15', intermediate: '4 × 20', advanced: '5 × 30' },
  },
  {
    id: 'pushups',
    art: 'pushups',
    index: 6,
    title: 'Push-Ups',
    blurb: 'Build upper body strength.',
    tier: 'Beginner',
    strand: 'Strength',
    detail:
      'Maintain a straight body line while lowering your chest under control. Push back explosively while keeping your core engaged.',
    cues: [
      'Keep elbows at roughly 45 degrees',
      'Lower with control, press up fast',
      'Brace the core the entire set',
      'Full range on every rep',
    ],
    loads: { beginner: '2 × 10', intermediate: '3 × 15', advanced: '5 × 25' },
  },
  {
    id: 'squats',
    art: 'squats',
    index: 7,
    title: 'Squats',
    blurb: 'Strengthen legs and stability.',
    tier: 'Beginner',
    strand: 'Strength',
    detail:
      'Perform deep bodyweight squats with controlled movement to improve lower-body power for kicking techniques.',
    cues: [
      'Push the hips back as you descend',
      'Keep the knees tracking over the toes',
      'Drive through the heels',
      'Stay tall through the chest',
    ],
    loads: { beginner: '2 × 15', intermediate: '3 × 20', advanced: '5 × 30' },
  },
  {
    id: 'lunges',
    art: 'lunges',
    index: 8,
    title: 'Walking Lunges',
    blurb: 'Improve balance and leg power.',
    tier: 'Intermediate',
    strand: 'Strength',
    detail:
      'Take long, controlled steps while keeping your upper body stable and your knees aligned.',
    cues: [
      'Step long enough to drop the back knee',
      'Keep the torso upright',
      'Align the front knee over the ankle',
      'Drive through the front heel',
    ],
    loads: { beginner: '2 × 10', intermediate: '3 × 15', advanced: '4 × 20' },
  },
  {
    id: 'burpees',
    art: 'burpees',
    index: 9,
    title: 'Burpees',
    blurb: 'Increase conditioning and endurance.',
    tier: 'Advanced',
    strand: 'Endurance',
    detail:
      'Perform each repetition with full-body control while maintaining a steady pace throughout the workout.',
    cues: [
      'Keep a steady sustainable pace',
      'Land softly out of the jump',
      'Maintain a flat back in the plank',
      'Breathe in a consistent rhythm',
    ],
    loads: { beginner: '2 × 8', intermediate: '3 × 12', advanced: '5 × 20' },
  },
  {
    id: 'jumprope',
    art: 'jumprope',
    index: 10,
    title: 'Jump Rope',
    blurb: 'Boost coordination and cardio fitness.',
    tier: 'Beginner',
    strand: 'Endurance',
    detail:
      'Jump with light foot contact while maintaining a steady rhythm and relaxed shoulders.',
    cues: [
      'Turn the rope from the wrists',
      'Stay light on the balls of the feet',
      'Keep shoulders relaxed',
      'Find a rhythm you can sustain',
    ],
    loads: {
      beginner: '3 × 1 min',
      intermediate: '4 × 2 min',
      advanced: '6 × 3 min',
    },
  },
  {
    id: 'climbers',
    art: 'climbers',
    index: 11,
    title: 'Mountain Climbers',
    blurb: 'Improve core stability and stamina.',
    tier: 'Intermediate',
    strand: 'Endurance',
    detail:
      'Alternate knee drives quickly while keeping your shoulders stable over your hands.',
    cues: [
      'Keep the hips low and level',
      'Stack the shoulders over the wrists',
      'Drive the knees quickly',
      'Maintain steady breathing',
    ],
    loads: {
      beginner: '2 × 30 sec',
      intermediate: '4 × 45 sec',
      advanced: '5 × 60 sec',
    },
  },
  {
    id: 'plank',
    art: 'plank',
    index: 12,
    title: 'Plank Hold',
    blurb: 'Strengthen your entire core.',
    tier: 'Beginner',
    strand: 'Strength',
    detail:
      'Maintain a straight body position while keeping your core fully engaged.',
    cues: [
      'Line up the body from head to heels',
      'Squeeze the glutes and brace the core',
      'Keep the neck neutral',
      'Breathe steadily, do not hold your breath',
    ],
    loads: { beginner: '30 sec', intermediate: '60 sec', advanced: '90 sec' },
  },
  {
    id: 'highknees',
    art: 'highknees',
    index: 13,
    title: 'High Knees',
    blurb: 'Develop speed and endurance.',
    tier: 'Intermediate',
    strand: 'Endurance',
    detail:
      'Drive your knees upward while maintaining quick foot movement and upright posture.',
    cues: [
      'Drive the knees to hip height',
      'Stay on the balls of the feet',
      'Pump the arms in rhythm',
      'Keep the torso upright',
    ],
    loads: { beginner: '30 sec', intermediate: '45 sec', advanced: '60 sec' },
  },
  {
    id: 'bandpunch',
    art: 'bandpunch',
    index: 14,
    title: 'Resistance Band Punches',
    blurb: 'Increase punching strength.',
    tier: 'Intermediate',
    strand: 'Strength',
    detail:
      'Perform controlled punches against band resistance while maintaining proper technique.',
    cues: [
      'Anchor the band securely behind you',
      'Punch with full extension',
      'Control the return against tension',
      'Keep the guard tight',
    ],
    loads: { beginner: '2 × 15', intermediate: '3 × 20', advanced: '5 × 25' },
  },
  {
    id: 'twists',
    art: 'twists',
    index: 15,
    title: 'Russian Twists',
    blurb: 'Improve rotational core power.',
    tier: 'Intermediate',
    strand: 'Strength',
    detail:
      'Rotate your torso smoothly while keeping your core activated throughout the movement.',
    cues: [
      'Lean back to load the abs',
      'Rotate from the ribcage',
      'Keep the movement controlled',
      'Tap each side evenly',
    ],
    loads: { beginner: '2 × 20', intermediate: '3 × 30', advanced: '5 × 40' },
  },
  {
    id: 'crunches',
    art: 'crunches',
    index: 16,
    title: 'Bicycle Crunches',
    blurb: 'Build abdominal endurance.',
    tier: 'Beginner',
    strand: 'Endurance',
    detail:
      'Alternate elbows toward opposite knees while maintaining steady breathing.',
    cues: [
      'Bring elbow and opposite knee together',
      'Keep the lower back grounded',
      'Move with control, not momentum',
      'Breathe steadily throughout',
    ],
    loads: { beginner: '2 × 20', intermediate: '3 × 30', advanced: '5 × 40' },
  },
  {
    id: 'sideplank',
    art: 'sideplank',
    index: 17,
    title: 'Side Plank',
    blurb: 'Strengthen obliques and stability.',
    tier: 'Intermediate',
    strand: 'Strength',
    detail:
      'Hold a straight side plank position while engaging your hips and core muscles.',
    cues: [
      'Stack the shoulder over the elbow',
      'Lift the hips high and hold',
      'Keep the body in one line',
      'Repeat evenly on both sides',
    ],
    loads: { beginner: '20 sec', intermediate: '40 sec', advanced: '60 sec' },
  },
  {
    id: 'jumpsquat',
    art: 'jumpsquat',
    index: 18,
    title: 'Jump Squats',
    blurb: 'Develop explosive lower-body power.',
    tier: 'Advanced',
    strand: 'Explosive',
    detail:
      'Explode upward from each squat and land softly before beginning the next repetition.',
    cues: [
      'Load into a full squat',
      'Explode straight up',
      'Land softly with bent knees',
      'Reset before the next rep',
    ],
    loads: { beginner: '2 × 8', intermediate: '3 × 12', advanced: '5 × 20' },
  },
  {
    id: 'footwork',
    art: 'footwork',
    index: 19,
    title: 'Fast Footwork Drill',
    blurb: 'Improve agility and movement.',
    tier: 'Intermediate',
    strand: 'Mobility',
    detail:
      'Perform quick directional steps while maintaining proper fighting stance and balance.',
    cues: [
      'Stay light and springy',
      'Keep the stance intact while moving',
      'Change direction sharply',
      'Keep the guard up the whole time',
    ],
    loads: { beginner: '30 sec', intermediate: '45 sec', advanced: '60 sec' },
  },
  {
    id: 'cooldown',
    art: 'cooldown',
    index: 20,
    title: 'Cool Down Stretch',
    blurb: 'Support flexibility and recovery.',
    tier: 'Beginner',
    strand: 'Mobility',
    detail:
      'Stretch major muscle groups used during training to reduce stiffness and improve mobility after exercise.',
    cues: [
      'Move into each stretch slowly',
      'Hold without bouncing',
      'Breathe deeply to relax',
      'Cover every major muscle group',
    ],
    loads: { beginner: '5 min', intermediate: '8 min', advanced: '10 min' },
  },
];

export const STRAND_ORDER: DrillStrand[] = [
  'Technique',
  'Strength',
  'Endurance',
  'Explosive',
  'Mobility',
];
