/* ═══════════════════════════════════════════════════════════════
   WINTER ARC 2026 — Biomechanical Exercise Visuals
   Crafted with real exercise rep motion, athletic joint mechanics,
   dynamic muscle contraction glows, and zero text/pill collisions.
   ═══════════════════════════════════════════════════════════════ */

export const EXERCISE_VISUALS = {
  'Squat': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-quads" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Ground line -->
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Grounded Foot -->
      <line x1="175" y1="190" x2="215" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>
      
      <!-- Animated Stickman Performing Deep Squat Rep -->
      <g>
        <!-- Head -->
        <circle cx="165" cy="50" r="11" fill="#f8fafc">
          <animate attributeName="cx" values="165; 188; 188; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="cy" values="50; 88; 88; 50" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </circle>

        <!-- Torso / Spine (45° angle at bottom) -->
        <line x1="165" y1="60" x2="165" y2="120" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x1" values="165; 188; 188; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y1" values="60; 98; 98; 60" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="x2" values="165; 145; 145; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y2" values="120; 138; 138; 120" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>

        <!-- Arms (Swing forward for counterbalance) -->
        <line x1="165" y1="75" x2="165" y2="115" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round">
          <animate attributeName="x1" values="165; 182; 182; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y1" values="75; 106; 106; 75" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="x2" values="165; 235; 235; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y2" values="115; 106; 106; 115" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>

        <!-- Thigh / Femur (Hits parallel 90° at bottom) -->
        <line x1="165" y1="120" x2="185" y2="155" stroke="#38bdf8" stroke-width="8" stroke-linecap="round">
          <animate attributeName="x1" values="165; 145; 145; 165" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y1" values="120; 138; 138; 120" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="x2" values="185; 215; 215; 185" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y2" values="155; 138; 138; 155" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>

        <!-- Shin / Tibia (Knee tracks forward over toe) -->
        <line x1="185" y1="155" x2="185" y2="190" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x1" values="185; 215; 215; 185" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y1" values="155; 138; 138; 155" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>

        <!-- Quads Contraction Glow -->
        <ellipse cx="180" cy="138" rx="26" ry="12" fill="url(#glow-quads)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- 90° Parallel Arc & Depth Indicator (Lights up at bottom) -->
      <g>
        <path d="M 175 138 A 16 16 0 0 1 200 138" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="225" y="132" fill="#fbbf24" font-size="10" font-weight="700">90° Parallel</text>
        <animate attributeName="opacity" values="0; 1; 1; 0" dur="2.8s" repeatCount="indefinite" keyTimes="0; 0.45; 0.55; 1" />
      </g>

      <!-- Muscle Badge (Safely at top left, zero collision) -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="112" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="56" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Quads &amp; Glutes</text>
      </g>

      <!-- Biomechanical Foot Cue -->
      <text x="195" y="208" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">Heels Grounded</text>
    </svg>
  `,

  'Push-up': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-chest" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="185" x2="300" y2="185" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Planted Hands & Toes -->
      <circle cx="65" cy="175" r="5" fill="#94a3b8"/>
      <circle cx="225" cy="185" r="5" fill="#60a5fa"/>

      <!-- Animated Stickman Push-up Repetition -->
      <g>
        <!-- Head -->
        <circle cx="262" cy="108" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="108; 148; 148; 108" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </circle>

        <!-- Rigid Spine (Pivots smoothly from toes at 65, 175) -->
        <line x1="65" y1="175" x2="252" y2="114" stroke="#f8fafc" stroke-width="7" stroke-linecap="round">
          <animate attributeName="y2" values="114; 155; 155; 114" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>

        <!-- Upper Arm (Shoulder to Elbow) -->
        <line x1="225" y1="120" x2="225" y2="155" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="y1" values="120; 155; 155; 120" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="225; 204; 204; 225" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="155; 170; 170; 155" dur="2.6s" repeatCount="indefinite" />
        </line>

        <!-- Forearm (Elbow to Hand at 225, 185) -->
        <line x1="225" y1="155" x2="225" y2="185" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x1" values="225; 204; 204; 225" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="155; 170; 170; 155" dur="2.6s" repeatCount="indefinite" />
        </line>

        <!-- Chest Contraction Glow (Lights up at bottom) -->
        <circle cx="225" cy="155" r="18" fill="url(#glow-chest)">
          <animate attributeName="opacity" values="0.1; 0.9; 0.9; 0.1" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="130" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="65" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Chest &amp; Triceps</text>
      </g>

      <!-- Cue text -->
      <text x="145" y="145" fill="#34d399" font-size="10" font-weight="700">Straight Plank Line</text>
      <text x="225" y="204" fill="#94a3b8" font-size="10" text-anchor="middle">Elbows @ 45°</text>
    </svg>
  `,

  'Reverse Lunge': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-lunge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Front Foot Planted -->
      <line x1="190" y1="190" x2="220" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

      <!-- Animated Stickman Lunge Descent and Drive -->
      <g>
        <!-- Head (Vertical drop) -->
        <circle cx="160" cy="45" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="45; 78; 78; 45" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </circle>

        <!-- Spine (Stays completely upright) -->
        <line x1="160" y1="55" x2="160" y2="115" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="55; 88; 88; 55" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="115; 148; 148; 115" dur="2.8s" repeatCount="indefinite" />
        </line>

        <!-- Front Thigh (Reaches 90° at bottom) -->
        <line x1="160" y1="115" x2="205" y2="152" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
          <animate attributeName="y1" values="115; 148; 148; 115" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="152; 148; 148; 152" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Front Shin -->
        <line x1="205" y1="152" x2="205" y2="190" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="152; 148; 148; 152" dur="2.8s" repeatCount="indefinite" />
        </line>

        <!-- Back Leg (Reaches back and hovers knee at floor) -->
        <line x1="160" y1="115" x2="115" y2="150" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="115; 148; 148; 115" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="160; 115; 115; 160" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="150; 178; 178; 150" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Back Shin to Toe -->
        <line x1="115" y1="150" x2="75" y2="190" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x1" values="160; 115; 115; 160" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="150; 178; 178; 150" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="160; 75; 75; 160" dur="2.8s" repeatCount="indefinite" />
        </line>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="105" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="52" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Quads &amp; Glutes</text>
      </g>

      <text x="215" y="145" fill="#38bdf8" font-size="10" font-weight="bold">90° Front Knee</text>
      <text x="95" y="172" fill="#fbbf24" font-size="9" font-weight="bold">Hover 1" Off Floor</text>
    </svg>
  `,

  'Pike Push-up': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-shoulders" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Ground Contacts -->
      <circle cx="80" cy="190" r="4" fill="#94a3b8"/>
      <circle cx="215" cy="190" r="4" fill="#60a5fa"/>

      <!-- Legs to Inverted V High Hips (Hips stay elevated) -->
      <line x1="80" y1="190" x2="155" y2="80" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <circle cx="155" cy="80" r="6" fill="#38bdf8"/>

      <!-- Animated Press Down to Tripod and Up -->
      <g>
        <!-- Torso -->
        <line x1="155" y1="80" x2="200" y2="125" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x2" values="200; 215; 215; 200" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="125; 155; 155; 125" dur="2.6s" repeatCount="indefinite" />
        </line>
        <!-- Head (lowers towards floor) -->
        <circle cx="208" cy="132" r="10" fill="#f8fafc">
          <animate attributeName="cx" values="208; 228; 228; 208" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="cy" values="132; 165; 165; 132" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <!-- Arms bending at elbow -->
        <line x1="200" y1="125" x2="215" y2="190" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x1" values="200; 215; 215; 200" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="125; 155; 155; 125" dur="2.6s" repeatCount="indefinite" />
        </line>
        <!-- Shoulder Glow -->
        <circle cx="205" cy="130" r="16" fill="url(#glow-shoulders)">
          <animate attributeName="cy" values="130; 158; 158; 130" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="125" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="62" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Overhead Deltoids</text>
      </g>
      <text x="155" y="65" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">Inverted V Hips</text>
    </svg>
  `,

  'Glute Bridge': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-bridge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="185" x2="300" y2="185" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Ground Contacts: Upper Back & Planted Feet -->
      <circle cx="80" cy="180" r="9" fill="#f8fafc"/>
      <line x1="220" y1="185" x2="245" y2="185" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

      <!-- Animated Hip Drive into Full Extension -->
      <g>
        <!-- Torso Line (from upper back 80, 180 to hips) -->
        <line x1="80" y1="180" x2="150" y2="178" stroke="#f8fafc" stroke-width="7" stroke-linecap="round">
          <animate attributeName="x2" values="150; 145; 145; 150" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y2" values="178; 132; 132; 178" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>
        <!-- Thigh Line (from hips to knees 210, 150) -->
        <line x1="150" y1="178" x2="210" y2="150" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
          <animate attributeName="x1" values="150; 145; 145; 150" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y1" values="178; 132; 132; 178" dur="2.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>
        <!-- Shin Line (from knees to feet 230, 185) -->
        <line x1="210" y1="150" x2="230" y2="185" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

        <!-- Glute Peak Contraction Glow -->
        <ellipse cx="145" cy="135" rx="20" ry="12" fill="url(#glow-bridge)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.6s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="112" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="56" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Glute Contraction</text>
      </g>
      <text x="145" y="115" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Lockout Straight Line</text>
    </svg>
  `,

  'Backpack Romanian Deadlift': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-hamstring" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Grounded Feet -->
      <line x1="140" y1="190" x2="165" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

      <!-- Animated Hip Hinge Repetition -->
      <g>
        <!-- Shin (Slight soft angle, stays grounded) -->
        <line x1="145" y1="190" x2="140" y2="150" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

        <!-- Thigh (Pushes back on hinge) -->
        <line x1="140" y1="150" x2="145" y2="115" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
          <animate attributeName="x2" values="145; 112; 112; 145" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y2" values="115; 120; 120; 115" dur="2.8s" repeatCount="indefinite" />
        </line>

        <!-- Torso (Hinges from upright to flat horizontal) -->
        <line x1="145" y1="115" x2="155" y2="55" stroke="#34d399" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x1" values="145; 112; 112; 145" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="115; 120; 120; 115" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="155; 200; 200; 155" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="55; 112; 112; 55" dur="2.8s" repeatCount="indefinite" />
        </line>

        <!-- Head -->
        <circle cx="158" cy="45" r="10" fill="#f8fafc">
          <animate attributeName="cx" values="158; 212; 212; 158" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="45; 108; 108; 45" dur="2.8s" repeatCount="indefinite" />
        </circle>

        <!-- Arms with Backpack Hanging to Mid-Shin -->
        <line x1="155" y1="65" x2="160" y2="120" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round">
          <animate attributeName="x1" values="155; 190; 190; 155" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="65; 115; 115; 65" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="160; 185; 185; 160" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="120; 168; 168; 120" dur="2.8s" repeatCount="indefinite" />
        </line>
        <rect x="150" y="115" width="26" height="22" rx="4" fill="#3b82f6" stroke="#60a5fa" stroke-width="2">
          <animate attributeName="x" values="150; 172; 172; 150" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y" values="115; 160; 160; 115" dur="2.8s" repeatCount="indefinite" />
        </rect>

        <!-- Hamstring Stretch Glow -->
        <ellipse cx="125" cy="140" rx="16" ry="10" fill="url(#glow-hamstring)">
          <animate attributeName="opacity" values="0.1; 0.9; 0.9; 0.1" dur="2.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="136" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="68" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Posterior Chain &amp; RDL</text>
      </g>
      <text x="180" y="85" fill="#34d399" font-size="10" font-weight="bold">Flat Neutral Spine</text>
    </svg>
  `,

  'Backpack Row': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-lats" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Stance -->
      <line x1="140" y1="190" x2="135" y2="155" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
      <line x1="135" y1="155" x2="115" y2="120" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
      <!-- Torso at 45° -->
      <line x1="115" y1="120" x2="195" y2="100" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <circle cx="205" cy="95" r="9" fill="#f8fafc"/>

      <!-- Animated Rowing Arms & Backpack -->
      <g>
        <!-- Arm: Pulling elbow back to ribcage -->
        <line x1="180" y1="105" x2="180" y2="165" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x2" values="180; 160; 160; 180" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="165; 95; 95; 165" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1="180" y1="165" x2="180" y2="165" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x1" values="180; 160; 160; 180" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y1" values="165; 95; 95; 165" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="x2" values="180; 175; 175; 180" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="165; 130; 130; 165" dur="2.4s" repeatCount="indefinite" />
        </line>

        <!-- Backpack -->
        <rect x="168" y="160" width="24" height="22" rx="4" fill="#3b82f6" stroke="#60a5fa" stroke-width="2">
          <animate attributeName="y" values="160; 125; 125; 160" dur="2.4s" repeatCount="indefinite" />
        </rect>

        <!-- Lats Glow on Squeeze -->
        <ellipse cx="150" cy="108" rx="20" ry="12" fill="url(#glow-lats)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="115" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="57" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Lats &amp; Upper Back</text>
      </g>
      <text x="145" y="75" fill="#38bdf8" font-size="10" font-weight="bold">Elbow to Hip Pocket</text>
    </svg>
  `,

  'Hamstring Walkout': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-hamstring-walk" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="185" x2="300" y2="185" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Grounded Upper Body & Braced Arms -->
      <circle cx="65" cy="175" r="9" fill="#f8fafc"/>
      <line x1="65" y1="175" x2="105" y2="178" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
      <line x1="95" y1="178" x2="135" y2="185" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>

      <!-- Elevated Torso / Hips Bridge (Hips stay off floor) -->
      <line x1="105" y1="178" x2="148" y2="142" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/>
      <circle cx="148" cy="142" r="6" fill="#38bdf8"/>

      <!-- FAR LEG (Alternating Trail Heel Walkout) -->
      <g opacity="0.65">
        <!-- Thigh -->
        <line x1="148" y1="142" x2="185" y2="152" stroke="#60a5fa" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x2" values="185; 205; 205; 185" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="152; 165; 165; 152" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Shin -->
        <line x1="185" y1="152" x2="200" y2="185" stroke="#60a5fa" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x1" values="185; 205; 205; 185" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="152; 165; 165; 152" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="200; 248; 248; 200" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Heel contact -->
        <circle cx="200" cy="185" r="4" fill="#60a5fa">
          <animate attributeName="cx" values="200; 248; 248; 200" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- NEAR LEG (Lead Heel Stepping Out into Full Extension) -->
      <g>
        <!-- Thigh -->
        <line x1="148" y1="142" x2="190" y2="155" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
          <animate attributeName="x2" values="190; 215; 215; 190" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="155; 168; 168; 155" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Shin -->
        <line x1="190" y1="155" x2="212" y2="185" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x1" values="190; 215; 215; 190" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="155; 168; 168; 155" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="212; 265; 265; 212" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Digging Heel -->
        <circle cx="212" cy="185" r="5" fill="#38bdf8">
          <animate attributeName="cx" values="212; 265; 265; 212" dur="2.8s" repeatCount="indefinite" />
        </circle>

        <!-- Hamstrings Eccentric Load Glow -->
        <ellipse cx="185" cy="156" rx="20" ry="10" fill="url(#glow-hamstring-walk)">
          <animate attributeName="opacity" values="0.2; 0.95; 0.95; 0.2" dur="2.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="132" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="66" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Hamstring Eccentric Walk</text>
      </g>
      <text x="148" y="122" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Hips High Off Floor</text>
      <text x="238" y="202" fill="#94a3b8" font-size="9" text-anchor="middle">Dig Heels Out · Small Steps</text>
    </svg>
  `,

  'Reverse Fly': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-rhomboids" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Spine -->
      <line x1="160" y1="65" x2="160" y2="155" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <circle cx="160" cy="55" r="10" fill="#f8fafc"/>

      <!-- Animated Wings Opening and Pinching -->
      <g>
        <path d="M 160 95 Q 120 125 100 145" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="d" values="M 160 95 Q 120 125 100 145; M 160 95 Q 105 85 55 100; M 160 95 Q 105 85 55 100; M 160 95 Q 120 125 100 145" dur="2.6s" repeatCount="indefinite" />
        </path>
        <path d="M 160 95 Q 200 125 220 145" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="d" values="M 160 95 Q 200 125 220 145; M 160 95 Q 215 85 265 100; M 160 95 Q 215 85 265 100; M 160 95 Q 200 125 220 145" dur="2.6s" repeatCount="indefinite" />
        </path>
        <!-- Shoulder blade pinch glow -->
        <ellipse cx="160" cy="95" rx="24" ry="14" fill="url(#glow-rhomboids)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.6s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="118" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="59" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Rear Delts &amp; Traps</text>
      </g>
      <text x="160" y="178" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Pinch Scapulae Together</text>
    </svg>
  `,

  'Biceps Curl': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-bicep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Standing Stickman Body -->
      <circle cx="120" cy="50" r="10" fill="#f8fafc"/>
      <line x1="120" y1="60" x2="120" y2="135" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <line x1="120" y1="135" x2="120" y2="190" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

      <!-- Pinned Upper Arm (Elbow pivot fixed at 120, 115) -->
      <line x1="120" y1="75" x2="120" y2="115" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <circle cx="120" cy="115" r="5" fill="#fbbf24"/>

      <!-- Animated Forearm Curled to Peak Contraction -->
      <g>
        <line x1="120" y1="115" x2="120" y2="162" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x2" values="120; 155; 155; 120" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
          <animate attributeName="y2" values="162; 80; 80; 162" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </line>
        <rect x="110" y="152" width="20" height="18" rx="4" fill="#3b82f6" stroke="#60a5fa" stroke-width="2">
          <animate attributeName="x" values="110; 145; 145; 110" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y" values="152; 70; 70; 152" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <circle cx="130" cy="95" r="14" fill="url(#glow-bicep)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="105" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="52" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Biceps Brachii</text>
      </g>
      <text x="180" y="115" fill="#fbbf24" font-size="10" font-weight="bold">Elbow Pinned to Ribs</text>
      <text x="180" y="55" fill="#38bdf8" font-size="10" font-weight="bold">Full Squeeze at Top</text>
    </svg>
  `,

  'Overhead Triceps Extension': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-tricep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="140" cy="80" r="10" fill="#f8fafc"/>
      <line x1="140" y1="90" x2="140" y2="165" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <line x1="140" y1="165" x2="140" y2="195" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>

      <!-- Vertical Upper Arm (Elbow stays high at 155, 45) -->
      <line x1="140" y1="90" x2="155" y2="45" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
      <circle cx="155" cy="45" r="5" fill="#fbbf24"/>

      <!-- Animated Forearm Extending to Full Lockout -->
      <g>
        <line x1="155" y1="45" x2="135" y2="70" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x2" values="135; 158; 158; 135" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="70; 12; 12; 70" dur="2.4s" repeatCount="indefinite" />
        </line>
        <rect x="125" y="65" width="18" height="15" rx="3" fill="#3b82f6">
          <animate attributeName="x" values="125; 150; 150; 125" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y" values="65; 4; 4; 65" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <ellipse cx="148" cy="55" rx="10" ry="14" fill="url(#glow-tricep)">
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="112" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="56" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Triceps Long Head</text>
      </g>
      <text x="185" y="45" fill="#fbbf24" font-size="10">Elbows Point Forward</text>
    </svg>
  `,

  'Plank': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="180" x2="300" y2="180" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Ground Line Alignment Reference -->
      <line x1="50" y1="145" x2="260" y2="110" stroke="#34d399" stroke-width="1.8" stroke-dasharray="4 4"/>

      <!-- Perfectly Rigid Plank with Breathing Wave -->
      <circle cx="265" cy="105" r="9" fill="#f8fafc"/>
      <line x1="255" y1="110" x2="60" y2="145" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/>

      <!-- Forearms Grounded -->
      <line x1="235" y1="115" x2="235" y2="155" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <line x1="235" y1="155" x2="255" y2="155" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>
      <circle cx="60" cy="145" r="4" fill="#94a3b8"/>

      <!-- Core Tension Pulse -->
      <ellipse cx="160" cy="126" rx="30" ry="12" fill="url(#glow-core)">
        <animate attributeName="rx" values="26; 34; 26" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4; 0.9; 0.4" dur="2s" repeatCount="indefinite" />
      </ellipse>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="118" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="59" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Isometric Core Shield</text>
      </g>
      <text x="160" y="162" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Neutral Spine · Glutes Clenched</text>
    </svg>
  `,

  'Calf Raise': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-calves" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Animated Stickman Rising Up onto Balls of Feet -->
      <g>
        <circle cx="160" cy="50" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="50; 26; 26; 50" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1" />
        </circle>
        <line x1="160" y1="60" x2="160" y2="125" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="60; 36; 36; 60" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="125; 101; 101; 125" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1="160" y1="125" x2="160" y2="165" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="125; 101; 101; 125" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="165; 141; 141; 165" dur="2.4s" repeatCount="indefinite" />
        </line>

        <!-- Ankle / Foot Elevation -->
        <line x1="160" y1="165" x2="160" y2="190" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="165; 141; 141; 165" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="y2" values="190; 168; 168; 190" dur="2.4s" repeatCount="indefinite" />
        </line>
        <!-- Toes contact grounded -->
        <line x1="160" y1="190" x2="178" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

        <!-- Gastrocnemius / Soleus Glow on Peak -->
        <ellipse cx="160" cy="150" rx="14" ry="16" fill="url(#glow-calves)">
          <animate attributeName="cy" values="150; 126; 126; 150" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.1; 0.95; 0.95; 0.1" dur="2.4s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="112" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="56" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Gastrocnemius Peak</text>
      </g>
      <text x="200" y="150" fill="#38bdf8" font-size="10" font-weight="bold">Drive High Onto Toes</text>
    </svg>
  `,

  'Wall Sit': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-wall" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Vertical Wall -->
      <line x1="120" y1="40" x2="120" y2="190" stroke="#64748b" stroke-width="4"/>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Flat Back Flush to Wall -->
      <circle cx="120" cy="70" r="10" fill="#f8fafc"/>
      <line x1="120" y1="80" x2="120" y2="135" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

      <!-- 90° Thigh & Shin -->
      <line x1="120" y1="135" x2="180" y2="135" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
      <line x1="180" y1="135" x2="180" y2="190" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <line x1="175" y1="190" x2="205" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

      <!-- Quads Isometric Fire Pulse -->
      <ellipse cx="150" cy="135" rx="22" ry="12" fill="url(#glow-wall)">
        <animate attributeName="opacity" values="0.3; 0.9; 0.3" dur="1.8s" repeatCount="indefinite" />
      </ellipse>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="112" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="56" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Isometric Quads 90°</text>
      </g>
      <text x="188" y="125" fill="#fbbf24" font-size="10" font-weight="bold">90° Angle</text>
      <text x="128" y="55" fill="#34d399" font-size="10">Back Flat on Wall</text>
    </svg>
  `,

  'Dead Bug': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-deadbug" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="175" x2="300" y2="175" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Back flat on floor (No arching) -->
      <circle cx="85" cy="165" r="9" fill="#f8fafc"/>
      <line x1="85" y1="165" x2="195" y2="165" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/>

      <!-- Animated Contralateral Limb Extension -->
      <g>
        <!-- Arm 1 (extends overhead to floor) -->
        <line x1="125" y1="165" x2="125" y2="105" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
          <animate attributeName="x2" values="125; 65; 65; 125" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="105; 165; 165; 105" dur="2.8s" repeatCount="indefinite" />
        </line>
        <!-- Opposite Leg (extends straight out) -->
        <line x1="195" y1="165" x2="195" y2="115" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
          <animate attributeName="x2" values="195; 265; 265; 195" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="115; 155; 155; 115" dur="2.8s" repeatCount="indefinite" />
        </line>

        <!-- Static Counter Limbs held at 90° -->
        <line x1="125" y1="165" x2="125" y2="105" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        <line x1="195" y1="165" x2="195" y2="115" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>

        <!-- Core Anti-Extension Glow -->
        <ellipse cx="150" cy="165" rx="22" ry="10" fill="url(#glow-deadbug)">
          <animate attributeName="opacity" values="0.3; 0.95; 0.3" dur="2.8s" repeatCount="indefinite" />
        </ellipse>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="122" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="61" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Anti-Extension Core</text>
      </g>
      <text x="150" y="195" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Lower Back Glued to Floor</text>
    </svg>
  `,

  'Running / Jogging': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-cardio" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#34d399" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Track Ground Line -->
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Animated Athletic Runner with Complete Anatomy (2 Full Legs & 2 Pumping Arms) -->
      <g>
        <!-- Head with natural running vertical bob -->
        <circle cx="166" cy="48" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="48; 43; 48; 43; 48" dur="1.2s" repeatCount="indefinite" />
        </circle>

        <!-- Torso with athletic 15° forward lean -->
        <line x1="162" y1="58" x2="148" y2="118" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

        <!-- FAR ARM (Pumping in opposition to lead leg) -->
        <g opacity="0.6">
          <line x1="160" y1="68" x2="136" y2="92" stroke="#94a3b8" stroke-width="4" stroke-linecap="round">
            <animate attributeName="x2" values="136; 182; 136" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="92; 86; 92" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="136" y1="92" x2="142" y2="112" stroke="#94a3b8" stroke-width="4" stroke-linecap="round">
            <animate attributeName="x1" values="136; 182; 136" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="92; 86; 92" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="142; 172; 142" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="112; 68; 112" dur="1.2s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- FAR LEG (Trail leg cycling back to front) -->
        <g opacity="0.65">
          <!-- Thigh -->
          <line x1="148" y1="118" x2="118" y2="145" stroke="#60a5fa" stroke-width="6" stroke-linecap="round">
            <animate attributeName="x2" values="118; 188; 118" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="145; 140; 145" dur="1.2s" repeatCount="indefinite" />
          </line>
          <!-- Shin / Calf -->
          <line x1="118" y1="145" x2="94" y2="172" stroke="#60a5fa" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x1" values="118; 188; 118" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="145; 140; 145" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="94; 175; 94" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="172; 188; 172" dur="1.2s" repeatCount="indefinite" />
          </line>
          <!-- Foot -->
          <line x1="94" y1="172" x2="80" y2="180" stroke="#60a5fa" stroke-width="4" stroke-linecap="round">
            <animate attributeName="x1" values="94; 175; 94" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="172; 188; 172" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="80; 195; 80" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="180; 189; 180" dur="1.2s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- NEAR LEG (Lead leg driving forward & striking midfoot) -->
        <g>
          <!-- Thigh -->
          <line x1="148" y1="118" x2="188" y2="140" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
            <animate attributeName="x2" values="188; 118; 188" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="140; 145; 140" dur="1.2s" repeatCount="indefinite" />
          </line>
          <!-- Shin / Calf -->
          <line x1="188" y1="140" x2="175" y2="188" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
            <animate attributeName="x1" values="188; 118; 188" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="140; 145; 140" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="175; 94; 175" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="188; 172; 188" dur="1.2s" repeatCount="indefinite" />
          </line>
          <!-- Foot -->
          <line x1="175" y1="188" x2="195" y2="189" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x1" values="175; 94; 175" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="188; 172; 188" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="195; 80; 195" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="189; 180; 189" dur="1.2s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- NEAR ARM (Forward sprinting 90° pump) -->
        <g>
          <line x1="160" y1="68" x2="184" y2="88" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x2" values="184; 136; 184" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="88; 92; 88" dur="1.2s" repeatCount="indefinite" />
          </line>
          <line x1="184" y1="88" x2="174" y2="68" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x1" values="184; 136; 184" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y1" values="88; 92; 88" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="x2" values="174; 142; 174" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="68; 112; 68" dur="1.2s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- Cardio Heart Glow -->
        <circle cx="156" cy="74" r="14" fill="url(#glow-cardio)">
          <animate attributeName="opacity" values="0.3; 0.95; 0.3" dur="0.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="128" height="24" rx="6" fill="rgba(52, 211, 153, 0.15)" stroke="rgba(52, 211, 153, 0.4)"/>
        <text x="64" y="16" fill="#34d399" font-size="10" font-weight="600" text-anchor="middle">⚡ Zone 2 Aerobic Base</text>
      </g>
      <text x="160" y="208" fill="#94a3b8" font-size="10" text-anchor="middle">Midfoot Strike · Cadence 170+</text>
    </svg>
  `,

  'Power Yoga': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-yoga" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Grounded Warrior II Stance with Complete Anatomy -->
      <g>
        <!-- Head gazing over lead fingertip -->
        <circle cx="160" cy="50" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="50; 47; 50" dur="3.6s" repeatCount="indefinite" />
        </circle>

        <!-- Upright Spine -->
        <line x1="160" y1="60" x2="160" y2="125" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

        <!-- Extended Arms (Horizon plane parallel to floor) -->
        <!-- Rear Arm -->
        <line x1="160" y1="75" x2="80" y2="75" stroke="#a78bfa" stroke-width="5" stroke-linecap="round">
          <animate attributeName="y2" values="75; 72; 75" dur="3.6s" repeatCount="indefinite" />
        </line>
        <!-- Lead Arm -->
        <line x1="160" y1="75" x2="240" y2="75" stroke="#a78bfa" stroke-width="5" stroke-linecap="round">
          <animate attributeName="y2" values="75; 72; 75" dur="3.6s" repeatCount="indefinite" />
        </line>

        <!-- BACK LEG (Extended with Knife-Edge Grounded Foot) -->
        <!-- Thigh -->
        <line x1="160" y1="125" x2="125" y2="158" stroke="#a78bfa" stroke-width="6" stroke-linecap="round"/>
        <!-- Shin -->
        <line x1="125" y1="158" x2="90" y2="190" stroke="#a78bfa" stroke-width="5" stroke-linecap="round"/>
        <!-- Foot -->
        <line x1="78" y1="190" x2="105" y2="190" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round"/>

        <!-- FRONT LEAD LEG (Deep 90° Knee Bend & Grounded Foot) -->
        <!-- Thigh -->
        <line x1="160" y1="125" x2="215" y2="155" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
          <animate attributeName="y2" values="155; 152; 155" dur="3.6s" repeatCount="indefinite" />
        </line>
        <!-- Shin (Vertical over ankle) -->
        <line x1="215" y1="155" x2="215" y2="190" stroke="#f8fafc" stroke-width="6" stroke-linecap="round">
          <animate attributeName="y1" values="155; 152; 155" dur="3.6s" repeatCount="indefinite" />
        </line>
        <!-- Foot planted firmly -->
        <line x1="205" y1="190" x2="235" y2="190" stroke="#60a5fa" stroke-width="5" stroke-linecap="round"/>

        <!-- Aura / Pranic Expansion Flow -->
        <circle cx="160" cy="85" r="28" fill="url(#glow-yoga)">
          <animate attributeName="r" values="24; 34; 24" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25; 0.85; 0.25" dur="3.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="132" height="24" rx="6" fill="rgba(167, 139, 250, 0.15)" stroke="rgba(167, 139, 250, 0.4)"/>
        <text x="66" y="16" fill="#a78bfa" font-size="10" font-weight="600" text-anchor="middle">⚡ Balance &amp; Isometric Vigor</text>
      </g>
      <text x="160" y="208" fill="#94a3b8" font-size="10" text-anchor="middle">Warrior II · Deep Nasal Breath</text>
    </svg>
  `,

  'Mat Pilates': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-pilates" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="180" x2="300" y2="180" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- The Hundred / Teaser Hollow Body Alignment -->
      <circle cx="95" cy="140" r="9" fill="#f8fafc"/>
      <line x1="95" y1="145" x2="160" y2="175" stroke="#f8fafc" stroke-width="7" stroke-linecap="round"/>

      <!-- Elevated Legs at 45° -->
      <line x1="160" y1="175" x2="250" y2="120" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>

      <!-- Pumping Arms with Rapid Cadence -->
      <line x1="120" y1="160" x2="185" y2="155" stroke="#60a5fa" stroke-width="5" stroke-linecap="round">
        <animate attributeName="y2" values="155; 165; 155" dur="0.5s" repeatCount="indefinite" />
      </line>

      <ellipse cx="150" cy="170" rx="24" ry="12" fill="url(#glow-pilates)">
        <animate attributeName="opacity" values="0.4; 0.9; 0.4" dur="1.5s" repeatCount="indefinite" />
      </ellipse>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="134" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="67" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ Deep Transverse Core</text>
      </g>
      <text x="160" y="202" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">The Hundred Pumping Stride</text>
    </svg>
  `,

  'Mobility Flow': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-mobility" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#34d399" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#34d399" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="185" x2="300" y2="185" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Quadruped Stance: Hands at 210, 185; Knees at 110, 185 -->
      <line x1="210" y1="125" x2="210" y2="185" stroke="#f8fafc" stroke-width="5" stroke-linecap="round"/>
      <line x1="110" y1="140" x2="110" y2="185" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
      <circle cx="230" cy="115" r="9" fill="#f8fafc">
        <animate attributeName="cy" values="115; 100; 115" dur="3s" repeatCount="indefinite" />
      </circle>

      <!-- Animated Cat-Cow Spinal Wave -->
      <path d="M 110 140 Q 160 140 210 125" fill="none" stroke="#34d399" stroke-width="6" stroke-linecap="round">
        <animate attributeName="d" values="M 110 140 Q 160 140 210 125; M 110 140 Q 160 105 210 125; M 110 140 Q 160 155 210 125; M 110 140 Q 160 140 210 125" dur="3.6s" repeatCount="indefinite" />
      </path>

      <!-- Spine Wave Aura -->
      <ellipse cx="160" cy="130" rx="30" ry="15" fill="url(#glow-mobility)">
        <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="3.6s" repeatCount="indefinite" />
      </ellipse>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="138" height="24" rx="6" fill="rgba(52, 211, 153, 0.15)" stroke="rgba(52, 211, 153, 0.4)"/>
        <text x="69" y="16" fill="#34d399" font-size="10" font-weight="600" text-anchor="middle">⚡ Spinal Wave &amp; Hip Health</text>
      </g>
      <text x="160" y="205" fill="#94a3b8" font-size="10" text-anchor="middle">Inhale: Drop Belly · Exhale: Arch Spine</text>
    </svg>
  `,

  'Easy Walking': `
    <svg viewBox="0 0 320 220" class="exercise-diagram-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-walk" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="20" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Animated Steady Stride with Articulated Limbs -->
      <g>
        <circle cx="160" cy="50" r="10" fill="#f8fafc">
          <animate attributeName="cy" values="50; 47; 50" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <!-- Upright Posture Spine -->
        <line x1="160" y1="60" x2="160" y2="125" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

        <!-- Trail Leg (Thigh, Knee, Calf, Heel) -->
        <g opacity="0.7">
          <line x1="160" y1="125" x2="142" y2="155" stroke="#60a5fa" stroke-width="6" stroke-linecap="round">
            <animate attributeName="x2" values="142; 178; 142" dur="1.4s" repeatCount="indefinite" />
          </line>
          <line x1="142" y1="155" x2="132" y2="188" stroke="#60a5fa" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x1" values="142; 178; 142" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="132; 188; 132" dur="1.4s" repeatCount="indefinite" />
          </line>
          <line x1="132" y1="188" x2="122" y2="190" stroke="#60a5fa" stroke-width="4" stroke-linecap="round">
            <animate attributeName="x1" values="132; 188; 132" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="122; 202; 122" dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- Lead Leg (Thigh, Knee, Calf, Heel Strike) -->
        <g>
          <line x1="160" y1="125" x2="178" y2="155" stroke="#38bdf8" stroke-width="7" stroke-linecap="round">
            <animate attributeName="x2" values="178; 142; 178" dur="1.4s" repeatCount="indefinite" />
          </line>
          <line x1="178" y1="155" x2="188" y2="188" stroke="#38bdf8" stroke-width="6" stroke-linecap="round">
            <animate attributeName="x1" values="178; 142; 178" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="188; 132; 188" dur="1.4s" repeatCount="indefinite" />
          </line>
          <line x1="188" y1="188" x2="204" y2="190" stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x1" values="188; 132; 188" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="204; 122; 204" dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>

        <!-- Natural Arm Swing (Near & Far) -->
        <g opacity="0.7">
          <line x1="160" y1="75" x2="140" y2="115" stroke="#94a3b8" stroke-width="4" stroke-linecap="round">
            <animate attributeName="x2" values="140; 180; 140" dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>
        <g>
          <line x1="160" y1="75" x2="180" y2="115" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
            <animate attributeName="x2" values="180; 140; 180" dur="1.4s" repeatCount="indefinite" />
          </line>
        </g>
      </g>

      <!-- Badge -->
      <g transform="translate(14, 14)">
        <rect x="0" y="0" width="128" height="24" rx="6" fill="rgba(56, 189, 248, 0.14)" stroke="rgba(56, 189, 248, 0.35)"/>
        <text x="64" y="16" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">⚡ 8K–10K Daily Steps Base</text>
      </g>
      <text x="160" y="208" fill="#94a3b8" font-size="10" text-anchor="middle">Upright Posture · Nasal Breathing</text>
    </svg>
  `
};
