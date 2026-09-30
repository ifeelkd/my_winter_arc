/* ═══════════════════════════════════════════════════════════════
   WINTER ARC 2026 — Main Application (Story Mode & Samsung/WHOOP UX)
   ═══════════════════════════════════════════════════════════════ */
import './style.css';
import { EXERCISE_VISUALS } from './exerciseVisuals.js';
import {
  supabase,
  getCurrentUser,
  signIn,
  signUp,
  signOut,
  pullCloudToLocal,
  pushDayToCloud,
  pushProfileToCloud,
} from './supabase.js';

// ─── Constants ─────────────────────────────────────────────────
const ARC_START = new Date(2026, 9, 1); // Oct 1, 2026
const ARC_END = new Date(2026, 11, 31); // Dec 31, 2026
const TOTAL_DAYS = 92;
const STORAGE_KEY = 'winter_arc_2026';

// ─── Audio Synthesis (High-Tech Haptic Chimes) ──────────────────
function playSound(type = 'ping') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'ping') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'timer') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'levelup') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.18);
        o.start(ctx.currentTime + idx * 0.07);
        o.stop(ctx.currentTime + idx * 0.07 + 0.18);
      });
    }
  } catch (e) {
    // Audio context may be deferred until user gesture
  }
}

// ─── Motivational Quotes ───────────────────────────────────────
const QUOTES = [
  { text: "Do not try to be perfect. Try to be consistent.", emoji: "🧊" },
  { text: "Your only job today: do today's work.", emoji: "⛓️" },
  { text: "Reduce the workout before you eliminate the habit.", emoji: "🦾" },
  { text: "One bad meal does not become a bad week.", emoji: "🌑" },
  { text: "A 10-minute walk is better than waiting for a perfect 60-minute walk.", emoji: "🏔️" },
  { text: "Train hard. Walk daily. Eat well. Sleep deeply.", emoji: "❄️" },
  { text: "Show up. Even on the bad days.", emoji: "🌌" },
  { text: "Progress is not linear. Your effort is what matters.", emoji: "📈" },
  { text: "You don't need a gym. You need discipline.", emoji: "🪨" },
  { text: "The goal isn't a perfect streak. The goal is that your baseline has changed.", emoji: "💎" },
  { text: "Every rep you do is a vote for the person you're becoming.", emoji: "⏳" },
  { text: "Small steps compound. Trust the process.", emoji: "⌚" },
  { text: "You're not behind. You're exactly where you need to be.", emoji: "🧭" },
  { text: "Consistency beats intensity. Always.", emoji: "♾️" },
  { text: "Your future self will thank you for today.", emoji: "🪞" },
  { text: "10K steps feels normal when you make it non-negotiable.", emoji: "👟" },
  { text: "Sleep is not laziness. Sleep is recovery.", emoji: "🛌" },
  { text: "The cold won't stop you. Nothing will.", emoji: "🥶" },
  { text: "Protect the habit. That's all you need to do.", emoji: "🛡️" },
  { text: "You started this for a reason. Remember it.", emoji: "🧿" },
];

// ─── Weekly Schedule (With Full Choices on Tue & Thu) ───────────
const WEEKLY_SCHEDULE = [
  { 
    day: 'Monday', 
    session: 'Full Body Push', 
    type: 'strength', 
    icon: '💥',
    intensity: 'High Strain • 14.2',
    estTime: '30–40 min',
    estBurn: '~220 kcal',
    exercises: [
      { name: 'Squat', reps: '15 reps', muscle: 'Legs', progression: 'Backpack squat' },
      { name: 'Push-up', reps: '10 reps', muscle: 'Chest', progression: 'Harder variation' },
      { name: 'Reverse Lunge', reps: '10/leg', muscle: 'Legs', progression: 'Backpack lunge' },
      { name: 'Pike Push-up', reps: '8 reps', muscle: 'Shoulders', progression: 'Deeper variation' },
      { name: 'Glute Bridge', reps: '15 reps', muscle: 'Glutes', progression: 'Single-leg bridge' },
    ]
  },
  { 
    day: 'Tuesday', 
    session: 'Cardio / Yoga / Pilates', 
    type: 'cardio', 
    icon: '🏃',
    intensity: 'Moderate Aerobic • 11.5',
    estTime: '20–40 min',
    estBurn: '~250 kcal',
    isChoiceDay: true,
    choices: [
      {
        id: 'run',
        name: 'Zone 2 Running / Jogging',
        icon: '🏃',
        desc: 'Conversational pace • Build aerobic engine',
        exercises: [
          { name: 'Running / Jogging', reps: '20–40 min', muscle: 'Cardiovascular, Legs' }
        ]
      },
      {
        id: 'yoga',
        name: 'Power Yoga Flow',
        icon: '🧘',
        desc: 'Vinyasa flow • Spine & hip decompression',
        exercises: [
          { name: 'Power Yoga', reps: '25–40 min', muscle: 'Full Body Mobility' }
        ]
      },
      {
        id: 'pilates',
        name: 'Core & Mat Pilates',
        icon: '🤸',
        desc: 'Powerhouse stability • Posture & control',
        exercises: [
          { name: 'Mat Pilates', reps: '20–35 min', muscle: 'Core, Glutes' }
        ]
      }
    ]
  },
  { 
    day: 'Wednesday', 
    session: 'Full Body Pull', 
    type: 'strength', 
    icon: '🏋️',
    intensity: 'High Strain • 13.8',
    estTime: '30–45 min',
    estBurn: '~230 kcal',
    exercises: [
      { name: 'Backpack Romanian Deadlift', reps: '12 reps', muscle: 'Hamstrings/Back', progression: 'Add weight' },
      { name: 'Backpack Row', reps: '12 reps', muscle: 'Back', progression: 'Add weight' },
      { name: 'Hamstring Walkout', reps: '10 reps', muscle: 'Hamstrings' },
      { name: 'Reverse Fly', reps: '12 reps', muscle: 'Rear Delts' },
      { name: 'Biceps Curl', reps: '12 reps', muscle: 'Biceps', progression: 'Add weight' },
    ]
  },
  { 
    day: 'Thursday', 
    session: 'Cardio + Mobility', 
    type: 'cardio', 
    icon: '🧘',
    intensity: 'Active Conditioning • 10.2',
    estTime: '25–45 min',
    estBurn: '~210 kcal',
    isChoiceDay: true,
    choices: [
      {
        id: 'run',
        name: 'Brisk Run / Ruck Walk',
        icon: '🏃',
        desc: 'Fast pace or weighted backpack walk',
        exercises: [
          { name: 'Running / Jogging', reps: '20–35 min', muscle: 'Cardio, Legs' }
        ]
      },
      {
        id: 'yoga',
        name: 'Dynamic Yoga Flow',
        icon: '🧘',
        desc: 'Spine mobility & deep nasal breathing',
        exercises: [
          { name: 'Power Yoga', reps: '20–35 min', muscle: 'Full Body' }
        ]
      },
      {
        id: 'pilates',
        name: 'Core Power Pilates',
        icon: '🤸',
        desc: 'Tabletop holds & posterior chain control',
        exercises: [
          { name: 'Mat Pilates', reps: '20–30 min', muscle: 'Core, Stability' }
        ]
      }
    ],
    fixedExercises: [
      { name: 'Mobility Flow', reps: '5–10 min', muscle: 'Ankles, Hips, Hamstrings, Spine, Shoulders' }
    ]
  },
  { 
    day: 'Friday', 
    session: 'Upper Body', 
    type: 'strength', 
    icon: '💪',
    intensity: 'High Strain • 13.5',
    estTime: '30–40 min',
    estBurn: '~210 kcal',
    exercises: [
      { name: 'Push-up', reps: '10 reps', muscle: 'Chest', progression: '10–15 reps' },
      { name: 'Backpack Row', reps: '12 reps', muscle: 'Back', progression: '12–15 reps' },
      { name: 'Pike Push-up', reps: '8 reps', muscle: 'Shoulders', progression: '8–12 reps' },
      { name: 'Biceps Curl', reps: '12 reps', muscle: 'Biceps', progression: '12–15 reps' },
      { name: 'Overhead Triceps Extension', reps: '12 reps', muscle: 'Triceps', progression: '12–15 reps' },
      { name: 'Plank', reps: '30 sec', muscle: 'Core', progression: '45–60 sec' },
    ]
  },
  { 
    day: 'Saturday', 
    session: 'Lower Body + Core', 
    type: 'strength', 
    icon: '🦵',
    intensity: 'High Strain • 14.5',
    estTime: '35–45 min',
    estBurn: '~260 kcal',
    exercises: [
      { name: 'Squat', reps: '15 reps', muscle: 'Legs', progression: '15–20 reps' },
      { name: 'Reverse Lunge', reps: '10/leg', muscle: 'Legs', progression: '10–12/leg' },
      { name: 'Glute Bridge', reps: '15 reps', muscle: 'Glutes', progression: '15–20 reps' },
      { name: 'Calf Raise', reps: '20 reps', muscle: 'Calves', progression: '20–30 reps' },
      { name: 'Wall Sit', reps: '30 sec', muscle: 'Legs', progression: '45–60 sec' },
      { name: 'Dead Bug', reps: '10/side', muscle: 'Core', progression: '12–15/side' },
    ]
  },
  { 
    day: 'Sunday', 
    session: 'Active Recovery', 
    type: 'recovery', 
    icon: '🌿',
    intensity: 'Restorative • 5.0',
    estTime: '20–30 min',
    estBurn: '~120 kcal',
    exercises: [
      { name: 'Easy Walking', reps: '15–30 min', muscle: 'Recovery' },
      { name: 'Mobility Flow', reps: '10–15 min', muscle: 'Flexibility' },
      { name: 'Meal Preparation', reps: 'Batch clean food', muscle: 'Nutrition' },
    ]
  },
];

