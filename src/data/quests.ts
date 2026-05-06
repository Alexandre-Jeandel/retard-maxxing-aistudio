// Top 20 RETARDMAXXING quests, distilled from src/data/skills.ts.
//
// Filter: every quest must hit at least one of the philosophy's core registers:
//   - fear-override (do the scary social thing)
//   - public embarrassment (be retarded in front of others, on purpose)
//   - action-before-thought (no planning, no rehearsal)
//   - anti-perfectionism (ship the dumb version)
//   - chaos tolerance (break a routine, embrace randomness)
//
// CUT (good but wrong philosophy): cold showers, wall sits, anti-snooze,
// digital fasts, meditation, "no complaints" — those are discipline / wellness,
// the opposite of retardmaxxing.
//
// Voice: lowercase, no em-dashes, single-action imperative, ends with a period.

export interface Quest {
  id: string;
  category: string;
  name: string;
  text: string;
}

export const QUESTS: Quest[] = [
  { id: 'social_leap',         category: 'social',     name: 'social leap',         text: 'say hi to someone you find attractive. don\'t plan it.' },
  { id: 'cold_outreach',       category: 'audacity',   name: 'cold outreach',       text: 'send one cold message to someone you admire. one paragraph max.' },
  { id: 'crazy_pitch',         category: 'audacity',   name: 'crazy pitch',         text: 'pitch a friend an absurd idea with total seriousness. defend it.' },
  { id: 'public_dancer',       category: 'audacity',   name: 'public dancer',       text: 'dance slightly in public. waiting for the bus counts.' },
  { id: 'the_inquirer',        category: 'audacity',   name: 'the inquirer',        text: 'ask one person a question you\'re actually scared to ask.' },
  { id: 'yes_man_day',         category: 'chaos',      name: 'yes man day',         text: 'no \'no\' for the next 6 hours. only \'yes, and...\'.' },
  { id: 'walking_bard',        category: 'social',     name: 'walking bard',        text: 'hum out loud while walking in public for 60 seconds.' },
  { id: 'public_embarrassment', category: 'social',    name: 'public embarrassment', text: 'burp in a public place and say sorry with confidence.' },
  { id: 'unfiltered',          category: 'audacity',   name: 'unfiltered',          text: 'say the thing you\'d normally swallow. respectfully. once.' },
  { id: 'peacocking',          category: 'audacity',   name: 'peacocking',          text: 'wear something slightly outrageous today.' },
  { id: 'the_haggler',         category: 'audacity',   name: 'the haggler',         text: 'negotiate a non-negotiable price. just try.' },
  { id: 'idea_machine',        category: 'intellect',  name: 'idea machine',        text: 'write 10 ideas. any 10. they can be terrible.' },
  { id: 'compliment_sniper',   category: 'social',     name: 'compliment sniper',   text: 'give one genuine compliment to a stranger today.' },
  { id: 'the_negotiator',      category: 'social',     name: 'the negotiator',      text: 'ask for 10% off your next coffee. say nothing else.' },
  { id: 'jesters_gambit',      category: 'social',     name: "jester's gambit",     text: 'tell a bad joke to a stranger. enjoy the silence after.' },
  { id: 'mismatched',          category: 'chaos',      name: 'mismatched',          text: 'wear two different socks today.' },
  { id: 'random_destination',  category: 'chaos',      name: 'random destination',  text: 'visit one place you\'ve never been today.' },
  { id: 'menu_roulette',       category: 'chaos',      name: 'menu roulette',       text: 'order something random off a menu. don\'t research it.' },
  { id: 'eye_contact',         category: 'social',     name: 'eye contact',         text: 'hold eye contact with one stranger for 3 seconds. nod.' },
  { id: 'routine_breaker',     category: 'chaos',      name: 'routine breaker',     text: 'break one habit just for the day. comfort is death.' },
];
