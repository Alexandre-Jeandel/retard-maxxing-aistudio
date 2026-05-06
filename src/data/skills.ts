// Full skill catalog — raw archive of the 140-quest engine.
// Verbatim copy of the user's paste, lightly normalized for TypeScript validity.
// QUOTES + MATH_PROBLEMS reference the same arrays from the wider Kai project;
// stubbed here so this file compiles standalone.
//
// The page UI does NOT render this directly. It uses `quests.ts` (top-20 curated).
// This file exists for archival + future migration into the Kai app.

const QUOTES: Array<{ q: string; a: string }> = [];
const MATH_PROBLEMS: string[] = [];

export interface SkillCategory {
  id: string;
  name: string;
}

export interface SkillTaskDefinition {
  id: string;
  skillId: string;
  name: string;
  description: (level: number) => string;
}

export const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  ambidextrous: { id: 'ambidextrous', name: 'Ambidextrous' },
  physical_resilience: { id: 'physical_resilience', name: 'Physical Resilience' },
  social_courage: { id: 'social_courage', name: 'Social Courage' },
  mindfulness: { id: 'mindfulness', name: 'Mindfulness' },
  discipline: { id: 'discipline', name: 'Discipline' },
  agility: { id: 'agility', name: 'Agility' },
  minimalism: { id: 'minimalism', name: 'Minimalism' },
  creativity: { id: 'creativity', name: 'Creativity' },
  intellect: { id: 'intellect', name: 'Intellect' },
  kindness: { id: 'kindness', name: 'Kindness' },
  focus: { id: 'focus', name: 'Focus' },
  endurance: { id: 'endurance', name: 'Endurance' },
  chaos_tolerance: { id: 'chaos_tolerance', name: 'Chaos Tolerance' },
  adaptability: { id: 'adaptability', name: 'Adaptability' },
  precision: { id: 'precision', name: 'Precision' },
  vitality: { id: 'vitality', name: 'Vitality' },
  presence: { id: 'presence', name: 'Presence' },
  audacity: { id: 'audacity', name: 'Audacity' },
  restraint: { id: 'restraint', name: 'Restraint' },
  recovery: { id: 'recovery', name: 'Recovery' }
};