// ─── Comprehensive Exercise Tutorials ──────────────────────────
const EXERCISE_TUTORIALS = {
  'Squat': {
    icon: '🦵',
    category: 'legs',
    difficulty: 'Beginner',
    muscles: 'Quads, Glutes, Hamstrings',
    cueDo: 'Push knees out over toes, keep chest tall, drive through heels.',
    cueDont: 'Never let heels lift off the floor or knees collapse inward.',
    steps: [
      { title: 'Starting Position', desc: 'Stand with feet shoulder-width apart, toes slightly turned out. Keep your chest up and core braced.' },
      { title: 'The Descent', desc: 'Push your hips back and bend your knees, as if sitting into a chair. Keep weight distributed over midfoot and heels.' },
      { title: 'Depth', desc: 'Lower until thighs are parallel to the floor (90° knee angle). Keep knees tracking in line with toes.' },
      { title: 'The Ascent', desc: 'Drive through your heels to stand up. Squeeze glutes firmly at top lockout.' },
    ],
    tip: 'Keep your heels glued to the floor. If they lift, widen your stance or place small book under heels.'
  },
  'Push-up': {
    icon: '💪',
    category: 'push',
    difficulty: 'Beginner',
    muscles: 'Chest, Shoulders, Triceps',
    cueDo: 'Maintain a straight plank bodyline; tuck elbows to 45° from ribs.',
    cueDont: 'Do not allow hips to sag or flare elbows out wide to 90° (T-shape).',
    steps: [
      { title: 'Starting Position', desc: 'Hands slightly wider than shoulder-width. Body forms a rigid straight line from crown to heels.' },
      { title: 'Lower Down', desc: 'Bend elbows at a 45° angle to lower chest toward the floor with steady control.' },
      { title: 'Bottom Position', desc: 'Chest gently grazes an inch above the floor. Core remains iron-tight.' },
      { title: 'Push Up', desc: 'Press hard through entire palm to return to top plank. Do not violently snap elbows.' },
    ],
    tip: 'If standard push-ups break form, perform hands-elevated or knee push-ups with complete depth.'
  },
  'Reverse Lunge': {
    icon: '🦵',
    category: 'legs',
    difficulty: 'Beginner',
    muscles: 'Quads, Glutes, Hamstrings',
    cueDo: 'Keep torso completely vertical; bend both knees to 90° angles.',
    cueDont: 'Avoid slamming your rear knee into the floor or leaning forward excessively.',
    steps: [
      { title: 'Starting Position', desc: 'Stand tall with feet hip-width apart, hands on hips or braced at chest.' },
      { title: 'Step Back', desc: 'Take a smooth, controlled stride backward onto the ball of your back foot.' },
      { title: 'Lower Down', desc: 'Bend both knees to 90°. Rear knee hovers 1 inch above the ground.' },
      { title: 'Return', desc: 'Drive through front heel to return to standing position. Alternate legs.' },
    ],
    tip: 'Reverse lunges protect knees much better than forward lunges. Keep your weight centered.'
  },
  'Pike Push-up': {
    icon: '💪',
    category: 'push',
    difficulty: 'Intermediate',
    muscles: 'Shoulders (Delts), Triceps',
    cueDo: 'Form a sharp inverted V; lower head slightly forward forming a tripod.',
    cueDont: 'Do not flare elbows or let your hips sink down into a normal plank.',
    steps: [
      { title: 'Starting Position', desc: 'Push-up position, then walk feet forward until hips are high in an inverted V shape.' },
      { title: 'Hand Placement', desc: 'Hands shoulder-width apart, look slightly ahead at floor.' },
      { title: 'Lower Down', desc: 'Bend elbows back, lowering the crown of your head forward into a tripod point with hands.' },
      { title: 'Push Up', desc: 'Press through your palms and shoulders back into the high pike lockout.' },
    ],
    tip: 'Elevate your feet on a low stool or stair to dramatically increase vertical pressing overload.'
  },
  'Glute Bridge': {
    icon: '🍑',
    category: 'legs',
    difficulty: 'Beginner',
    muscles: 'Glutes, Hamstrings, Core',
    cueDo: 'Drive through heels, squeeze glutes hard for 2 seconds at the top.',
    cueDont: 'Do not hyperextend or arch your lower spine past neutral alignment.',
    steps: [
      { title: 'Starting Position', desc: 'Lie on your back, knees bent at 90°, feet flat hip-width apart.' },
      { title: 'Engage Core', desc: 'Flatten your lumbar spine against floor by engaging your abdominals.' },
      { title: 'Lift Hips', desc: 'Drive through heels to elevate hips until thighs and torso form a straight ramp.' },
      { title: 'Hold & Lower', desc: 'Squeeze glutes maximally for 2 seconds, then slowly lower back down.' },
    ],
    tip: 'Progress to single-leg glute bridges once 15 reps feels effortless.'
  },
  'Backpack Romanian Deadlift': {
    icon: '🎒',
    category: 'pull',
    difficulty: 'Beginner',
    muscles: 'Hamstrings, Glutes, Lower Back',
    cueDo: 'Push hips backward towards wall with soft knees; keep spine iron-flat.',
    cueDont: 'This is not a squat — do not drop hips; never round your upper or lower back.',
    steps: [
      { title: 'Setup', desc: 'Hold loaded backpack by top handle against thighs, feet hip-width apart.' },
      { title: 'Hip Hinge', desc: 'Push hips straight back while keeping a slight soft bend in knees.' },
      { title: 'Descent', desc: 'Slide backpack down along shins until you feel a deep hamstring stretch.' },
      { title: 'Lockout', desc: 'Drive hips forward, squeezing glutes to stand tall.' },
    ],
    tip: 'Keep the backpack dragging close to your legs. Shaving your legs with the weight protects the spine.'
  },
  'Backpack Row': {
    icon: '🎒',
    category: 'pull',
    difficulty: 'Beginner',
    muscles: 'Lats, Rhomboids, Biceps',
    cueDo: 'Drive elbows toward your back hips; pinch shoulder blades together.',
    cueDont: 'Avoid using torso momentum or swinging the weight up.',
    steps: [
      { title: 'Setup', desc: 'Hinge forward at hips at a 45° angle with a flat back. Backpack hangs with arms extended.' },
      { title: 'The Pull', desc: 'Pull elbows back past ribs toward your hips, contracting back muscles.' },
      { title: 'Peak Squeeze', desc: 'Pinch shoulder blades hard for 1 second at top position.' },
      { title: 'Lower Down', desc: 'Slowly lower backpack back down with 2-second eccentric control.' },
    ],
    tip: 'Imagine crushing an orange between your shoulder blades at the top of each rep.'
  },
  'Hamstring Walkout': {
    icon: '🦵',
    category: 'legs',
    difficulty: 'Intermediate',
    muscles: 'Hamstrings, Glutes',
    cueDo: 'Keep hips elevated off floor as you take small steps outward.',
    cueDont: 'Do not let hips drop to the ground or rush the walkout steps.',
    steps: [
      { title: 'Start', desc: 'Lie on back in a glute bridge position with hips elevated.' },
      { title: 'Step Out', desc: 'Take small heel steps away from body, one foot at a time.' },
      { title: 'Full Extension', desc: 'Walk out until legs are nearly fully straight while keeping hips airborne.' },
      { title: 'Step Back', desc: 'Walk heels back into starting bridge position.' },
    ],
    tip: 'If cramping occurs, reduce the distance of the walkout steps by a few inches.'
  },
  'Reverse Fly': {
    icon: '🦅',
    category: 'pull',
    difficulty: 'Beginner',
    muscles: 'Rear Delts, Upper Back',
    cueDo: 'Lead with elbows out wide like wings; pause for brief contraction.',
    cueDont: 'Do not use excessive weight or shrug traps up toward your ears.',
    steps: [
      { title: 'Setup', desc: 'Hinge forward 45°, light weight or water bottles in hands with arms hanging.' },
      { title: 'Fly Outward', desc: 'Raise arms out to sides with slight bend in elbows, pinching rear deltoids.' },
      { title: 'Squeeze', desc: 'Pause at parallel, contracting the back of your shoulders.' },
      { title: 'Lower', desc: 'Lower slowly back under control.' },
    ],
    tip: 'Rear deltoids respond best to high reps and strict form, not heavy weights.'
  },
  'Biceps Curl': {
    icon: '💪',
    category: 'pull',
    difficulty: 'Beginner',
    muscles: 'Biceps, Forearms',
    cueDo: 'Pin upper arms to your ribs; squeeze biceps hard at top.',
    cueDont: 'Do not swing hips or allow elbows to drift forward.',
    steps: [
      { title: 'Setup', desc: 'Stand tall holding backpack handles with palms facing up.' },
      { title: 'Curl', desc: 'Bend elbows to curl weight towards shoulders, keeping upper arms stationary.' },
      { title: 'Squeeze', desc: 'Hard contraction at top for 1 full second.' },
      { title: 'Lower', desc: 'Take 2–3 seconds to lower down to full arm extension.' },
    ],
    tip: 'Control the lowering phase — muscle growth happens predominantly on the eccentric stretch.'
  },
  'Overhead Triceps Extension': {
    icon: '💪',
    category: 'push',
    difficulty: 'Beginner',
    muscles: 'Triceps',
    cueDo: 'Keep elbows pointing forward and tucked close to ears.',
    cueDont: 'Do not let elbows flare wide or arch your lower spine.',
    steps: [
      { title: 'Setup', desc: 'Hold weight behind head with both hands, elbows pointing upward.' },
      { title: 'Extend', desc: 'Straighten arms overhead, pressing weight toward ceiling.' },
      { title: 'Lockout', desc: 'Squeeze triceps at top extension.' },
      { title: 'Lower', desc: 'Lower weight slowly back behind head until full triceps stretch.' },
    ],
    tip: 'Squeeze your glutes and core to keep your torso perfectly upright.'
  },
  'Plank': {
    icon: '🧱',
    category: 'core',
    difficulty: 'Beginner',
    muscles: 'Core, Transverse Abdominis',
    cueDo: 'Create maximum tension by bracing abs like taking a punch.',
    cueDont: 'Do not let hips sag towards floor or pike up into a mountain.',
    steps: [
      { title: 'Setup', desc: 'Forearms on floor, elbows directly under shoulders, feet together.' },
      { title: 'Alignment', desc: 'Body forms an unbreakable straight line from ears to heels.' },
      { title: 'Brace', desc: 'Squeeze glutes and brace abdominals hard while taking steady nasal breaths.' },
      { title: 'Hold', desc: 'Hold until form begins to break, then rest 30s and repeat.' },
    ],
    tip: 'A 30-second plank with 100% full-body tension is 5x more effective than a loose 2-minute plank.'
  },
  'Calf Raise': {
    icon: '🦵',
    category: 'legs',
    difficulty: 'Beginner',
    muscles: 'Calves (Gastrocnemius & Soleus)',
    cueDo: 'Rise high on balls of big toes; pause 1s at top, 2s stretch at bottom.',
    cueDont: 'Do not bounce quickly without pauses.',
    steps: [
      { title: 'Setup', desc: 'Stand on a step or floor, hand on wall for stability.' },
      { title: 'Elevate', desc: 'Push through balls of feet to elevate heels as high as possible.' },
      { title: 'Hold', desc: 'Lockout calves at top for 1 full second.' },
      { title: 'Stretch', desc: 'Lower heels down with a 2-second deep stretch.' },
    ],
    tip: 'Single-leg calf raises will double the resistance immediately without needing weights.'
  },
  'Wall Sit': {
    icon: '🧱',
    category: 'legs',
    difficulty: 'Beginner',
    muscles: 'Quads, Glutes',
    cueDo: 'Thighs parallel to floor at 90°; push lower back flat against wall.',
    cueDont: 'Do not rest hands on thighs to assist or slide knees past 90°.',
    steps: [
      { title: 'Position', desc: 'Lean back against wall and slide down until thighs are parallel to ground.' },
      { title: 'Knees & Feet', desc: 'Knees bent 90°, directly above ankles. Weight in heels.' },
      { title: 'Breathe', desc: 'Arms across chest or hanging at sides. Deep calm breathing.' },
      { title: 'Hold', desc: 'Stay locked for target duration.' },
    ],
    tip: 'Focus on slow diaphragmatic breathing to manage the intense quad burn.'
  },
  'Dead Bug': {
    icon: '🐛',
    category: 'core',
    difficulty: 'Beginner',
    muscles: 'Deep Core, Pelvic Stability',
    cueDo: 'Press lumbar spine firmly into floor; move opposite limbs with control.',
    cueDont: 'Do not allow lower back to arch off floor at any point.',
    steps: [
      { title: 'Starting Position', desc: 'Lie on back, arms straight up, knees bent 90° above hips.' },
      { title: 'Floor Seal', desc: 'Brace core so entire lower back is glued flat to floor.' },
      { title: 'Opposite Extension', desc: 'Slowly lower left arm overhead and right leg toward floor.' },
      { title: 'Return & Switch', desc: 'Return to center, then extend right arm and left leg.' },
    ],
    tip: 'If your back arches off the floor, do not lower your leg as deep.'
  },
  'Running / Jogging': {
    icon: '🏃',
    category: 'cardio',
    difficulty: 'Beginner',
    muscles: 'Cardiovascular Engine, Legs',
    cueDo: 'Maintain an easy conversational Zone 2 pace; slight forward lean from ankles.',
    cueDont: 'Do not sprint or gas yourself out early; you should be able to speak in full sentences.',
    steps: [
      { title: 'Warm-up', desc: 'Start with 3 minutes of brisk walking to prepare calves and ankles.' },
      { title: 'Pacing', desc: 'Settle into an easy rhythm where breathing is calm and rhythmic.' },
      { title: 'Posture', desc: 'Head neutral, shoulders relaxed, arms swinging naturally at 90°.' },
      { title: 'Cooldown', desc: 'Finish with 3 minutes of easy walking and deep breaths.' },
    ],
    tip: 'Zone 2 cardio builds the mitochondrial base for all strength, fat burning, and recovery.'
  },
  'Power Yoga': {
    icon: '🧘',
    category: 'cardio',
    difficulty: 'Beginner',
    muscles: 'Spine, Hips, Hamstrings, Shoulders',
    cueDo: 'Synchronize every transition with deep nasal inhalations and exhalations.',
    cueDont: 'Do not force or yank joints into painful end-ranges; honor your mobility.',
    steps: [
      { title: 'Opening', desc: 'Child’s pose and cat-cow breathing for 3 minutes to warm spine.' },
      { title: 'Standing Flow', desc: 'Sun salutation sequence: Downward Dog → Warrior I/II → Triangle.' },
      { title: 'Hip Openers', desc: 'Pigeon pose or low lunge holds (45s per side).' },
      { title: 'Cooldown', desc: 'Gentle supine twist and 2 minutes of relaxed breathing.' },
    ],
    tip: 'Yoga on your Winter Arc removes joint stiffness and speeds up recovery from push/pull days.'
  },
  'Mat Pilates': {
    icon: '🤸',
    category: 'cardio',
    difficulty: 'Beginner',
    muscles: 'Transverse Core, Glutes, Posture',
    cueDo: 'Engage the pelvic floor and draw belly button inward toward spine throughout.',
    cueDont: 'Do not hold your breath or jerk through repetitions.',
    steps: [
      { title: 'The Hundred', desc: 'Legs tabletop or 45°, head curled up, pumping arms rhythmically with breathing.' },
      { title: 'Roll-ups', desc: 'Vertebra by vertebra articulation from floor to toes.' },
      { title: 'Single Leg Circles', desc: 'Stabilizing hips flat while circling leg with strict control.' },
      { title: 'Plank Variations', desc: 'Side planks and bird-dogs to cement rotational stability.' },
    ],
    tip: 'Pilates develops the deep internal corset muscles that protect your spine during deadlifts.'
  },
  'Mobility Flow': {
    icon: '🌿',
    category: 'recovery',
    difficulty: 'Beginner',
    muscles: 'Joints: Ankles, Hips, Thoracic Spine',
    cueDo: 'Move through active ranges of motion; breathe into tight corners.',
    cueDont: 'Do not bounce aggressively into tight ligaments.',
    steps: [
      { title: 'Ankle Rocks', desc: 'Knee-to-wall ankle dorsiflexion rocks (15 reps/side).' },
      { title: '90/90 Hip Switches', desc: 'Sitting on floor, rotating knees side to side to open internal hip rotation.' },
      { title: 'Thoracic Rotations', desc: 'Quadruped thread-the-needle spine opener.' },
      { title: 'Deep Squat Hold', desc: 'Sink into deep squat, chest up, elbows gently pressing knees apart.' },
    ],
    tip: 'Doing this 10-minute flow daily keeps your hips and knees completely pain-free.'
  },
  'Easy Walking': {
    icon: '🚶',
    category: 'recovery',
    difficulty: 'Beginner',
    muscles: 'Full Body Blood Flow & Lymphatic Drainage',
    cueDo: 'Brisk natural stride, eyes on horizon, nasal breathing.',
    cueDont: 'Avoid hunching over your phone screen while walking.',
    steps: [
      { title: 'Step Outside', desc: 'Walk outdoors in natural daylight to sync circadian rhythms.' },
      { title: 'Rhythm', desc: 'Maintain an easy, continuous pace for 20–40 minutes.' },
      { title: 'Recovery', desc: 'Flushes metabolic waste from legs and resets mental clarity.' },
    ],
    tip: 'Walking is the most underrated fat burner and central nervous system restorative tool in existence.'
  }
};

