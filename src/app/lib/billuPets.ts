/**
 * Billu's pet script — what Arpit's hover buddy says while you pet the cat.
 *
 * A "streak" is pets with less than STREAK_GAP_MS between them. Lines escalate
 * with the streak (tier 8 is the "so lucky" moment), switch to speed lines when
 * you're petting fast, and go procedural past the scripted tiers so it never
 * runs dry. Session totals persist in sessionStorage so Billu remembers you.
 *
 * Edit the copy freely: `{n}` = streak count, `{r}` = pets per second,
 * `{s}` = your total pets this session.
 */

export const STREAK_GAP_MS = 2600; // pause longer than this and the streak resets
export const NUDGE_AFTER_MS = 1500; // mid-streak pause that triggers a "don't stop" line

// Streak tiers 1–20. Several variants per tier keep repeat visits fresh.
const TIERS: string[][] = [
  /* 1 */ ['He liked that. Do it again.', 'Purr. That one counted.', 'Oh, he felt that. Again?'],
  /* 2 */ ['Keep it going. He loves this.', 'Again! He’s into it.'],
  /* 3 */ ['The more, the better.', 'Three in a row. He’s leaning in.'],
  /* 4 */ ['Ooh, he’s pushing his head into your hand now.', 'Keep going, keep going.'],
  /* 5 */ ['Five pets. His tail just did the little curl.', 'Five! That’s a happy cat.'],
  /* 6 */ ['He’s purring loud enough to hear in Brooklyn.', 'The purr motor has started.'],
  /* 7 */ ['Don’t you dare stop now.', 'Seven. He’s closing his eyes.'],
  /* 8 */ ['Wow, he’s so lucky to get so much love.'],
  /* 9 */ ['He’s doing the slow blink. That’s cat for “I love you.”', 'Slow blink detected. You’re in.'],
  /* 10 */ ['Ten! You’re officially his favorite visitor.', 'Ten pets. You might be better at this than me.'],
  /* 11 */ ['He’s melting. Billu is a puddle now.', 'He just rolled over. That’s trust.'],
  /* 12 */ ['Honestly, I don’t pet him this much.', 'Twelve. I’m taking notes.'],
  /* 13 */ ['He’s kneading the air. Biscuits are being made.', 'Thirteen. He’s making biscuits.'],
  /* 14 */ ['Okay, you two have a thing now.', 'He’s telling everyone about you.'],
  /* 15 */ ['Fifteen pets. Should I give you two some privacy?', 'Fifteen! Should I leave you two alone?'],
  /* 16 */ ['He started a fan club. You’re president.', 'He’s writing your name in his diary.'],
  /* 17 */ ['Your hand might be tired. His head isn’t.', 'Seventeen. Still purring. Still going.'],
  /* 18 */ ['This is the most loved he’s felt all week.', 'He hasn’t purred like this since tuna night.'],
  /* 19 */ ['One more and you unlock something.', 'Nineteen. Don’t stop at nineteen.'],
  /* 20 */ ['Twenty! You’re now Billu’s best friend. Official.', 'Twenty. Best friend status: unlocked.'],
];

// Past the script: special milestones first, then rotating templates.
const MILESTONES: Record<number, string> = {
  25: 'Twenty-five. A quarter-century of pets.',
  30: 'Thirty! Okay, you have to see my case studies too.',
  40: 'Forty pets. He’s considering moving in with you.',
  50: 'Fifty. You’re a legend. He’ll never forget this.',
  69: 'Sixty-nine. Nice. He thinks so too.',
  75: 'Seventy-five. I should be paying you.',
  100: 'One hundred pets. I’m adding you to the credits.',
};

const BEYOND = [
  '{n} pets. He’s never leaving this website.',
  'Pet number {n}. He wants to know if you’re free this weekend.',
  '{n} in a row. At this point he’s your cat.',
  '{n}. Okay, I’m getting a little jealous.',
  'He’s purring at a frequency only dogs can hear.',
  '{n}! He’s going to sleep so well tonight.',
  'Still going? He respects the commitment.',
  '{n}. I’ve run out of things to say. He hasn’t run out of purrs.',
];