export const SKILL_TASKS: SkillTaskDefinition[] = [
  // Ambidextrous
  { id: 'ambi_teeth', skillId: 'ambidextrous', name: 'Off-Hand Brushing', description: (lvl) => `Brush your teeth with your non-dominant hand for ${lvl} minute(s).` },
  { id: 'ambi_phone', skillId: 'ambidextrous', name: 'Off-Hand Operator', description: (lvl) => `Use your phone entirely with your non-dominant hand for ${lvl * 15} minutes.` },
  { id: 'ambi_wipe', skillId: 'ambidextrous', name: 'Off-Hand Wiping', description: () => `Wipe yourself with your non-dominant hand today.` },
  { id: 'ambi_eat', skillId: 'ambidextrous', name: 'Off-Hand Eating', description: () => `Eat your next meal using only your non-dominant hand.` },
  { id: 'ambi_write', skillId: 'ambidextrous', name: 'Off-Hand Writing', description: (lvl) => `Write a paragraph of at least ${lvl * 2} sentences with your non-dominant hand.` },
  { id: 'ambi_doors', skillId: 'ambidextrous', name: 'Off-Hand Opener', description: (lvl) => `Open every door today with your non-dominant hand (aim for ${lvl * 2} doors).` },
  { id: 'ambi_throw', skillId: 'ambidextrous', name: 'Off-Hand Thrower', description: (lvl) => `Throw a ball or object at a target with your non-dominant hand ${lvl * 3} times.` },

  // Physical Resilience
  { id: 'phys_cold_shower', skillId: 'physical_resilience', name: 'Cold Awakening', description: (lvl) => `Take a cold shower for ${lvl * 15} seconds.` },
  { id: 'phys_cold_out', skillId: 'physical_resilience', name: 'Cold Exposure', description: () => "Turn the shower to freezing cold for the last 30 seconds." },
  { id: 'phys_floor_sleep', skillId: 'physical_resilience', name: 'Floor Sleeper', description: (lvl) => `Lie down on the floor and breath for ${lvl * 2} minutes.` },
  { id: 'phys_fasting', skillId: 'physical_resilience', name: 'Fasting', description: (lvl) => `Fast for ${6 + lvl} hours during the day.` },
  { id: 'phys_raw_veg', skillId: 'physical_resilience', name: 'Iron Stomach', description: () => "Eat a slice of lemon or something very sour without making a face." },
  { id: 'phys_wall_sit', skillId: 'physical_resilience', name: 'Wall Sitter', description: (lvl) => `Hold a wall sit for ${lvl * 15} seconds.` },
  { id: 'phys_dead_hang', skillId: 'physical_resilience', name: 'The Floor is Lava', description: () => "Squeeze your fists as hard as you can for 60 seconds." },

  // Social Courage
  { id: 'soc_hi_attractive', skillId: 'social_courage', name: 'Social Leap', description: (lvl) => `Say hi to someone you find attractive (don't be creepy) ${lvl} time(s).` },
  { id: 'soc_joke_stranger', skillId: 'social_courage', name: "Jester's Gambit", description: (lvl) => `Tell a joke to ${lvl} complete stranger(s).` },
  { id: 'soc_eye_contact', skillId: 'social_courage', name: 'Eye Contact', description: (lvl) => `Maintain eye contact with a stranger for ${lvl + 1} seconds.` },
  { id: 'soc_burp', skillId: 'social_courage', name: 'Public Embarrassment', description: (lvl) => lvl <= 5 ? "Burp in a public place and say sorry with confidence." : lvl <= 10 ? "Yawn loudly in a public place and stretch." : "Drop something harmless in public on purpose, pick it up while saying 'woops'." },
  { id: 'soc_discount', skillId: 'social_courage', name: 'The Negotiator', description: (lvl) => `Ask for a 10% discount on a coffee or small item ${lvl} time(s).` },
  { id: 'soc_compliment', skillId: 'social_courage', name: 'Compliment Sniper', description: (lvl) => `Give a genuine compliment to ${lvl} stranger(s).` },
  { id: 'soc_sing_walk', skillId: 'social_courage', name: 'Walking Bard', description: (lvl) => `Sing slightly out loud while walking in public for ${lvl} minute(s).` },

  // Mindfulness
  { id: 'mind_shower', skillId: 'mindfulness', name: 'Water Monk', description: (lvl) => `Meditate in the shower or bath for ${lvl * 2} minutes.` },
  { id: 'mind_breathing', skillId: 'mindfulness', name: 'Breath Focus', description: (lvl) => `Focus on your breathing ONLY for ${lvl * 2} minutes.` },
  { id: 'mind_appreciate', skillId: 'mindfulness', name: 'Beauty Seeker', description: (lvl) => `Take ${lvl * 2} minutes to appreciate something beautiful around you.` },
  { id: 'mind_watch', skillId: 'mindfulness', name: 'The Observer', description: (lvl) => `People watch for ${lvl * 1} minutes without judging.` },
  { id: 'mind_eat', skillId: 'mindfulness', name: 'Stoic Eater', description: () => `Eat your next meal with zero distractions (no phone/tv).` },
  { id: 'mind_barefoot', skillId: 'mindfulness', name: 'Grounding', description: (lvl) => `Walk barefoot outside for at least ${lvl * 1} minutes.` },
  { id: 'mind_scan', skillId: 'mindfulness', name: 'Body Scan', description: (lvl) => `Do a full body scan meditation for ${lvl * 2} minutes.` },

  // Discipline
  { id: 'disc_suit_up', skillId: 'discipline', name: 'Suit Up', description: (lvl) => `Suit up today (dress your absolute best), no excuses, for ${lvl * 1} hours.` },
  { id: 'disc_bed', skillId: 'discipline', name: 'First Victory', description: () => "Do 10 pushups immediately as your feet touch the floor after waking up tomorrow." },
  { id: 'disc_no_snooze', skillId: 'discipline', name: 'Anti-Snooze', description: () => "Tomorrow morning, wake up on the first alarm with NO snooze." },
  { id: 'disc_hard_first', skillId: 'discipline', name: 'Eat the Frog', description: () => "Find one small task you've been procrastinating on and do it right now." },
  { id: 'disc_clean', skillId: 'discipline', name: 'The Cleaner', description: () => "Spend 5 minutes cleaning your workspace right now." },
  { id: 'disc_posture', skillId: 'discipline', name: 'Posture Check', description: (lvl) => `Correct your position (sit/stand better, shoulders relaxed, back straight) for ${lvl * 10} minutes.` },
  { id: 'disc_water', skillId: 'discipline', name: 'Hydration Strike', description: () => "Drink a large glass of water immediately upon waking up tomorrow." },

  // Agility
  { id: 'agi_stairs', skillId: 'agility', name: 'Stair Master', description: () => "Take the stairs instead of the elevator/escalator today." },
  { id: 'agi_lava', skillId: 'agility', name: 'World is Lava', description: () => `When by yourself, instead of walking to somewhere, RUN there.` },
  { id: 'agi_acrobat', skillId: 'agility', name: 'The Acrobat', description: (lvl) => `Do ${lvl * 2} somersault(s) or cartwheel(s).` },
  { id: 'agi_shadow', skillId: 'agility', name: 'Shadow Boxer', description: (lvl) => `At anytime during the day you feel like to move just throw ${lvl * 10} punches in the air.` },
  { id: 'agi_jump', skillId: 'agility', name: 'Obstacle Jumper', description: (lvl) => `Jump over ${lvl * 1} small obstacles while walking today.` },
  { id: 'agi_balance', skillId: 'agility', name: 'Flamingo', description: () => `Balance on one leg while brushing your teeth` },
  { id: 'agi_backwards', skillId: 'agility', name: 'Reverse Gear', description: (lvl) => `Walk backwards safely for ${lvl * 1} minutes.` },

  // Minimalism
  { id: 'min_donate', skillId: 'minimalism', name: 'The Minimalist', description: () => `Throw away or donate an item you don't need. (Minimalist succeed by default)` },
  { id: 'min_digital_fast', skillId: 'minimalism', name: 'Digital Fast', description: (lvl) => `No phone for ${lvl} hour(s) after waking up.` },
  { id: 'min_detox', skillId: 'minimalism', name: 'Dopamine Detox', description: (lvl) => `No social media for ${lvl * 1} hours.` },
  { id: 'min_addiction', skillId: 'minimalism', name: 'One Less', description: () => `Take one less addiction today (one less coffee, cigarette, drink, cake).` },
  { id: 'min_apps', skillId: 'minimalism', name: 'App Purge', description: () => "Turn off all non-essential notifications on your phone for today." },
  { id: 'min_email', skillId: 'minimalism', name: 'Inbox Zero', description: () => "Unsubscribe from the next junk email you receive." },
  { id: 'min_outfit', skillId: 'minimalism', name: 'Uniform', description: () => "Wear a plain, logo-less shirt today." },

  // Creativity
  { id: 'crea_draw', skillId: 'creativity', name: 'The Creator', description: (lvl) => `Draw or create something physical for ${lvl * 2} minutes.` },
  { id: 'crea_poem', skillId: 'creativity', name: 'The Poet', description: (lvl) => `Write a poem about your day with at least ${lvl * 2} lines.` },
  { id: 'crea_cook', skillId: 'creativity', name: 'The Chef', description: (lvl) => `Cook a meal from scratch using at least ${lvl + 0} fresh ingredients.` },
  { id: 'crea_route', skillId: 'creativity', name: 'The Explorer', description: () => `Take a different route home or to work.` },
  { id: 'crea_music', skillId: 'creativity', name: 'The Musician', description: () => `Listen to a genre of music you never listen to.` },
  { id: 'crea_word', skillId: 'creativity', name: 'Neologism', description: (lvl) => `Invent a new word and use it in conversation ${lvl} time(s).` },
  { id: 'crea_photo', skillId: 'creativity', name: 'Mundane Memory', description: () => `Take a photo of something.` },

  // Intellect
  { id: 'int_read', skillId: 'intellect', name: 'Bookworm', description: (lvl) => `Read ${lvl * 1} pages of a physical book and talk about it with someone` },
  { id: 'int_teach', skillId: 'intellect', name: 'The Teacher', description: () => `Explain a complex topic to someone or yourself out loud` },
  { id: 'int_language', skillId: 'intellect', name: 'The Polyglot', description: (lvl) => `Learn ${lvl * 1} words in a new language.` },
  { id: 'int_strategy', skillId: 'intellect', name: 'The Strategist', description: (lvl) => { const puzzles = ['Solve a Sudoku.', 'Play a quick game of Chess.', 'Solve a small riddle.', 'Play Minesweeper.']; return puzzles[Math.min(lvl - 1, puzzles.length - 1)] || 'Solve a small riddle.'; } },
  { id: 'int_memorize', skillId: 'intellect', name: 'The Scholar', description: (lvl) => { const idx = Math.min(lvl - 1, QUOTES.length - 1); const entry = QUOTES[idx]; return entry ? `Memorize this quote: "${entry.q}" - ${entry.a}` : 'Memorize a quote.'; } },
  { id: 'int_math', skillId: 'intellect', name: 'Mental Math', description: (lvl) => { const idx = Math.min(lvl - 1, MATH_PROBLEMS.length - 1); const entry = MATH_PROBLEMS[idx]; return entry ? `Solve this in your head: ${entry}` : 'Solve a math problem in your head.'; } },
  { id: 'int_ideas', skillId: 'intellect', name: 'Idea Machine', description: (lvl) => `Write down ${lvl} ideas about anything, go full crazy mode.` },

  // Kindness
  { id: 'kind_help', skillId: 'kindness', name: 'Silent Helper', description: () => `Offer your help to someone, without asking anything in return.` },
  { id: 'kind_friend', skillId: 'kindness', name: 'Ghost Recon', description: () => `Send a message to a friend you lost contact with.` },
  { id: 'kind_compliment', skillId: 'kindness', name: 'Day Maker', description: () => `Give a genuine compliment to someone.` },
  { id: 'kind_review', skillId: 'kindness', name: 'The Reviewer', description: () => `Leave a positive review for a local business.` },
  { id: 'kind_charity', skillId: 'kindness', name: 'The Philanthropist', description: () => `Give a small amount or buy food to a person in need.` },
  { id: 'kind_trash', skillId: 'kindness', name: 'Earth Cleaner', description: (lvl) => `Pick up ${lvl * 1} pieces of trash on the street` },
  { id: 'kind_line', skillId: 'kindness', name: 'After You', description: () => `Take one minute to be grateful for being here, no matter how hard it is` },

  // Focus
  { id: 'foc_stare', skillId: 'focus', name: 'Laser Vision', description: (lvl) => `Stare at a single point on the wall for ${lvl * 1} minutes without looking away.` },
  { id: 'foc_read', skillId: 'focus', name: 'Unbroken Reading', description: () => "Watch a 10-minute educational video on 1x speed without looking away or skipping." },
  { id: 'foc_pomodoro', skillId: 'focus', name: 'Pomodoro Master', description: () => `Today, at any time you lose focus, close your eyes, breath, and get back when ready.` },
  { id: 'foc_album', skillId: 'focus', name: 'Deep Listening', description: () => `Just listen. Listen to the world around you for 5 minutes, anywhere, anytime.` },
  { id: 'foc_count', skillId: 'focus', name: 'Mental Metronome', description: () => "Count backwards from 100 by 7s out loud as fast as you can." },
  { id: 'foc_balance', skillId: 'focus', name: 'Object Balancer', description: (lvl) => `Balance an object on your finger for ${lvl * 5} seconds.` },
  { id: 'foc_trace', skillId: 'focus', name: 'Eye Tracer', description: (lvl) => `Follow precisely a complex pattern with your eyes for ${lvl} minute(s).` },

  // Endurance
  { id: 'end_walk', skillId: 'endurance', name: 'The Walker', description: () => "Take the longest possible route to your next destination today." },
  { id: 'end_pushups', skillId: 'endurance', name: 'Gravity Defier', description: (lvl) => `Do ${lvl * 2} pushups randomly during the day.` },
  { id: 'end_plank', skillId: 'endurance', name: 'Core of Iron', description: (lvl) => `Hold a plank for ${lvl * 5} seconds.` },
  { id: 'end_jog', skillId: 'endurance', name: 'Static Runner', description: (lvl) => `Jog in place for ${lvl * 30} seconds.` },
  { id: 'end_carry', skillId: 'endurance', name: 'Burden Bearer', description: (lvl) => `Lift something a little heavy ${lvl * 3} times in a row.` },
  { id: 'end_stand', skillId: 'endurance', name: 'The Sentinel', description: () => `Stand instead of sitting on public transit or while working.` },
  { id: 'end_knees', skillId: 'endurance', name: 'High Knees', description: (lvl) => `Do high knees for ${lvl} minute(s) straight.` },

  // Chaos Tolerance
  { id: 'cha_phone', skillId: 'chaos_tolerance', name: 'Risk Taker', description: (lvl) => `Throw your phone in the air and catch it ${lvl * 2} times over a soft surface.` },
  { id: 'cha_bus', skillId: 'chaos_tolerance', name: 'Random Destination', description: () => `Visit a new place, shop, market, anything new.` },
  { id: 'cha_yes', skillId: 'chaos_tolerance', name: 'Yes Man Day', description: () => `You can't say no today. Use 'yes and...'.` },
  { id: 'cha_menu', skillId: 'chaos_tolerance', name: 'Menu Roulette', description: () => `Order something completely random off a menu.` },
  { id: 'cha_rearrange', skillId: 'chaos_tolerance', name: 'Feng Shui', description: () => `Comfort is death. Rearrange one piece of furniture in your room.` },
  { id: 'cha_songs', skillId: 'chaos_tolerance', name: 'Audio Chaos', description: () => `Focus on one specific sounds, and try to make it disappear.` },
  { id: 'cha_socks', skillId: 'chaos_tolerance', name: 'Mismatched', description: (lvl) => { if (lvl <= 10) return "Wear 2 different socks today."; if (lvl <= 20) return "Exchange one sock during the day with one of your friends."; return "Exchange a sock with a stranger."; } },

  // Adaptability
  { id: 'ada_sport', skillId: 'adaptability', name: "Beginner's Mind", description: () => `Do something your inner child would do and you wouldn't.` },
  { id: 'ada_os', skillId: 'adaptability', name: 'Tech Switch', description: () => `Today, if you go out, leave your phone at home no matter what.` },
  { id: 'ada_write', skillId: 'adaptability', name: 'Ambidextrous Mind', description: () => `Write a short to-do list with your non-dominant hand.` },
  { id: 'ada_chopsticks', skillId: 'adaptability', name: 'Chopstick Master', description: () => `Eat a meal entirely with chopsticks (or a non-standard utensil).` },
  { id: 'ada_sleep', skillId: 'adaptability', name: 'Bed Flipper', description: () => `Sleep on the opposite side of the bed or opposite orientation.` },
  { id: 'ada_routine', skillId: 'adaptability', name: 'Routine Breaker', description: () => `Comfort is death. Just for the day, break a habit.` },
  { id: 'ada_gps', skillId: 'adaptability', name: 'Internal Compass', description: () => `Safety first: move around at home with your eyes close for few minutes.` },

  // Precision
  { id: 'pre_sniper', skillId: 'precision', name: 'Sniper', description: (lvl) => `Throw garbage into a bin from ${1 + lvl} meters away.` },
  { id: 'pre_type', skillId: 'precision', name: 'Perfect Typist', description: (lvl) => `Type a paragraph of ${lvl * 1} sentences without using the backspace key once.` },
  { id: 'pre_pour', skillId: 'precision', name: 'Steady Hand', description: () => `Pour water between two cups perfectly without spilling.` },
  { id: 'pre_fold', skillId: 'precision', name: 'Ninja Master', description: () => `After brushing, throw your toothbrush back to its exact place.` },
  { id: 'pre_box', skillId: 'precision', name: 'Boxing', description: (lvl) => `Push your pillow in the air ${lvl * 1} times in a row.` },
  { id: 'pre_panties', skillId: 'precision', name: 'Panties', description: () => `Jump into your pants.` },
  { id: 'pre_lines', skillId: 'precision', name: 'Tightrope Walker', description: () => `Walk exactly on the lines of the pavement all day.` },

  // Vitality
  { id: 'vit_warmup', skillId: 'vitality', name: 'Engine Starter', description: () => `Wake up your body during the day with a 5 minute warmup.` },
  { id: 'vit_sun', skillId: 'vitality', name: 'Sun Gazer', description: () => `Get morning sunlight for 5 minutes.` },
  { id: 'vit_stretch', skillId: 'vitality', name: 'Elasticity', description: (lvl) => `Touch your toes and hold for ${lvl * 5} seconds.` },
  { id: 'vit_green', skillId: 'vitality', name: 'Green Blood', description: () => "Eat a piece of raw fruit today." },
  { id: 'vit_burpees', skillId: 'vitality', name: 'Heart Starter', description: (lvl) => `Do ${lvl * 5} burpees.` },
  { id: 'vit_breathe', skillId: 'vitality', name: 'Deep Breath', description: () => `Today, take 10 deep breaths when stressed.` },
  { id: 'vit_massage', skillId: 'vitality', name: 'Self-Care', description: () => `At the end of the day give yourself a massage.` },

  // Presence
  { id: 'prs_nav', skillId: 'presence', name: 'Navigator', description: () => `Touch your body, your arms, your legs, remind yourself, you are here now.` },
  { id: 'prs_listen', skillId: 'presence', name: 'Deep Listener', description: () => `Listen to someone without interrupting or thinking of your response.` },
  { id: 'prs_54321', skillId: 'presence', name: '5-4-3-2-1', description: () => `Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.` },
  { id: 'prs_texture', skillId: 'presence', name: 'Tactile Focus', description: () => `Close your eyes and feel the texture of your clothes for a few minute(s).` },
  { id: 'prs_chew', skillId: 'presence', name: 'Mindful Chewing', description: () => `Today, eat very slowly, chewing at least 8 times per bite.` },
  { id: 'prs_monk', skillId: 'presence', name: 'The Monk', description: (lvl) => `Sit completely still doing absolutely nothing for ${lvl * 1} minutes.` },
  { id: 'prs_water', skillId: 'presence', name: 'Water Sensations', description: () => `Focus entirely on the sensation of water while washing your hands.` },

  // Audacity
  { id: 'aud_unfiltered', skillId: 'audacity', name: 'Unfiltered', description: () => `Say exactly what you think (respectfully) in a situation where you normally wouldn't.` },
  { id: 'aud_question', skillId: 'audacity', name: 'The Inquirer', description: () => `Ask a deep meaningful question to anyone you want.` },
  { id: 'aud_outrageous', skillId: 'audacity', name: 'Peacocking', description: () => `Wear something slightly outrageous or out of character.` },
  { id: 'aud_dance', skillId: 'audacity', name: 'Public Dancer', description: () => `Dance slightly in public (e.g., waiting for the bus).` },
  { id: 'aud_negotiate', skillId: 'audacity', name: 'The Haggler', description: () => `Negotiate a non-negotiable price (like at a retail store).` },
  { id: 'aud_pitch', skillId: 'audacity', name: 'Crazy Pitch', description: () => `Pitch a crazy, absurd idea to a friend with total seriousness.` },
  { id: 'aud_email', skillId: 'audacity', name: 'Cold Outreach', description: () => `Send a cold email/message to someone famous or highly successful.` },

  // Restraint
  { id: 'res_ego', skillId: 'restraint', name: 'Ego Restraint', description: () => `Restrain yourself from saying 'I told you so' or correcting someone.` },
  { id: 'res_but', skillId: 'restraint', name: 'No Buts', description: () => `Forbidden word 'but'. Find another way to speak. 'But' is prohibited.` },
  { id: 'res_silence', skillId: 'restraint', name: 'Silence is Golden', description: () => `Today, don't speak without thinking first.` },
  { id: 'res_complain', skillId: 'restraint', name: 'No Complaints', description: () => `Today, don't complain about anything.` },
  { id: 'res_80', skillId: 'restraint', name: 'Hara Hachi Bu', description: () => `Today, stop eating when you are 80% full.` },
  { id: 'res_delay', skillId: 'restraint', name: 'Delayed Gratification', description: () => `Wait 5 minutes before eating a treat or doing a desired activity.` },
  { id: 'res_line', skillId: 'restraint', name: 'Patient Waiter', description: () => `Today, you can't check your phone while waiting.` },

  // Recovery
  { id: 'rec_injury', skillId: 'recovery', name: 'Tactical Retreat', description: () => `Lie flat on the floor for a few minutes.` },
  { id: 'rec_nap', skillId: 'recovery', name: 'Power Nap', description: () => `Take a 20-minute nap.` },
  { id: 'rec_foam', skillId: 'recovery', name: 'Iron Roller', description: () => "Massage your neck and shoulders for 2 minutes." },
  { id: 'rec_bath', skillId: 'recovery', name: 'Epsom Soak', description: () => "Spend 5 minutes doing absolutely nothing. No phone, no music, just exist." },
  { id: 'rec_pmr', skillId: 'recovery', name: 'Muscle Relaxer', description: () => "Take 5 deep breaths, exhaling longer than you inhale." },
  { id: 'rec_sleep', skillId: 'recovery', name: 'Early to Bed', description: () => "Leave your phone in another room when you go to sleep tonight." },
  { id: 'rec_yoga', skillId: 'recovery', name: 'Gentle Flow', description: () => "Stretch your arms above your head reaching as high as you can for 30 seconds." },
];