// ─── Daily Arc Quests (Story Mode) ─────────────────────────────
const DAILY_QUESTS = [
  { id: 'workout', title: 'Main Story: The Iron Trial', desc: 'Complete today\'s scheduled training protocol', xp: 100, icon: '⛓️' },
  { id: 'steps', title: 'Scout Quest: Frozen March', desc: 'Conquer today\'s progressive step quota', xp: 75, icon: '🏔️' },
  { id: 'focus', title: 'Mind Mastery: Deep Focus', desc: '60 minutes of uninterrupted high-leverage work', xp: 50, icon: '🌌' },
  { id: 'water', title: 'Vitality Elixir: Clean Hydration', desc: 'Drink 3L+ of mountain spring water', xp: 40, icon: '🧊' },
  { id: 'protein', title: 'Warrior Fuel: Clean Nutrition', desc: 'High-protein whole foods without junk', xp: 40, icon: '🪨' },
  { id: 'sleep', title: 'Sanctuary: Restorative Sleep', desc: 'Protect 7–9 hours of deep biological recovery', xp: 50, icon: '🌑' },
];

// ─── Player Progression / Ranks (Story Mode) ───────────────────
const PLAYER_RANKS = [
  { level: 1, title: 'Frost Initiate', minXP: 0, icon: '❄️' },
  { level: 2, title: 'Cold Strider', minXP: 250, icon: '🏔️' },
  { level: 3, title: 'Iron Pilgrim', minXP: 600, icon: '⚔️' },
  { level: 4, title: 'Blizzard Vanguard', minXP: 1100, icon: '🛡️' },
  { level: 5, title: 'Glacial Sentinel', minXP: 1800, icon: '🐺' },
  { level: 6, title: 'Arctic Breaker', minXP: 2700, icon: '⚡' },
  { level: 7, title: 'Mountain Ascendant', minXP: 3800, icon: '🦅' },
  { level: 8, title: 'Permafrost Master', minXP: 5100, icon: '👑' },
  { level: 9, title: 'Frostborn Paragon', minXP: 6600, icon: '💎' },
  { level: 10, title: 'Arc Sovereign', minXP: 8500, icon: '🌌' }
];

function getPlayerLevel(xp) {
  let current = PLAYER_RANKS[0];
  let next = PLAYER_RANKS[1];
  for (let i = PLAYER_RANKS.length - 1; i >= 0; i--) {
    if (xp >= PLAYER_RANKS[i].minXP) {
      current = PLAYER_RANKS[i];
      next = PLAYER_RANKS[i + 1] || null;
      break;
    }
  }
  const currentBase = current.minXP;
  const nextTarget = next ? next.minXP : currentBase + 2000;
  const progressXP = xp - currentBase;
  const requiredXP = nextTarget - currentBase;
  const pct = Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));
  return { ...current, next, pct, currentXP: xp, progressXP, requiredXP, nextTarget };
}

function calculateTotalXP(data) {
  let xp = 0;
  Object.values(data.days || {}).forEach(day => {
    // Exercises (30 XP each)
    const exCount = Object.values(day.exercises || {}).filter(Boolean).length;
    xp += exCount * 30;

    // Sets completed (10 XP each)
    const setCount = Object.values(day.sets || {}).filter(Boolean).length;
    xp += setCount * 10;

    // Daily checklist / quests (25 XP each)
    const chkCount = Object.values(day.checklist || {}).filter(Boolean).length;
    xp += chkCount * 25;

    // Step bonuses
    if (day.steps >= 8000) xp += 40;
    if (day.steps >= 10000) xp += 50;

    // Win of day
    if (day.win && day.win.trim()) xp += 30;
  });
  return xp;
}

function triggerFloatingXP(amount, event) {
  const el = document.createElement('div');
  el.className = 'floating-xp';
  el.textContent = `+${amount} XP ✨`;
  const x = event && event.clientX ? event.clientX : window.innerWidth / 2;
  const y = event && event.clientY ? event.clientY : window.innerHeight / 2;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ─── Badges / Achievements ─────────────────────────────────────
const BADGES = [
  { id: 'first_day', name: 'Frost Initiate', desc: 'Conquer your first day on the mountain', icon: '❄️', check: d => d.totalDaysCompleted >= 1 },
  { id: 'week_1', name: 'Cold Habit', desc: 'Hold the line for 7 days straight', icon: '🗓️', check: d => d.totalDaysCompleted >= 7 },
  { id: 'streak_7', name: 'Blizzard Fire', desc: '7-day unbroken momentum streak', icon: '🔥', check: d => d.currentStreak >= 7 },
  { id: 'streak_14', name: 'Iron Will', desc: '14-day streak — this is who you are now', icon: '⚡', check: d => d.currentStreak >= 14 },
  { id: 'streak_30', name: 'Unbreakable', desc: '30-day streak of pure discipline', icon: '🛡️', check: d => d.currentStreak >= 30 },
  { id: 'month_1', name: 'Act I Victor', desc: 'Conquer October Foundation (Day 31)', icon: '🧱', check: d => d.totalDaysCompleted >= 31 },
  { id: 'month_2', name: 'The Crucible', desc: 'Conquer November Build (Day 61)', icon: '🐺', check: d => d.totalDaysCompleted >= 61 },
  { id: 'full_arc', name: 'Arc Sovereign', desc: 'Complete all 92 days — Transformed', icon: '👑', check: d => d.totalDaysCompleted >= 92 },
  { id: 'steps_10k', name: '10K Strider', desc: 'Hit 10,000 steps in a single day', icon: '👟', check: d => d.maxSteps >= 10000 },
  { id: 'perfect_week', name: 'Flawless Week', desc: 'Complete all 7 days of training in a week', icon: '💎', check: d => d.perfectWeeks >= 1 },
  { id: 'sixty_days', name: 'The 60-Day Titan', desc: 'Hit 60 days — your life baseline is changed', icon: '🦸', check: d => d.totalDaysCompleted >= 60 },
  { id: 'comeback', name: 'Resilient Comeback', desc: 'Return after a missed day with zero guilt', icon: '🔄', check: d => d.comebacks >= 1 },
];

// ─── Data Layer ────────────────────────────────────────────────
function getDefaultData() {
  return {
    onboardingComplete: false,
    userName: '',
    userAvatar: '',
    startDate: ARC_START.toISOString(),
    days: {},
    settings: {
      notifications: true,
      darkMode: true,
    }
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaultData(), ...parsed };
    }
  } catch (e) {
    console.error('Failed to load data:', e);
  }
  return getDefaultData();
}

function saveData(data, dayKey = null) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (CURRENT_USER) {
      const key = dayKey || dateKey(today());
      if (data.days && data.days[key]) {
        pushDayToCloud(CURRENT_USER.id, key, data.days[key]);
      }
      if (data.userName || data.userAvatar) {
        pushProfileToCloud(CURRENT_USER.id, {
          display_name: data.userName,
          avatar: data.userAvatar || 'wolf'
        });
      }
    }
  } catch (e) {
    console.error('Failed to save data:', e);
  }
}

// Cloud-aware day save — fire-and-forget, never blocks UI
function saveDayData(dayDate) {
  const key = dateKey(dayDate || today());
  saveData(APP_DATA, key);
}

let APP_DATA = loadData();
let CURRENT_USER = null; // Set after auth check on boot

// ─── Utilities ─────────────────────────────────────────────────
function today() {
  return new Date();
}

function dateKey(d) {
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toISOString().split('T')[0];
}

function getDayNumber(d) {
  const dt = d instanceof Date ? d : new Date(d);
  const diff = Math.floor((dt - ARC_START) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(diff, TOTAL_DAYS));
}

function getPhase(dayNum) {
  if (dayNum <= 31) return { num: 1, name: 'Foundation', chapter: 'Act I: The Frostbite Ignition', color: 'phase-1' };
  if (dayNum <= 61) return { num: 2, name: 'Build', chapter: 'Act II: The Glacial Crucible', color: 'phase-2' };
  return { num: 3, name: 'Transform', chapter: 'Act III: The Aurora Ascension', color: 'phase-3' };
}

function getDayOfWeek(d) {
  const dt = d instanceof Date ? d : new Date(d);
  return dt.getDay(); // 0=Sun ... 6=Sat
}

function getTodaySchedule() {
  const dow = getDayOfWeek(today());
  const scheduleIndex = dow === 0 ? 6 : dow - 1;
  return WEEKLY_SCHEDULE[scheduleIndex];
}

function getStepTarget(dayNum) {
  if (dayNum <= 7) return 5000;
  if (dayNum <= 14) return 6000;
  if (dayNum <= 21) return 7000;
  if (dayNum <= 31) return 8000;
  if (dayNum <= 38) return 8000;
  if (dayNum <= 45) return 9000;
  return 10000;
}

function getSetsCount(dayNum) {
  if (dayNum <= 31) return 2;
  if (dayNum <= 61) return 2;
  return 3;
}

function getDayData(d) {
  const key = dateKey(d || today());
  if (!APP_DATA.days[key]) {
    APP_DATA.days[key] = {
      checklist: {},
      exercises: {},
      sets: {},
      selectedChoice: '',
      steps: 0,
      energy: 0,
      mood: 0,
      win: '',
    };
  }
  if (!APP_DATA.days[key].sets) APP_DATA.days[key].sets = {};
  return APP_DATA.days[key];
}

function computeStats() {
  let totalDaysCompleted = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let maxSteps = 0;
  let totalSteps = 0;
  let totalWorkouts = 0;
  let perfectWeeks = 0;
  let comebacks = 0;
  let prevCompleted = false;

  const d = new Date(ARC_START);
  const now = today();

  while (d <= now && d <= ARC_END) {
    const key = dateKey(d);
    const dd = APP_DATA.days[key];
    const isCompleted = dd && (
      Object.values(dd.checklist || {}).filter(Boolean).length >= 3 ||
      Object.values(dd.exercises || {}).filter(Boolean).length >= 2
    );

    if (isCompleted) {
      totalDaysCompleted++;
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
      if (!prevCompleted && totalDaysCompleted > 1) comebacks++;
      prevCompleted = true;
    } else {
      if (d < now) currentStreak = 0;
      prevCompleted = false;
    }

    if (dd) {
      if (dd.steps > maxSteps) maxSteps = dd.steps;
      totalSteps += dd.steps || 0;
      if (Object.values(dd.exercises || {}).filter(Boolean).length >= 2) {
        totalWorkouts++;
      }
    }
    d.setDate(d.getDate() + 1);
  }

  return {
    totalDaysCompleted,
    currentStreak,
    maxStreak,
    maxSteps,
    totalSteps,
    totalWorkouts,
    perfectWeeks: Math.floor(totalDaysCompleted / 7),
    comebacks,
  };
}

function getQuoteOfTheDay() {
  const dayNum = getDayNumber(today());
  return QUOTES[(dayNum - 1) % QUOTES.length];
}

function getWeekDays() {
  const now = today();
  const dow = now.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = dateKey(d);
    const dd = APP_DATA.days[key];
    const isCompleted = dd && Object.values(dd.checklist || {}).filter(Boolean).length >= 3;
    const isToday = dateKey(d) === dateKey(now);
    days.push({
      date: d,
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      num: d.getDate(),
      isToday,
      isCompleted,
    });
  }
  return days;
}

function showConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  const colors = ['#38bdf8', '#60a5fa', '#34d399', '#fbbf24', '#a855f7'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (1.5 + Math.random()) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 3000);
}