// When the pace is high (non-milestone pets only).
const FAST = [
  '{r} pets a second?! He’s vibrating.',
  'Easy, speed demon. He’s a cat, not a drum.',
  'Fast hands. He’s into it, though.',
  '{r} a second. That’s a purr storm.',
];

const NUDGE = [
  'Don’t stop now, he was just getting comfy.',
  'Wait, come back. He’s still looking at you.',
  'He’s nudging your hand. One more?',
];

const COMEBACK = [
  'You’re back! He was hoping you would be.',
  'Round two. He’s ready.',
  'Oh, he remembers you.',
];

const SESSION_KEY = 'billu-session-pets';
const FAST_RATE = 4; // pets/sec that counts as "fast"
const RATE_WINDOW_MS = 1200;

const pick = <T,>(arr: T[], avoid?: T): T => {
  if (arr.length === 1) return arr[0];
  let v = arr[Math.floor(Math.random() * arr.length)];
  if (v === avoid) v = arr[(arr.indexOf(v) + 1) % arr.length];
  return v;
};

const fill = (s: string, n: number, r: number, total: number) =>
  s.replace(/\{n\}/g, String(n)).replace(/\{r\}/g, String(r)).replace(/\{s\}/g, total.toLocaleString());

export function readSessionPets(): number {
  try {
    return Number(sessionStorage.getItem(SESSION_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeSessionPets(n: number) {
  try {
    sessionStorage.setItem(SESSION_KEY, String(n));
  } catch {
    /* private mode — Billu just forgets */
  }
}

export type PetBeat = { line: string; streak: number; perSecond: number };

export function createPetSession() {
  let streak = 0;
  let lastPetAt = 0;
  let lastStreakPeak = 0;
  let lastLine = '';
  let lastFastAt = -Infinity; // streak index of the last speed line
  let times: number[] = [];

  return {
    /** Register a pet and get the line Arpit should say. */
    pet(now = performance.now()): PetBeat {
      const gap = now - lastPetAt;
      const isComeback = streak > 0 && gap > STREAK_GAP_MS;
      if (gap > STREAK_GAP_MS) {
        lastStreakPeak = streak;
        streak = 0;
        times = [];
        lastFastAt = -Infinity;
      }
      streak += 1;
      lastPetAt = now;
      times = [...times.filter((t) => now - t < RATE_WINDOW_MS), now];
      const perSecond = Math.round((times.length / RATE_WINDOW_MS) * 1000);

      const total = readSessionPets() + 1;
      writeSessionPets(total);

      let line: string;
      const scripted = streak <= TIERS.length;
      const milestone = scripted ? [1, 2, 8, 10, 15, 20].includes(streak) : streak in MILESTONES;

      if (streak === 1 && isComeback && lastStreakPeak >= 3) {
        line = pick(COMEBACK, lastLine);
      } else if (!milestone && perSecond >= FAST_RATE && streak - lastFastAt >= 5) {
        lastFastAt = streak;
        line = pick(FAST, lastLine);
      } else if (scripted) {
        line = pick(TIERS[streak - 1], lastLine);
      } else if (milestone) {
        line = MILESTONES[streak];
      } else {
        line = pick(BEYOND, lastLine);
      }

      lastLine = line;
      return { line: fill(line, streak, perSecond, total), streak, perSecond };
    },

    /** Line for a mid-streak pause, or null if there's nothing worth nudging. */
    nudge(): string | null {
      if (streak < 3) return null;
      return pick(NUDGE, lastLine);
    },

    /** Called when the pointer leaves the cat. */
    reset() {
      lastStreakPeak = streak;
    },

    get streak() {
      return streak;
    },
  };
}

/** What Arpit says when you first hover the cat. */
export function idleLine(globalCount: number | null): string {
  const mine = readSessionPets();
  if (mine >= 8) return `Billu remembers you. You’ve given him **${mine.toLocaleString()} pets** today.`;
  if (globalCount === null) return 'You can pet my cat Billu.';
  return `You can pet my cat Billu. He’s already been pet **${globalCount.toLocaleString()} times**.`;
}