function showToast(text, emoji = '✅') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${emoji}</span> ${text}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('visible'));
  });
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ─── Winter Arc Themed SVGs ─────────────────────────────────────
const SVG = {
  check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
  chevronUp: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>',
  info: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  
  // Bespoke Winter Arc Nav Icons
  home: '<svg viewBox="0 0 24 24"><path d="M12 2L2 9.5l2 1.5 8-6 8 6 2-1.5L12 2zM4 11v9.5a1.5 1.5 0 001.5 1.5h13a1.5 1.5 0 001.5-1.5V11l-8-6-8 6zm8 3a2 2 0 110 4 2 2 0 010-4z"/></svg>',
  workout: '<svg viewBox="0 0 24 24"><path d="M4 7v10M20 7v10M2 9v6M22 9v6M6 11h12M7 5h2v14H7zM15 5h2v14h-2z"/></svg>',
  odyssey: '<svg viewBox="0 0 24 24"><path d="M3 20l5-9 4 5 5-11 4 15H3zM12 2l1.5 3 3 1.5-3 1.5L12 11l-1.5-3-3-1.5 3-1.5L12 2z"/></svg>',
  learn: '<svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20M12 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/></svg>',
  profile: '<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.5C4 16.5 7.5 21 12 22c4.5-1 8-5.5 8-10.5V5l-8-3zm0 5a3 3 0 110 6 3 3 0 010-6zm0 8c2.5 0 5 1.2 5 2.5a6.5 6.5 0 01-10 0c0-1.3 2.5-2.5 5-2.5z"/></svg>',
  
  flame: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2c.5 3-2 5-2 8 0 2.2 1.8 4 4 4 1.5 0 2.8-.8 3.5-2 .5 1.2.5 2.6 0 3.8C16.3 18.5 13.9 20 11 20c-4.4 0-8-3.6-8-8 0-4.5 3.5-8 8-10h1z"/></svg>',
  timer: '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4M12 2v3"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

// ─── Rest Timer Controller ─────────────────────────────────────
let restTimerInterval = null;
let restTimeRemaining = 60;
let restTotalDuration = 60;

function startRestTimer(seconds) {
  clearInterval(restTimerInterval);
  restTotalDuration = seconds;
  restTimeRemaining = seconds;
  updateRestTimerUI();
  playSound('ping');

  // Highlight active preset
  document.querySelectorAll('.btn-rest-preset').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.seconds) === seconds);
  });

  restTimerInterval = setInterval(() => {
    restTimeRemaining--;
    updateRestTimerUI();
    if (restTimeRemaining <= 0) {
      clearInterval(restTimerInterval);
      restTimerInterval = null;
      playSound('timer');
      showToast('Rest completed! Begin your next set! ⚡', '⏱️');
    }
  }, 1000);
}

function updateRestTimerUI() {
  const timeEl = document.getElementById('rest-timer-time');
  const ringEl = document.getElementById('rest-timer-circle');
  if (!timeEl || !ringEl) return;
  const mins = Math.floor(restTimeRemaining / 60);
  const secs = restTimeRemaining % 60;
  timeEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (restTimeRemaining / restTotalDuration) * circumference;
  ringEl.style.strokeDasharray = `${circumference}`;
  ringEl.style.strokeDashoffset = `${offset}`;
}

// ═══════════════════════════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════════════════════════

function renderStoryHUD(xpData, phase, dayNum) {
  return `
    <div class="story-hud">
      <div class="story-hud-top">
        <div class="player-rank-badge">
          <span class="player-rank-icon">${xpData.icon}</span>
          <span class="player-rank-text">LVL ${xpData.level} · ${xpData.title}</span>
        </div>
        <div class="player-xp-counter">
          ${xpData.progressXP.toLocaleString()} / ${xpData.requiredXP.toLocaleString()} XP
        </div>
      </div>
      <div class="story-xp-bar">
        <div class="story-xp-fill" style="width: ${xpData.pct}%"></div>
      </div>
      <div class="story-chapter-title">
        <span>${phase.chapter}</span>
        <span>Day ${dayNum} of 92</span>
      </div>
    </div>
  `;
}

function isDurationSession(ex) {
  const continuousList = ['Running / Jogging', 'Power Yoga', 'Mat Pilates', 'Mobility Flow', 'Easy Walking', 'Meal Preparation'];
  if (continuousList.includes(ex.name)) return true;
  if (typeof ex.reps === 'string' && ex.reps.includes('min') && !ex.reps.includes('sec')) return true;
  return false;
}

function renderExerciseRowsHTML(exercises, dayData, dayNum) {
  const setsTarget = getSetsCount(dayNum);
  return exercises.map(ex => {
    const isChecked = dayData.exercises && dayData.exercises[ex.name];
    const tut = EXERCISE_TUTORIALS[ex.name] || {};
    const isDuration = isDurationSession(ex);
    
    return `
      <div class="exercise-item" id="exercise-row-${ex.name.replace(/[\s\/]/g, '_')}" data-exercise="${ex.name}">
        <div style="display:flex;align-items:flex-start;gap:var(--space-md)">
          <div class="exercise-check ${isChecked ? 'checked' : ''}" data-exercise-check="${ex.name}">
            ${SVG.check}
          </div>
          <div class="exercise-info">
            <div class="exercise-name ${isChecked ? 'completed' : ''}">${ex.name}</div>
            <div class="exercise-reps">${ex.reps} · <span style="color:var(--accent)">${ex.muscle}</span></div>
            
            <!-- Interactive Tracker: Session vs Sets -->
            <div class="set-tracker">
              ${isDuration ? `
                <span style="font-size:10px;color:var(--text-muted);font-weight:600">SESSION:</span>
                <div class="session-pill ${isChecked ? 'done' : ''}" data-session-toggle="${ex.name}">
                  ⏱️ ${ex.reps} Complete Session ${isChecked ? '✓' : ''}
                </div>
              ` : `
                <span style="font-size:10px;color:var(--text-muted);font-weight:600">SETS:</span>
                ${Array.from({ length: setsTarget }, (_, s) => {
                  const setKey = `${ex.name}_set_${s + 1}`;
                  const setDone = dayData.sets && dayData.sets[setKey];
                  return `
                    <div class="set-pill ${setDone ? 'done' : ''}" data-set-toggle="${setKey}" data-exercise-parent="${ex.name}">
                      Set ${s + 1} ${setDone ? '✓' : ''}
                    </div>
                  `;
                }).join('')}
              `}
            </div>

            <!-- Expand Visual Guide Button -->
            <button class="exercise-expand-btn" data-expand-visual="${ex.name}">
              <span>Form Guide & Visual</span>
              <span class="chevron-icon">${SVG.chevronDown}</span>
            </button>
          </div>
        </div>

        <!-- Inline Expandable Biomechanical Form Guide -->
        <div class="exercise-visual-drawer">
          ${EXERCISE_VISUALS[ex.name] ? `
            <div class="exercise-diagram-container">
              ${EXERCISE_VISUALS[ex.name]}
            </div>
          ` : ''}

          <!-- Key Cues (Do & Don't) -->
          <div class="form-cue-grid">
            <div class="form-cue-card cue-do">
              <h5 style="color:var(--success)">✓ FORM CUE</h5>
              <p>${tut.cueDo || 'Maintain clean controlled tempo with full range of motion.'}</p>
            </div>
            <div class="form-cue-card cue-dont">
              <h5 style="color:var(--danger)">✕ COMMON ERROR</h5>
              <p>${tut.cueDont || 'Avoid using momentum or cutting depth short.'}</p>
            </div>
          </div>

          ${tut.tip ? `
            <div class="tutorial-tip" style="margin-top:8px">
              💡 <strong>Pro Tip:</strong> ${tut.tip}
            </div>
          ` : ''}

          <div style="display:flex;justify-content:space-between;margin-top:10px">
            <a href="https://www.youtube.com/results?search_query=how+to+do+${ex.name.replace(/ /g, '+')}+perfect+form" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="color: #60a5fa; border-color: rgba(96, 165, 250, 0.4);">
              ▶️ Watch YouTube Guide
            </a>
            <button class="btn btn-secondary btn-sm" data-quick-rest="60">
              ⏱️ Start 60s Rest
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderApp() {
  const app = document.getElementById('app');

  let activePageId = 'home';
  const currentActivePage = document.querySelector('.page.active');
  if (currentActivePage) {
    activePageId = currentActivePage.id.replace('page-', '');
  }
  const currentScroll = window.scrollY;

  if (!APP_DATA.onboardingComplete) {
    renderOnboarding(app);
    return;
  }

  const dayNum = getDayNumber(today());
  const phase = getPhase(dayNum);
  const stats = computeStats();
  const quote = getQuoteOfTheDay();
  const schedule = getTodaySchedule();
  const dayData = getDayData();
  const stepTarget = getStepTarget(dayNum);
  const weekDays = getWeekDays();
  const totalXP = calculateTotalXP(APP_DATA);
  const xpData = getPlayerLevel(totalXP);

  // Active exercises for today based on choice (if choice day)
  let activeExercises = schedule.exercises || [];
  if (schedule.isChoiceDay) {
    const selectedChoiceId = dayData.selectedChoice || schedule.choices[0].id;
    const choiceObj = schedule.choices.find(c => c.id === selectedChoiceId) || schedule.choices[0];
    activeExercises = [...choiceObj.exercises];
    if (schedule.fixedExercises) {
      activeExercises = [...activeExercises, ...schedule.fixedExercises];
    }
  }

  const completedExercisesCount = activeExercises.filter(ex => dayData.exercises[ex.name]).length;
  const sessionCompletionPct = Math.round((completedExercisesCount / Math.max(1, activeExercises.length)) * 100);

  app.innerHTML = `
    <!-- ═══ Main Content ═══ -->
    <div class="main-content">

      <!-- ═══ HOME PAGE (Story Mode Dashboard) ═══ -->
      <div class="page ${activePageId === 'home' ? 'active' : ''}" id="page-home">
        <div class="page-header">
          <div>
            <div class="greeting-small">${getGreeting()}, ${APP_DATA.userName || 'Warrior'}</div>
            <h1 class="page-title">My Winter Arc 2026</h1>
          </div>
          <div class="streak-badge ${stats.currentStreak >= 3 ? 'pulse' : ''}">
            <span class="fire">${SVG.flame}</span>
            <span>${stats.currentStreak}D</span>
          </div>
        </div>

        <!-- Story Mode HUD (XP & Rank) -->
        ${renderStoryHUD(xpData, phase, dayNum)}

        <!-- Week Calendar -->
        <div class="week-calendar">
          ${weekDays.map(d => `
            <div class="week-day ${d.isToday ? 'today' : ''} ${d.isCompleted ? 'completed' : ''}">
              <span class="week-day-name">${d.name}</span>
              <span class="week-day-num">${d.num}</span>
              <span class="week-day-dot"></span>
            </div>
          `).join('')}
        </div>

        <!-- Hero Day Card -->
        <div class="hero-card">
          <div class="hero-day-counter">
            <span class="hero-day-number">${dayNum}</span>
            <span class="hero-day-label">of ${TOTAL_DAYS} days</span>
          </div>
          <div class="hero-phase-tag ${phase.color}">
            Phase ${phase.num} — ${phase.name}
          </div>
          <div class="hero-quote">${quote.text}</div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${stats.totalDaysCompleted}</div>
            <div class="stat-label">Days Done</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">${stats.currentStreak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👟</div>
            <div class="stat-value">${formatSteps(dayData.steps || 0)}</div>
            <div class="stat-label">Steps Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value home-total-xp" id="home-total-xp">${totalXP.toLocaleString()}</div>
            <div class="stat-label">Total XP</div>
          </div>
        </div>

        <!-- Daily Quest Board (Story Mode Habit Tracking) -->
        <div class="quest-board">
          <div class="section-title">⚔️ Today's Arc Quests</div>
          ${DAILY_QUESTS.map(q => {
            const isDone = dayData.checklist[q.id];
            return `
              <div class="quest-card ${isDone ? 'completed' : ''}" data-quest="${q.id}" data-xp="${q.xp}">
                <div class="exercise-check ${isDone ? 'checked' : ''}">
                  ${SVG.check}
                </div>
                <div class="quest-info">
                  <div class="quest-title">${q.icon} ${q.title}</div>
                  <div class="quest-desc">${q.desc}</div>
                </div>
                <div class="quest-xp-pill">+${q.xp} XP</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Steps Tracker -->
        <div class="steps-card">
          <div class="steps-header">
            <div class="section-title">👟 Step Relics</div>
            <div class="steps-target">Target: ${stepTarget.toLocaleString()}</div>
          </div>
          <div class="steps-input-group">
            <input type="number" class="steps-input" id="steps-input" 
              value="${dayData.steps || ''}" 
              placeholder="0" 
              min="0" max="50000"
              inputmode="numeric" />
            <span style="color:var(--text-tertiary);font-size:13px">steps</span>
          </div>
          <div class="steps-progress-bar">
            <div class="steps-progress-fill" style="width: ${Math.min(100, ((dayData.steps || 0) / stepTarget) * 100)}%"></div>
          </div>
        </div>

        <!-- Energy & Mood Sliders -->
        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">⚡ Daily Energy</span>
            <span class="slider-value">${dayData.energy || '—'}/5</span>
          </div>
          <div class="emoji-slider" id="energy-slider">
            ${[1,2,3,4,5].map(v => `
              <div class="emoji-option ${dayData.energy === v ? 'selected' : ''}" data-energy="${v}">
                ${['😩','😔','😐','😊','🔥'][v-1]}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="slider-group">
          <div class="slider-header">
            <span class="slider-label">🧠 Mindset & Focus</span>
            <span class="slider-value">${dayData.mood || '—'}/5</span>
          </div>
          <div class="emoji-slider" id="mood-slider">
            ${[1,2,3,4,5].map(v => `
              <div class="emoji-option ${dayData.mood === v ? 'selected' : ''}" data-mood="${v}">
                ${['😢','😕','😌','😄','🤩'][v-1]}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Win of the Day -->
        <div class="input-group">
          <label class="input-label">🏆 Daily Victory Journal</label>
          <textarea class="win-textarea" id="win-input" placeholder="What victory did you claim today against comfort?">${dayData.win || ''}</textarea>
        </div>

        <!-- Motivational Footer (Directly Above Navbar) -->
        <div class="app-footer">
          <p class="footer-text">Winter Arc 2026 · Built with ❄️ by</p>
          <a href="https://ifeelkd.vercel.app/" target="_blank" rel="noopener" class="footer-link">@ifeelkd</a>
          <p class="footer-tagline">"Reduce the workout before you eliminate the habit."</p>
        </div>
      </div>


      <!-- ═══ WORKOUT PAGE (Samsung Health / WHOOP UX) ═══ -->
      <div class="page ${activePageId === 'workout' ? 'active' : ''}" id="page-workout">
        <div class="page-header">
          <div>
            <div class="greeting-small">Day ${dayNum} · ${schedule.day}</div>
            <h1 class="page-title">${schedule.session}</h1>
          </div>
          <span class="workout-session-badge">${schedule.type}</span>
        </div>

        <!-- WHOOP/Samsung Health Hero Banner -->
        <div class="workout-hero-banner">
          <div class="workout-hero-top">
            <div>
              <div style="font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Today's Session</div>
              <div style="font-family:var(--font-heading);font-size:20px;font-weight:800;color:var(--text-primary);line-height:1.2">${schedule.session}</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">${schedule.estTime || '~30 min'} &nbsp;·&nbsp; ${schedule.intensity || 'Moderate'}</div>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-mono);font-size:34px;font-weight:900;color:var(--accent);line-height:1">${completedExercisesCount}<span style="font-size:16px;color:var(--text-tertiary)">/${activeExercises.length}</span></div>
              <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">exercises done</div>
            </div>
          </div>
          <!-- Progress bar -->
          <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:9999px;margin-top:var(--space-md);overflow:hidden">
            <div style="height:100%;width:${sessionCompletionPct}%;background:var(--accent);border-radius:9999px;transition:width 0.5s cubic-bezier(0.16,1,0.3,1)"></div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:6px">
            <span style="font-size:11px;color:var(--text-tertiary)">${sessionCompletionPct === 100 ? '✅ Session Complete!' : sessionCompletionPct > 0 ? 'Keep going!' : 'Start your session'}</span>
            <span style="font-size:11px;color:var(--accent);font-weight:700">${sessionCompletionPct}%</span>
          </div>
        </div>

        <!-- Live Interactive Rest Timer Widget -->
        <div class="rest-timer-widget">
          <div class="rest-timer-display">
            <div class="rest-timer-ring-wrap">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
                <circle id="rest-timer-circle" cx="22" cy="22" r="18" fill="none" stroke="var(--accent)" stroke-width="3" 
                  stroke-linecap="round" stroke-dasharray="113.1" stroke-dashoffset="0"/>
              </svg>
              <div class="rest-timer-time" id="rest-timer-time">1:00</div>
            </div>
            <div>
              <div class="rest-timer-label">Active Rest Timer</div>
              <div class="rest-timer-sub">Recover between sets</div>
            </div>
          </div>
          <div class="rest-timer-presets">
            <button class="btn-rest-preset" data-seconds="30">30s</button>
            <button class="btn-rest-preset" data-seconds="45">45s</button>
            <button class="btn-rest-preset active" data-seconds="60">60s</button>
            <button class="btn-rest-preset" data-seconds="90">90s</button>
          </div>
        </div>

        <!-- Choice Protocol Switcher (For Tuesday & Thursday Options) -->
        ${schedule.isChoiceDay ? `
          <div class="choice-section-header">
            <h3>⚡ Select Your Discipline Today</h3>
            <p style="font-size:12px;color:var(--text-tertiary)">Pick one protocol. The others will automatically grey out.</p>
          </div>
          <div class="choice-cards-grid">
            ${schedule.choices.map(choice => {
              const isSelected = (dayData.selectedChoice || schedule.choices[0].id) === choice.id;
              return `
                <div class="choice-card ${isSelected ? 'selected' : 'greyed-out'}" data-choice-id="${choice.id}">
                  <div class="choice-card-left">
                    <div class="choice-card-icon">${choice.icon}</div>
                    <div class="choice-card-text">
                      <div class="choice-card-title">${choice.name}</div>
                      <div class="choice-card-desc">${choice.desc}</div>
                    </div>
                  </div>
                  <div class="choice-card-action">
                    ${isSelected ? `
                      <span class="choice-badge-selected">Active ✓</span>
                    ` : `
                      <button class="choice-btn-switch">Switch</button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Interactive Workout Checklist with Inline Visual Guides -->
        <div class="section-title">📋 Today's Movement Checklist</div>
        <div class="workout-exercises">
          ${renderExerciseRowsHTML(activeExercises, dayData, dayNum)}
        </div>

        <!-- Bad Day Minimum Protocol Card -->
        <div class="progress-card" style="margin-top:var(--space-xl)">
          <div class="section-title">🛡️ Bad Day Protocol</div>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:var(--space-md)">
            Low on energy or time? <strong>Do not eliminate the habit.</strong> Do just 2 sets of 5 reps per movement or 10 min easy movement. The win is keeping the chain alive.
          </p>
          <div class="tutorial-tip">
            "A 10-minute workout beats an hour of wishing you worked out."
          </div>
        </div>

        <!-- Footer -->
        <div class="app-footer">
          <p class="footer-text">Built with ❄️ by</p>
          <a href="https://ifeelkd.vercel.app/" target="_blank" rel="noopener" class="footer-link">@ifeelkd</a>
          <p class="footer-tagline">Winter Arc 2026 · Clean Execution</p>
        </div>
      </div>


      <!-- ═══ ODYSSEY / PROGRESS PAGE (Story Mode Ascent) ═══ -->
      <div class="page ${activePageId === 'progress' ? 'active' : ''}" id="page-progress">
        <div class="page-header">
          <div>
            <div class="greeting-small">Story Odyssey</div>
            <h1 class="page-title">The 92-Day Ascent</h1>
          </div>
          <div class="player-rank-badge">
            <span>${xpData.icon}</span>
            <span>LVL ${xpData.level}</span>
          </div>
        </div>

        <!-- Story Mode HUD -->
        ${renderStoryHUD(xpData, phase, dayNum)}

        <!-- Circular Arc Ring -->
        <div class="progress-hero">
          <div class="progress-ring-container">
            <svg class="progress-ring" viewBox="0 0 160 160">
              <circle class="progress-ring-bg" cx="80" cy="80" r="70" />
              <circle class="progress-ring-circle" cx="80" cy="80" r="70" 
                style="stroke-dasharray: 440; stroke-dashoffset: ${440 - (440 * (stats.totalDaysCompleted / TOTAL_DAYS))}" />
            </svg>
            <div class="progress-ring-text">
              <span class="progress-ring-num">${Math.round((stats.totalDaysCompleted / TOTAL_DAYS) * 100)}%</span>
              <span class="progress-ring-label">${stats.totalDaysCompleted} / ${TOTAL_DAYS} Days</span>
            </div>
          </div>
          <div class="progress-subtext">
            <strong>${TOTAL_DAYS - dayNum} days remaining</strong> until the Winter Arc concludes on Dec 31.
          </div>
        </div>

        <!-- Mountain Ascent Map (RPG Journey) -->
        <div class="mountain-map-card">
          <div class="section-title">🏔️ Mountain of Discipline</div>
          <div class="mountain-path">
            <div class="mountain-node ${dayNum >= 1 && dayNum <= 31 ? 'active' : (dayNum > 31 ? 'completed' : '')}">
              <div class="mountain-node-dot"></div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:14px;color:var(--phase-1)">
                Act I: The Foothills of Iron (Days 1–31)
              </div>
              <p style="font-size:12px;color:var(--text-secondary);margin-top:2px">
                Learn movement mechanics, build 5K–8K daily step base, lock in circadian sleep.
              </p>
            </div>

            <div class="mountain-node ${dayNum >= 32 && dayNum <= 61 ? 'active' : (dayNum > 61 ? 'completed' : '')}">
              <div class="mountain-node-dot"></div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:14px;color:var(--phase-2)">
                Act II: The Blizzard Ridge (Days 32–61)
              </div>
              <p style="font-size:12px;color:var(--text-secondary);margin-top:2px">
                Load resistance into backpack, scale up to 10K daily steps, conquer the mid-arc wall.
              </p>
            </div>

            <div class="mountain-node ${dayNum >= 62 ? 'active' : ''}">
              <div class="mountain-node-dot"></div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:14px;color:var(--phase-3)">
                Act III: The Summit of Transcendence (Days 62–92)
              </div>
              <p style="font-size:12px;color:var(--text-secondary);margin-top:2px">
                2–3 sets, deeper variations, maximum conditioning. Step into 2027 transformed.
              </p>
            </div>
          </div>
        </div>

        <!-- Heatmap Calendar -->
        <div class="progress-card">
          <div class="section-title">🗓️ 92-Day Consistency Grid</div>
          <div class="heatmap-grid" id="heatmap-grid">
            ${renderHeatmap()}
          </div>
        </div>

        <!-- Badges & Relics -->
        <div class="progress-card">
          <div class="section-title">🏆 Unlocked Badges & Relics</div>
          ${BADGES.map(badge => {
            const unlocked = badge.check(stats);
            return `
              <div class="badge-card">
                <div class="badge-icon ${unlocked ? '' : 'locked'}">
                  ${badge.icon}
                </div>
                <div class="badge-info">
                  <h4>${badge.name} ${unlocked ? '✓' : ''}</h4>
                  <p>${badge.desc}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Footer -->
        <div class="app-footer">
          <p class="footer-text">Built with ❄️ by</p>
          <a href="https://ifeelkd.vercel.app/" target="_blank" rel="noopener" class="footer-link">@ifeelkd</a>
          <p class="footer-tagline">Winter Arc 2026 · Odyssey of Self-Mastery</p>
        </div>
      </div>


      <!-- ═══ LEARN PAGE (Visual Library) ═══ -->
      <div class="page ${activePageId === 'learn' ? 'active' : ''}" id="page-learn">
        <div class="page-header">
          <div>
            <div class="greeting-small">Biomechanical Codex</div>
            <h1 class="page-title">Exercise Library</h1>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="filter-chips" id="exercise-filters">
          <div class="chip active" data-filter="all">All Exercises</div>
          <div class="chip" data-filter="push">Push</div>
          <div class="chip" data-filter="pull">Pull</div>
          <div class="chip" data-filter="legs">Legs</div>
          <div class="chip" data-filter="core">Core</div>
          <div class="chip" data-filter="cardio">Cardio & Mobility</div>
        </div>

        <!-- Exercise Cards with Integrated Visual Diagrams -->
        <div id="exercise-library">
          ${renderExerciseLibrary('all')}
        </div>

        <!-- Non-Negotiable Pillars -->
        <div class="progress-card" style="margin-top:var(--space-xl)">
          <div class="section-title">📚 The Winter Arc Pillars</div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.7">
            <p style="margin-bottom:var(--space-md)"><strong>1. Progressive Overload:</strong> Increase reps first, then add backpack weight. Don't rush.</p>
            <p style="margin-bottom:var(--space-md)"><strong>2. The 10K Step Rule:</strong> Build from 5K → 8K → 10K. Walking is your metabolic furnace.</p>
            <p style="margin-bottom:var(--space-md)"><strong>3. Sleep Sanctuary:</strong> Cold dark room, 7–9 hours. Without recovery, training is just breakdown.</p>
            <p><strong>4. Deep Work:</strong> 60 minutes daily of focused, distraction-free work. Build your mind as you build your body.</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="app-footer">
          <p class="footer-text">Built with ❄️ by</p>
          <a href="https://ifeelkd.vercel.app/" target="_blank" rel="noopener" class="footer-link">@ifeelkd</a>
          <p class="footer-tagline">Winter Arc 2026 · Visual Learning Codex</p>
        </div>
      </div>


      <!-- ═══ PROFILE PAGE ═══ -->
      <div class="page ${activePageId === 'profile' ? 'active' : ''}" id="page-profile">
        <div class="page-header">
          <h1 class="page-title">Warrior Profile</h1>
        </div>

        <!-- User Card -->
        <div class="profile-card">
          <div class="profile-avatar">
            ${APP_DATA.userAvatar ? 
              (APP_DATA.userAvatar.startsWith('data:') ? `<img src="${APP_DATA.userAvatar}" />` : APP_DATA.userAvatar) 
              : xpData.icon}
          </div>
          <div class="profile-info">
            <input class="profile-name-input" type="text" id="name-input" 
              value="${APP_DATA.userName || 'Warrior'}" placeholder="Enter your name" />
            <div class="profile-email">Level ${xpData.level} ${xpData.title} · ${totalXP} XP</div>
          </div>
        </div>

        <div class="section-title">Spirit Avatar</div>
        <div class="avatar-grid">
          ${['🐼', '🦅', '🦁', '🐺', '🐻', '🦍', '🥷', '🐉'].map(a => `
            <div class="avatar-option ${APP_DATA.userAvatar === a ? 'active' : ''}" data-avatar="${a}">${a}</div>
          `).join('')}
          <div class="avatar-option upload" id="upload-avatar-btn">
            <span>📷</span>
            <span>Upload</span>
          </div>
          <input type="file" id="avatar-upload" accept="image/*" style="display:none;" />
        </div>

        <!-- Settings List -->
        <div class="section-title" style="margin-top:var(--space-xl)">⚙️ System & Data</div>
        <div class="settings-list">
          <div class="settings-item" id="reset-onboarding">
            <span class="settings-icon">🔄</span>
            <div class="settings-info">
              <h4>Replay Onboarding</h4>
              <p>View the intro walkthrough again</p>
            </div>
          </div>

          <div class="settings-item" id="export-data">
            <span class="settings-icon">📦</span>
            <div class="settings-info">
              <h4>Export Progress Data</h4>
              <p>Download your journey as a JSON file</p>
            </div>
          </div>

          <div class="settings-item" id="clear-data">
            <span class="settings-icon">🗑️</span>
            <div class="settings-info">
              <h4>Reset All Data</h4>
              <p>Clear all progress (this cannot be undone)</p>
            </div>
          </div>

          ${CURRENT_USER ? `
          <div class="settings-item" id="btn-signout">
            <span class="settings-icon">🚪</span>
            <div class="settings-info">
              <h4>Sign Out</h4>
              <p>Signed in as ${CURRENT_USER.email} · Cloud sync active ☁️</p>
            </div>
          </div>
          ` : `
          <div class="settings-item" id="btn-show-auth">
            <span class="settings-icon">☁️</span>
            <div class="settings-info">
              <h4>Sign In / Create Account</h4>
              <p>Sync your progress to the cloud</p>
            </div>
          </div>
          `}
        </div>

        <!-- Monthly Checkpoints -->
        <div class="progress-card" style="margin-top:var(--space-xl)">
          <div class="section-title">📋 Monthly Milestones</div>
          ${renderMonthlyCheckpoints(dayNum)}
        </div>

        <!-- Footer -->
        <div class="app-footer">
          <p class="footer-text">Built with ❄️ by</p>
          <a href="https://ifeelkd.vercel.app/" target="_blank" rel="noopener" class="footer-link">@ifeelkd</a>
          <p class="footer-tagline">Winter Arc 2026 · Oct 1 → Dec 31</p>
        </div>
      </div>

    </div>

    <!-- ═══ Bottom Navigation (Apple iOS Glassmorphism Capsule) ═══ -->
    <nav class="nav-bottom">
      <div class="nav-indicator"></div>
      <button class="nav-item ${activePageId === 'home' ? 'active' : ''}" data-page="home">
        ${SVG.home}
        <span>Sanctuary</span>
      </button>
      <button class="nav-item ${activePageId === 'workout' ? 'active' : ''}" data-page="workout">
        ${SVG.workout}
        <span>Workout</span>
      </button>
      <button class="nav-item ${activePageId === 'progress' ? 'active' : ''}" data-page="progress">
        ${SVG.odyssey}
        <span>Odyssey</span>
      </button>
      <button class="nav-item ${activePageId === 'learn' ? 'active' : ''}" data-page="learn">
        ${SVG.learn}
        <span>Codex</span>
      </button>
      <button class="nav-item ${activePageId === 'profile' ? 'active' : ''}" data-page="profile">
        ${SVG.profile}
        <span>Profile</span>
      </button>
    </nav>

    <!-- ═══ Auth Modal (Supabase Cloud Sync) ═══ -->
    <div class="auth-modal-overlay" id="auth-modal" style="display:none">
      <div class="auth-modal-card">
        <button class="auth-modal-close" id="auth-btn-close" aria-label="Close">✕</button>
        
        <div class="auth-badge">❄️ CLOUD VAULT</div>
        <h2 class="auth-title">My Winter Arc 2026</h2>
        <p class="auth-subtitle">Sync your 92-day transformation across all devices.</p>

        <div class="auth-tabs">
          <button class="auth-tab active" id="auth-tab-signin">Sign In</button>
          <button class="auth-tab" id="auth-tab-signup">New Arc</button>
        </div>

        <div id="auth-error" class="auth-error-msg" style="display:none"></div>

        <!-- Sign In Form -->
        <div id="auth-panel-signin" class="auth-form-panel">
          <div class="auth-input-group">
            <label class="auth-label">Email Address</label>
            <input type="email" id="auth-email" class="auth-input" placeholder="warrior@winterarc.io" autocomplete="email" />
          </div>
          <div class="auth-input-group">
            <label class="auth-label">Password</label>
            <input type="password" id="auth-password" class="auth-input" placeholder="••••••••" autocomplete="current-password" />
          </div>
          <button class="btn btn-primary auth-btn-submit" id="auth-btn-signin">
            <span>Enter The Arc</span>
            <span>→</span>
          </button>
        </div>

        <!-- Sign Up Form -->
        <div id="auth-panel-signup" class="auth-form-panel" style="display:none">
          <div class="auth-input-group">
            <label class="auth-label">Warrior Name</label>
            <input type="text" id="auth-name" class="auth-input" placeholder="Ghost / Shadow / Titan" autocomplete="name" />
          </div>
          <div class="auth-input-group">
            <label class="auth-label">Email Address</label>
            <input type="email" id="auth-email-2" class="auth-input" placeholder="warrior@winterarc.io" autocomplete="email" />
          </div>
          <div class="auth-input-group">
            <label class="auth-label">Set Password</label>
            <input type="password" id="auth-password-2" class="auth-input" placeholder="Min 6 characters" autocomplete="new-password" />
          </div>
          <button class="btn btn-primary auth-btn-submit" id="auth-btn-signup">
            <span>Begin My Journey</span>
            <span>⚡</span>
          </button>
        </div>

        <div class="auth-footer-actions">
          <button class="auth-btn-guest" id="auth-btn-guest">Continue offline as Guest (Local only)</button>
        </div>
      </div>
    </div>
  `;

  attachEventListeners();
  if (typeof updateNavIndicator === 'function') updateNavIndicator();
  if (currentScroll > 0) {
    window.scrollTo(0, currentScroll);
  }
}


// ─── Helper Renderers ──────────────────────────────────────────

function renderHeatmap() {
  let html = '';
  const d = new Date(ARC_START);
  const todayDate = today();

  while (d <= ARC_END) {
    const key = dateKey(d);
    const dd = APP_DATA.days[key];
    const isFuture = d > todayDate;

    if (isFuture) {
      html += `<div class="heatmap-cell future" title="${key}"></div>`;
    } else if (dd) {
      const checkCount = Object.values(dd.checklist || {}).filter(Boolean).length;
      const exerciseCount = Object.values(dd.exercises || {}).filter(Boolean).length;
      const score = checkCount + exerciseCount;
      let level = '';
      if (score >= 8) level = 'level-4';
      else if (score >= 5) level = 'level-3';
      else if (score >= 3) level = 'level-2';
      else if (score >= 1) level = 'level-1';
      html += `<div class="heatmap-cell ${level}" title="${key}: ${score} completions"></div>`;
    } else {
      html += `<div class="heatmap-cell" title="${key}"></div>`;
    }
    d.setDate(d.getDate() + 1);
  }
  return html;
}

function renderExerciseLibrary(filter) {
  const tutorials = Object.entries(EXERCISE_TUTORIALS);
  const filtered = filter === 'all' ? tutorials : tutorials.filter(([, t]) => t.category === filter);

  return filtered.map(([name, tut]) => `
    <div class="exercise-library-card" data-library="${name}">
      <div class="exercise-library-header">
        <div class="exercise-library-icon ${tut.category}">${tut.icon}</div>
        <div class="exercise-library-info">
          <div class="exercise-library-name">${name}</div>
          <div class="exercise-library-muscle">${tut.muscles} · ${tut.difficulty}</div>
        </div>
        <span class="exercise-library-chevron">${SVG.chevronDown}</span>
      </div>
      <div class="exercise-library-body">
        <div class="exercise-library-content">
          ${EXERCISE_VISUALS[name] ? `
            <div class="exercise-diagram-container">
              ${EXERCISE_VISUALS[name]}
            </div>
          ` : ''}

          <div class="form-cue-grid">
            <div class="form-cue-card cue-do">
              <h5 style="color:var(--success)">✓ FORM CUE</h5>
              <p>${tut.cueDo || 'Maintain clean form through full range.'}</p>
            </div>
            <div class="form-cue-card cue-dont">
              <h5 style="color:var(--danger)">✕ COMMON ERROR</h5>
              <p>${tut.cueDont || 'Avoid swinging or truncating range.'}</p>
            </div>
          </div>

          <h4 style="margin-top:12px">How to Perform</h4>
          <ol>
            ${tut.steps.map(s => `<li><strong>${s.title}:</strong> ${s.desc}</li>`).join('')}
          </ol>
          ${tut.tip ? `
            <h4 style="margin-top:10px">Pro Tip</h4>
            <p>${tut.tip}</p>
          ` : ''}

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
            <a href="https://www.youtube.com/results?search_query=how+to+do+${name.replace(/ /g, '+')}+perfect+form" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="color: #60a5fa; border-color: rgba(96, 165, 250, 0.4); display: inline-flex; align-items: center; gap: 6px;">
              ▶️ Watch YouTube Tutorial Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderMonthlyCheckpoints(dayNum) {
  if (dayNum <= 31) {
    return `
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-md)"><strong style="color:var(--accent)">October 31 — Foundation Check</strong></p>
      <div class="progress-metric"><span class="progress-metric-label">Am I exercising consistently without skipping?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Are 8,000 daily steps becoming second nature?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Is my push-up and squat depth clean?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Am I protecting 7–9 hours of sleep?</span></div>
    `;
  }
  if (dayNum <= 61) {
    return `
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-md)"><strong style="color:var(--phase-2)">November 30 — Build Check</strong></p>
      <div class="progress-metric"><span class="progress-metric-label">Did I reach a 10K step daily average?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Am I noticeably stronger than October?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Has my loaded backpack weight increased?</span></div>
      <div class="progress-metric"><span class="progress-metric-label">Can I sustain 60 min deep focus daily?</span></div>
    `;
  }
  return `
    <p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-md)"><strong style="color:var(--phase-3)">December 31 — Transformation Check</strong></p>
    <div class="progress-metric"><span class="progress-metric-label">Compare max push-ups: start → now</span></div>
    <div class="progress-metric"><span class="progress-metric-label">Compare max plank hold: start → now</span></div>
    <div class="progress-metric"><span class="progress-metric-label">Compare average steps: start → now</span></div>
    <div class="progress-metric"><span class="progress-metric-label">Evaluate transformed habits & identity</span></div>
  `;
}

function getGreeting() {
  const h = today().getHours();
  if (h < 5) return 'Night Owl';
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  if (h < 21) return 'Good Evening';
  return 'Good Night';
}

function formatSteps(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n.toString();
}


// ─── Onboarding (Clean Responsive Layout) ──────────────────────

function renderOnboarding(app) {
  app.innerHTML = `
    <div class="onboarding-overlay" id="onboarding">
      <div class="onboarding-content">
        <!-- Slide 1: Welcome -->
        <div class="onboarding-slide active" data-slide="0">
          <div class="onboarding-snowflake">❄️</div>
          <h1 class="onboarding-title">My Winter Arc 2026</h1>
          <p class="onboarding-subtitle">
            92 days of cold discipline, home training, and habit ascension. 
            No gym required — just your body, a backpack, and consistency.
          </p>
          <div class="onboarding-features">
            <div class="onboarding-feature">
              <div class="onboarding-feature-icon">💪</div>
              <h4>Home Workouts</h4>
              <p>4 strength + 2 cardio</p>
            </div>
            <div class="onboarding-feature">
              <div class="onboarding-feature-icon">👟</div>
              <h4>Step Relics</h4>
              <p>5K → 10K progression</p>
            </div>
            <div class="onboarding-feature">
              <div class="onboarding-feature-icon">📚</div>
              <h4>Mind Mastery</h4>
              <p>60m focused work daily</p>
            </div>
            <div class="onboarding-feature">
              <div class="onboarding-feature-icon">😴</div>
              <h4>Recovery</h4>
              <p>7–9h sleep sanctuary</p>
            </div>
          </div>
          <button class="btn btn-primary btn-full" id="onboarding-next-0">Begin Odyssey →</button>
        </div>

        <!-- Slide 2: The Philosophy -->
        <div class="onboarding-slide" data-slide="1">
          <div class="onboarding-card">
            <div class="onboarding-card-icon">🎯</div>
            <div class="onboarding-card-body">
              <h3>Consistency Over Perfection</h3>
              <p>Your only job on any given day: do today's work. Reduce the workout before eliminating the habit.</p>
            </div>
          </div>
          <div class="onboarding-card">
            <div class="onboarding-card-icon">🛡️</div>
            <div class="onboarding-card-body">
              <h3>Zero Guilt. Zero Shame.</h3>
              <p>Even completing 60 of 92 days is life-changing. The goal isn't a fragile streak — it's an elevated baseline.</p>
            </div>
          </div>
          <div class="onboarding-card">
            <div class="onboarding-card-icon">📈</div>
            <div class="onboarding-card-body">
              <h3>3 Acts of Transformation</h3>
              <p><strong>Oct:</strong> Foundation & technique.<br/>
                 <strong>Nov:</strong> Build volume & load backpack.<br/>
                 <strong>Dec:</strong> Ascension & peak strength.</p>
            </div>
          </div>
          <button class="btn btn-primary btn-full" id="onboarding-next-1">I Am Ready →</button>
          <button class="btn btn-ghost btn-full" id="onboarding-back-1" style="margin-top:var(--space-xs)">← Back</button>
        </div>

        <!-- Slide 3: Name + Start -->
        <div class="onboarding-slide" data-slide="2">
          <div class="onboarding-snowflake">🔥</div>
          <h2 class="onboarding-title">Identify Yourself</h2>
          <p class="onboarding-subtitle">Enter the name that will conquer the Winter Arc.</p>
          <div class="input-group" style="text-align:left;margin-bottom:var(--space-lg)">
            <input class="input-field" type="text" id="onboarding-name" placeholder="Your Warrior Name" 
              style="text-align:center;font-size:18px;padding:14px;background:var(--surface-1);border:1px solid var(--border-default);border-radius:var(--radius-lg)" />
          </div>
          <button class="btn btn-primary btn-full" id="onboarding-start">Ascend into the Arc ❄️</button>
          <button class="btn btn-ghost btn-full" id="onboarding-back-2" style="margin-top:var(--space-xs)">← Back</button>
        </div>

        <div class="onboarding-steps">
          <div class="onboarding-dot active" data-dot="0"></div>
          <div class="onboarding-dot" data-dot="1"></div>
          <div class="onboarding-dot" data-dot="2"></div>
        </div>
      </div>
    </div>
  `;

  // Onboarding event bindings
  function goToSlide(n) {
    document.querySelectorAll('.onboarding-slide').forEach((s, i) => s.classList.toggle('active', i === n));
    document.querySelectorAll('.onboarding-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  }

  document.getElementById('onboarding-next-0')?.addEventListener('click', () => goToSlide(1));
  document.getElementById('onboarding-next-1')?.addEventListener('click', () => goToSlide(2));
  document.getElementById('onboarding-back-1')?.addEventListener('click', () => goToSlide(0));
  document.getElementById('onboarding-back-2')?.addEventListener('click', () => goToSlide(1));

  document.getElementById('onboarding-start')?.addEventListener('click', () => {
    const name = document.getElementById('onboarding-name')?.value?.trim() || 'Warrior';
    APP_DATA.userName = name;
    APP_DATA.onboardingComplete = true;
    saveData(APP_DATA);
    playSound('levelup');
    showConfetti();
    renderApp();
    showToast(`Welcome, ${name}! Your Winter Arc begins now.`, '❄️');

    // Prompt login / signup (new arc) / continue as guest right after onboarding
    if (!CURRENT_USER) {
      setTimeout(() => {
        showAuthModal();
        bindAuthModal();
      }, 700);
    }
  });
}


// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS & INTERACTION
// ═══════════════════════════════════════════════════════════════

function attachEventListeners() {
  // ─── Navigation Tabs ──────────
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById(`page-${page}`)?.classList.add('active');
      if (typeof updateNavIndicator === 'function') updateNavIndicator();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  function updateLiveStats() {
    const dayNum = getDayNumber(today());
    const schedule = getTodaySchedule();
    const dayData = getDayData();
    const totalXP = calculateTotalXP(APP_DATA);
    const xpData = getPlayerLevel(totalXP);

    // Update Homepage Total XP Stat
    document.querySelectorAll('.home-total-xp').forEach(el => {
      el.textContent = totalXP.toLocaleString();
    });

    // Update XP across all HUDs
    document.querySelectorAll('.player-xp-counter').forEach(el => {
      el.textContent = `${xpData.progressXP.toLocaleString()} / ${xpData.requiredXP.toLocaleString()} XP`;
    });
    document.querySelectorAll('.story-xp-fill').forEach(el => {
      el.style.width = `${xpData.pct}%`;
    });
    document.querySelectorAll('.player-rank-icon').forEach(el => el.textContent = xpData.icon);
    document.querySelectorAll('.player-rank-text').forEach(el => el.textContent = `LVL ${xpData.level} · ${xpData.title}`);

    // Update Profile Subtitle
    document.querySelectorAll('.profile-email').forEach(el => {
      el.textContent = `Level ${xpData.level} ${xpData.title} · ${totalXP.toLocaleString()} XP`;
    });

    // Update Workout Counters
    let activeExs = schedule.exercises || [];
    if (schedule.isChoiceDay) {
      const selectedChoiceId = dayData.selectedChoice || schedule.choices[0].id;
      const choiceObj = schedule.choices.find(c => c.id === selectedChoiceId) || schedule.choices[0];
      activeExs = [...choiceObj.exercises];
      if (schedule.fixedExercises) activeExs = [...activeExs, ...schedule.fixedExercises];
    }
    const completedCount = activeExs.filter(ex => dayData.exercises && dayData.exercises[ex.name]).length;
    const pct = Math.round((completedCount / Math.max(1, activeExs.length)) * 100);
    
    document.querySelectorAll('.workout-live-count').forEach(el => {
      el.textContent = `${completedCount} / ${activeExs.length}`;
    });
    document.querySelectorAll('.workout-live-pct').forEach(el => {
      el.textContent = `Exercises Done (${pct}%)`;
    });
  }

  function checkAllWorkoutCompleted() {
    const schedule = getTodaySchedule();
    const dayData = getDayData();
    let activeExs = schedule.exercises || [];
    if (schedule.isChoiceDay) {
      const selectedChoiceId = dayData.selectedChoice || schedule.choices[0].id;
      const choiceObj = schedule.choices.find(c => c.id === selectedChoiceId) || schedule.choices[0];
      activeExs = [...choiceObj.exercises];
      if (schedule.fixedExercises) activeExs = [...activeExs, ...schedule.fixedExercises];
    }

    const allDone = activeExs.length > 0 && activeExs.every(ex => dayData.exercises && dayData.exercises[ex.name]);
    if (allDone) {
      dayData.workoutCompleted = true;
      saveData(APP_DATA);
      playSound('levelup');
      showConfetti();
      showToast('All exercises completed! Workout conquered! 🏆', '❄️');
    }
  }

  function bindMovementRowListeners(root = document) {
    const dayNum = getDayNumber(today());
    const setsTarget = getSetsCount(dayNum);

    // ─── Exercise Check Toggles (Interlocked with Sets/Session) ──────────
    root.querySelectorAll('[data-exercise-check]').forEach(check => {
      check.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = check.dataset.exerciseCheck;
        const dayData = getDayData();
        const row = check.closest('.exercise-item');
        const nameEl = row?.querySelector('.exercise-name');
        const isNowChecked = !dayData.exercises[name];

        dayData.exercises[name] = isNowChecked;
        check.classList.toggle('checked', isNowChecked);
        nameEl?.classList.toggle('completed', isNowChecked);

        // Interlock: Synchronize all sets for this exercise
        for (let s = 1; s <= setsTarget; s++) {
          dayData.sets[`${name}_set_${s}`] = isNowChecked;
        }
        row?.querySelectorAll('[data-set-toggle]').forEach(pill => {
          pill.classList.toggle('done', isNowChecked);
          const baseText = pill.textContent.replace('✓', '').trim();
          pill.textContent = isNowChecked ? `${baseText} ✓` : baseText;
        });

        // Interlock: Synchronize duration session pill if applicable
        row?.querySelectorAll('[data-session-toggle]').forEach(pill => {
          pill.classList.toggle('done', isNowChecked);
          const baseText = pill.textContent.replace('✓', '').trim();
          pill.textContent = isNowChecked ? `${baseText} ✓` : baseText;
        });

        saveData(APP_DATA);

        if (isNowChecked) {
          playSound('ping');
          triggerFloatingXP(30, e);
          showToast(`${name} conquered! 💪`, '✅');
          checkAllWorkoutCompleted();
        }

        updateLiveStats();
      });
    });

    // ─── Set Tracker Toggle (Strict Interlocking with Exercise Completion) ──────────
    root.querySelectorAll('[data-set-toggle]').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const setKey = pill.dataset.setToggle;
        const exParent = pill.dataset.exerciseParent;
        const dayData = getDayData();

        const isSetDone = !dayData.sets[setKey];
        dayData.sets[setKey] = isSetDone;

        pill.classList.toggle('done', isSetDone);
        const baseText = pill.textContent.replace('✓', '').trim();
        pill.textContent = isSetDone ? `${baseText} ✓` : baseText;

        if (isSetDone) {
          playSound('ping');
          triggerFloatingXP(15, e);
          startRestTimer(60);
        }

        // Verify if ALL sets for this exercise are completed
        let allSetsDone = true;
        for (let s = 1; s <= setsTarget; s++) {
          if (!dayData.sets[`${exParent}_set_${s}`]) {
            allSetsDone = false;
            break;
          }
        }

        const row = document.getElementById(`exercise-row-${exParent.replace(/[\s\/]/g, '_')}`);
        const checkEl = row?.querySelector('.exercise-check');
        const nameEl = row?.querySelector('.exercise-name');

        if (allSetsDone) {
          // All sets completed -> mark exercise completed
          if (!dayData.exercises[exParent]) {
            dayData.exercises[exParent] = true;
            checkEl?.classList.add('checked');
            nameEl?.classList.add('completed');
            playSound('levelup');
            triggerFloatingXP(30, e);
            showToast(`All sets completed for ${exParent}! 🔥`, '💪');
            checkAllWorkoutCompleted();
          }
        } else {
          // Incomplete sets -> exercise CANNOT be completed
          if (dayData.exercises[exParent]) {
            dayData.exercises[exParent] = false;
            checkEl?.classList.remove('checked');
            nameEl?.classList.remove('completed');
          }
        }

        saveData(APP_DATA);
        updateLiveStats();
      });
    });

    // ─── Duration Session Tracker Toggle ──────────
    root.querySelectorAll('[data-session-toggle]').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const exName = pill.dataset.sessionToggle;
        const dayData = getDayData();

        const isSessionDone = !dayData.exercises[exName];
        dayData.exercises[exName] = isSessionDone;

        pill.classList.toggle('done', isSessionDone);
        const baseText = pill.textContent.replace('✓', '').trim();
        pill.textContent = isSessionDone ? `${baseText} ✓` : baseText;

        const row = document.getElementById(`exercise-row-${exName.replace(/[\s\/]/g, '_')}`);
        row?.querySelector('.exercise-check')?.classList.toggle('checked', isSessionDone);
        row?.querySelector('.exercise-name')?.classList.toggle('completed', isSessionDone);

        saveData(APP_DATA);

        if (isSessionDone) {
          playSound('ping');
          triggerFloatingXP(30, e);
          showToast(`${exName} session finished! ⚡`, '⏱️');
          checkAllWorkoutCompleted();
        }

        updateLiveStats();
      });
    });

    // ─── Inline Visual Guide Expand Toggle (Strict Accordion: Only 1 Open At A Time) ──────────
    root.querySelectorAll('[data-expand-visual]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('.exercise-item');
        if (!row) return;
        const isCurrentlyExpanded = row.classList.contains('expanded');

        // Automatically collapse all other open exercise drawers
        document.querySelectorAll('.exercise-item.expanded').forEach(otherRow => {
          if (otherRow !== row) {
            otherRow.classList.remove('expanded');
            const otherChev = otherRow.querySelector('[data-expand-visual] .chevron-icon');
            if (otherChev) otherChev.innerHTML = SVG.chevronDown;
          }
        });

        // Toggle clicked drawer
        if (!isCurrentlyExpanded) {
          row.classList.add('expanded');
          const chevron = btn.querySelector('.chevron-icon');
          if (chevron) chevron.innerHTML = SVG.chevronUp;
        } else {
          row.classList.remove('expanded');
          const chevron = btn.querySelector('.chevron-icon');
          if (chevron) chevron.innerHTML = SVG.chevronDown;
        }
      });
    });

    // ─── Quick Rest Buttons inside Exercise Drawer ──────────
    root.querySelectorAll('[data-quick-rest]').forEach(btn => {
      btn.addEventListener('click', () => {
        const secs = parseInt(btn.dataset.quickRest) || 60;
        startRestTimer(secs);
        document.querySelector('.rest-timer-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // Bind initial movement listeners
  bindMovementRowListeners(document);

  // ─── Rest Timer Presets ──────────
  document.querySelectorAll('.btn-rest-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const secs = parseInt(btn.dataset.seconds) || 60;
      startRestTimer(secs);
    });
  });

  // ─── Choice Protocol Selector (Tuesday & Thursday - NO PAGE RELOAD) ──────────
  document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', () => {
      const choiceId = card.dataset.choiceId;
      const dayData = getDayData();
      dayData.selectedChoice = choiceId;
      saveData(APP_DATA);
      playSound('ping');

      const schedule = getTodaySchedule();
      if (!schedule.isChoiceDay) return;

      // Update choice cards in-place using .choice-card-action to preserve title/desc
      document.querySelectorAll('.choice-card').forEach(c => {
        const isMatch = c.dataset.choiceId === choiceId;
        c.classList.toggle('selected', isMatch);
        c.classList.toggle('greyed-out', !isMatch);
        const actionCol = c.querySelector('.choice-card-action');
        if (actionCol) {
          actionCol.innerHTML = isMatch
            ? `<span class="choice-badge-selected">Active ✓</span>`
            : `<button class="choice-btn-switch">Switch</button>`;
        }
      });

      // Compute new active exercises
      const choiceObj = schedule.choices.find(c => c.id === choiceId) || schedule.choices[0];
      let activeExs = [...choiceObj.exercises];
      if (schedule.fixedExercises) activeExs = [...activeExs, ...schedule.fixedExercises];

      const exContainer = document.querySelector('.workout-exercises');
      if (exContainer) {
        const dayNum = getDayNumber(today());
        exContainer.innerHTML = renderExerciseRowsHTML(activeExs, dayData, dayNum);
        bindMovementRowListeners(exContainer);
      }

      updateLiveStats();
      showToast(`Protocol changed to ${choiceObj.name}`, '⚡');
    });
  });

  // ─── Daily Arc Quests Toggle (Calls updateLiveStats live) ──────────
  document.querySelectorAll('[data-quest]').forEach(card => {
    card.addEventListener('click', (e) => {
      const qId = card.dataset.quest;
      const xp = parseInt(card.dataset.xp) || 50;
      const dayData = getDayData();
      dayData.checklist[qId] = !dayData.checklist[qId];
      saveData(APP_DATA);

      card.classList.toggle('completed');
      const check = card.querySelector('.exercise-check');
      check?.classList.toggle('checked');

      if (dayData.checklist[qId]) {
        playSound('ping');
        triggerFloatingXP(xp, e);
        const completed = Object.values(dayData.checklist).filter(Boolean).length;
        if (completed === DAILY_QUESTS.length) {
          playSound('levelup');
          showConfetti();
          showToast('Flawless day! All Arc Quests conquered! 🌟', '💎');
        }
      }
      updateLiveStats();
    });
  });

  // ─── Steps Input ──────────
  const stepsInput = document.getElementById('steps-input');
  if (stepsInput) {
    stepsInput.addEventListener('input', (e) => {
      const val = parseInt(stepsInput.value) || 0;
      const dayData = getDayData();
      dayData.steps = val;
      saveData(APP_DATA);

      const dayNum = getDayNumber(today());
      const target = getStepTarget(dayNum);
      const pct = Math.min(100, (val / target) * 100);
      const fill = document.querySelector('.steps-progress-fill');
      if (fill) fill.style.width = pct + '%';

      if (val >= target && !stepsInput.dataset.celebrated) {
        stepsInput.dataset.celebrated = 'true';
        playSound('levelup');
        showConfetti();
        triggerFloatingXP(100, e);
        showToast(`${target.toLocaleString()} steps hit! Incredible work! 🎉`, '👟');
      }
      updateLiveStats();
    });
  }

  // ─── Energy & Mood Sliders ──────────
  document.querySelectorAll('[data-energy]').forEach(opt => {
    opt.addEventListener('click', (e) => {
      const val = parseInt(opt.dataset.energy);
      const dayData = getDayData();
      dayData.energy = val;
      saveData(APP_DATA);

      document.querySelectorAll('[data-energy]').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const display = opt.closest('.slider-group')?.querySelector('.slider-value');
      if (display) display.textContent = `${val}/5`;
      playSound('ping');
      triggerFloatingXP(10, e);
      updateLiveStats();
    });
  });

  document.querySelectorAll('[data-mood]').forEach(opt => {
    opt.addEventListener('click', (e) => {
      const val = parseInt(opt.dataset.mood);
      const dayData = getDayData();
      dayData.mood = val;
      saveData(APP_DATA);

      document.querySelectorAll('[data-mood]').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const display = opt.closest('.slider-group')?.querySelector('.slider-value');
      if (display) display.textContent = `${val}/5`;
      playSound('ping');
      triggerFloatingXP(10, e);
      updateLiveStats();
    });
  });

  // ─── Win of the Day ──────────
  const winInput = document.getElementById('win-input');
  if (winInput) {
    winInput.addEventListener('input', () => {
      const dayData = getDayData();
      dayData.win = winInput.value;
      saveData(APP_DATA);
      updateLiveStats();
    });
  }

  // ─── Exercise Library Accordion & Filters (Strict Accordion: Only 1 Open) ──────────
  function bindLibraryAccordion(container = document) {
    container.querySelectorAll('.exercise-library-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.exercise-library-card');
        if (!card) return;
        const isCurrentlyOpen = card.classList.contains('open');

        // Automatically collapse all other open library cards
        document.querySelectorAll('.exercise-library-card.open').forEach(otherCard => {
          if (otherCard !== card) otherCard.classList.remove('open');
        });

        // Toggle clicked card
        card.classList.toggle('open', !isCurrentlyOpen);
      });
    });
  }

  bindLibraryAccordion(document);

  document.querySelectorAll('#exercise-filters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#exercise-filters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      const library = document.getElementById('exercise-library');
      if (library) {
        library.innerHTML = renderExerciseLibrary(filter);
        bindLibraryAccordion(library);
      }
    });
  });

  // ─── Profile Settings ──────────
  const nameInput = document.getElementById('name-input');
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      APP_DATA.userName = nameInput.value.trim();
      saveData(APP_DATA);
    });
  }

  // ─── Avatar Selection (NO SCREEN REFRESH) ──────────
  document.querySelectorAll('.avatar-option[data-avatar]').forEach(opt => {
    opt.addEventListener('click', () => {
      const avatar = opt.dataset.avatar;
      APP_DATA.userAvatar = avatar;
      saveData(APP_DATA);

      // Update avatar element in DOM directly
      const profAvatar = document.querySelector('.profile-avatar');
      if (profAvatar) {
        profAvatar.innerHTML = avatar.startsWith('data:') 
          ? `<img src="${avatar}" alt="Spirit Avatar" />` 
          : avatar;
      }
      document.querySelectorAll('.avatar-option[data-avatar]').forEach(o => {
        o.classList.toggle('active', o.dataset.avatar === avatar);
      });
      playSound('ping');
      showToast(`Spirit Avatar chosen! ${avatar}`, '🐺');
    });
  });

  const uploadBtn = document.getElementById('upload-avatar-btn');
  const uploadInput = document.getElementById('avatar-upload');
  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 150;
          let w = img.width;
          let h = img.height;
          if (w > h && w > maxDim) {
            h *= maxDim / w;
            w = maxDim;
          } else if (h > maxDim) {
            w *= maxDim / h;
            h = maxDim;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/webp', 0.8);
          APP_DATA.userAvatar = dataUrl;
          saveData(APP_DATA);

          const profAvatar = document.querySelector('.profile-avatar');
          if (profAvatar) {
            profAvatar.innerHTML = `<img src="${dataUrl}" alt="Spirit Avatar" />`;
          }
          document.querySelectorAll('.avatar-option[data-avatar]').forEach(o => o.classList.remove('active'));
          playSound('ping');
          showToast('Custom Spirit photo updated!', '📸');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  document.getElementById('reset-onboarding')?.addEventListener('click', () => {
    APP_DATA.onboardingComplete = false;
    saveData(APP_DATA);
    renderApp();
  });

  document.getElementById('export-data')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(APP_DATA, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `winter-arc-2026-${dateKey(today())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Journey data exported!', '📦');
  });

  document.getElementById('clear-data')?.addEventListener('click', () => {
    if (confirm('Are you certain? This will reset all your progress and badges.')) {
      localStorage.removeItem(STORAGE_KEY);
      APP_DATA = getDefaultData();
      renderApp();
      showToast('All data reset.', '🗑️');
    }
  });

  // Supabase Auth bindings
  bindAuthModal();
}


// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

window.updateNavIndicator = function() {
  const activeItem = document.querySelector('.nav-item.active');
  const indicator = document.querySelector('.nav-indicator');
  if (activeItem && indicator) {
    indicator.style.width = activeItem.offsetWidth + 'px';
    indicator.style.transform = `translateX(${activeItem.offsetLeft}px)`;
  }
};
window.addEventListener('resize', () => {
  if (typeof updateNavIndicator === 'function') updateNavIndicator();
});

// ═══ Auth Modal Logic ══════════════════════════════════
function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'none';
}

function bindAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;

  // Tab switching
  document.getElementById('auth-tab-signin')?.addEventListener('click', () => {
    document.getElementById('auth-panel-signin').style.display = '';
    document.getElementById('auth-panel-signup').style.display = 'none';
    document.getElementById('auth-tab-signin').classList.add('active');
    document.getElementById('auth-tab-signup').classList.remove('active');
    document.getElementById('auth-error').style.display = 'none';
  });
  document.getElementById('auth-tab-signup')?.addEventListener('click', () => {
    document.getElementById('auth-panel-signin').style.display = 'none';
    document.getElementById('auth-panel-signup').style.display = '';
    document.getElementById('auth-tab-signup').classList.add('active');
    document.getElementById('auth-tab-signin').classList.remove('active');
    document.getElementById('auth-error').style.display = 'none';
  });

  function showError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg;
    el.style.display = 'block';
  }
  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (btn) btn.disabled = loading;
  }

  // Sign In
  document.getElementById('auth-btn-signin')?.addEventListener('click', async () => {
    const email    = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;
    if (!email || !password) { showError('Please fill in all fields.'); return; }
    setLoading('auth-btn-signin', true);
    try {
      await signIn(email, password);
      CURRENT_USER = await getCurrentUser();
      await pullCloudToLocal(CURRENT_USER.id, STORAGE_KEY);
      APP_DATA = loadData();
      hideAuthModal();
      renderApp();
      showToast(`Welcome back, ${CURRENT_USER.email.split('@')[0]}! ☁️ Progress synced.`, '❄️');
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading('auth-btn-signin', false);
    }
  });

  // Sign Up
  document.getElementById('auth-btn-signup')?.addEventListener('click', async () => {
    const name     = document.getElementById('auth-name')?.value.trim();
    const email    = document.getElementById('auth-email-2')?.value.trim();
    const password = document.getElementById('auth-password-2')?.value;
    if (!name || !email || !password) { showError('Please fill in all fields.'); return; }
    setLoading('auth-btn-signup', true);
    try {
      await signUp(email, password, name);
      CURRENT_USER = await getCurrentUser();
      if (CURRENT_USER) {
        APP_DATA.userName = name;
        saveData(APP_DATA);
        pushProfileToCloud(CURRENT_USER.id, { display_name: name, avatar: APP_DATA.userAvatar || 'wolf' });
      }
      hideAuthModal();
      renderApp();
      showToast(`Arc started, ${name}! Check your email to verify. ❄️`, '📧');
    } catch (err) {
      showError(err.message);
    } finally {
      setLoading('auth-btn-signup', false);
    }
  });

  // Close button
  document.getElementById('auth-btn-close')?.addEventListener('click', () => {
    hideAuthModal();
  });

  // Backdrop click dismiss
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideAuthModal();
  });

  // Guest
  document.getElementById('auth-btn-guest')?.addEventListener('click', () => {
    hideAuthModal();
  });

  // Sign Out
  document.getElementById('btn-signout')?.addEventListener('click', async () => {
    try {
      await signOut();
      CURRENT_USER = null;
      renderApp();
      showToast('Signed out. Progress saved locally.', '🚪');
    } catch (err) {
      showToast('Error signing out: ' + err.message, '⚠️');
    }
  });

  // Show auth from profile
  document.getElementById('btn-show-auth')?.addEventListener('click', () => {
    showAuthModal();
    bindAuthModal();
  });
}

// ═══ ASYNC BOOT ══════════════════════════════════════════════════════
async function init() {
  try {
    CURRENT_USER = await getCurrentUser();
    if (CURRENT_USER) {
      await pullCloudToLocal(CURRENT_USER.id, STORAGE_KEY);
      APP_DATA = loadData(); // reload merged data
    }
  } catch (e) {
    console.warn('[Boot] Supabase check failed, running offline:', e.message);
  }
  renderApp();

  // Auto-show auth modal if user is not signed in and hasn't dismissed before
  if (!CURRENT_USER) {
    const dismissed = sessionStorage.getItem('auth_modal_dismissed');
    if (!dismissed) {
      // Delay slightly so app renders first
      setTimeout(() => {
        showAuthModal();
        bindAuthModal();
        sessionStorage.setItem('auth_modal_dismissed', '1');
      }, 1500);
    }
  }

  // Listen for auth state changes (e.g. magic link, token refresh)
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      CURRENT_USER = session.user;
      await pullCloudToLocal(CURRENT_USER.id, STORAGE_KEY);
      APP_DATA = loadData();
      hideAuthModal();
      renderApp();
    } else if (event === 'SIGNED_OUT') {
      CURRENT_USER = null;
    }
  });
}

init();
