// Hardcoded verdict LUT for the "stop thinking" widget on the landing page.
// Keyword-matched. Not an LLM. No API. Free.
//
// Voice: lowercase, brutal, ends with "now go." (or "now." for variety).
// Max 25 words.

interface Verdict {
  match: RegExp;
  lines: string[];
}

const VERDICTS: Verdict[] = [
  {
    match: /\b(send|message|text|dm|reply|email|reach\s*out)\b/i,
    lines: [
      'send the message. you already know what it says. now go.',
      'send it. the version in your head won\'t survive contact with reality. now go.',
      'press send. one tap. don\'t reread. now.',
    ],
  },
  {
    match: /\b(quit|leave|resign|fire|boss|notice)\b/i,
    lines: [
      'you\'ve been thinking about this for 18 months. you have your answer. now go.',
      'write the email tonight. send it tomorrow morning. don\'t draft a third version.',
      'staying costs more than leaving. you already know.',
    ],
  },
  {
    match: /\b(ship|launch|release|publish|deploy|push|live)\b/i,
    lines: [
      'ship it tonight. ugly is better than late. now go.',
      'launch the broken version. it teaches you more than the perfect one in your head.',
      'press deploy. fix in production. that\'s the job.',
    ],
  },
  {
    match: /\b(post|tweet|video|content|share|publish)\b/i,
    lines: [
      'post it. nobody reads as carefully as you wrote.',
      'post the worse version. the better one is a coping mechanism.',
      'publish before you reread. now go.',
    ],
  },
  {
    match: /\b(start|begin|company|business|startup|build|project)\b/i,
    lines: [
      'pick the dumbest version of the idea. ship it by friday.',
      'start before you\'re ready. ready is a feeling, not a stage.',
      'open a doc. write one paragraph. that\'s the start. now go.',
    ],
  },
  {
    match: /\b(ask|girl|guy|crush|date|coffee|out|hi)\b/i,
    lines: [
      'she\'s not thinking about you nearly as much as you are. ask. now.',
      'one sentence. no preamble. no apology. just the question. go.',
      'ask. the worst case is a no, which you already have.',
    ],
  },
  {
    match: /\b(scared|afraid|fear|nervous|anxious|worry)\b/i,
    lines: [
      'the only way out is through. now go.',
      'the fear is data. it points at exactly what you should do.',
      'do it scared. there\'s no other version available.',
    ],
  },
  {
    match: /\b(many|too\s*many|ideas|options|choice|pick)\b/i,
    lines: [
      'pick the dumbest one. ship it by friday. the others were fake.',
      'one. for two weeks. nothing else. now go.',
      'flip a coin. the answer you wanted is in your reaction.',
    ],
  },
  {
    match: /\b(stupid|look|judge|cringe|embarrass)\b/i,
    lines: [
      'you\'ll look more stupid not trying.',
      'nobody is watching as carefully as you think. now go.',
      'cringe is the cost of being interesting. pay it.',
    ],
  },
  {
    match: /\b(perfect|good|right|best|optimal)\b/i,
    lines: [
      'perfect is the killer. release the broken version.',
      'b- work shipped beats a+ work in a draft. now go.',
      'good enough is the only version that exists.',
    ],
  },
  {
    match: /\b(tomorrow|later|soon|monday|next\s*week|when)\b/i,
    lines: [
      'tomorrow is a lie you tell yourself. it\'s today or never.',
      'do five minutes of it now. that\'s the whole trick.',
      'the version of you that does it tomorrow does not exist.',
    ],
  },
  {
    match: /\b(plan|strategy|research|prepare|figure)\b/i,
    lines: [
      'stop planning. start. the plan was procrastination wearing a suit.',
      'you\'ve done enough research. you\'re hiding now. go.',
      'do the action. the plan will assemble itself in motion.',
    ],
  },
  {
    match: /\b(overthink|stuck|paralyzed|frozen|cant\s*decide|can'?t\s*decide)\b/i,
    lines: [
      'the answer is whichever option you can act on in the next hour.',
      'overthinking is just fear with better vocabulary. move.',
      'ten seconds of dumb action beats ten hours of smart paralysis.',
    ],
  },
  {
    match: /\b(gym|workout|run|train|exercise|fit)\b/i,
    lines: [
      'shoes on. walk out the door. negotiate with yourself there.',
      'do five minutes. you\'ll do the rest. you always do.',
      'the workout you don\'t feel like doing is the one that counts.',
    ],
  },
  {
    match: /\b(diet|eat|food|sugar|junk)\b/i,
    lines: [
      'eat the simpler thing. you already know which one.',
      'one meal. one decision. don\'t pre-negotiate the rest of the week.',
      'put it back. you\'ll feel cleaner in 20 minutes.',
    ],
  },
  {
    match: /\b(read|book|study|learn|course)\b/i,
    lines: [
      'you don\'t need another book. you need to apply the last one.',
      'read 5 pages. close it. do something with what you read.',
      'consumption is not preparation. ship something.',
    ],
  },
];

const FALLBACK_VERDICTS = [
  'do the dumb version. now go.',
  'whichever option you can act on in the next hour. that\'s the right one.',
  'stop reading verdicts. you already know.',
  'the smartest move is also the simplest one. you already see it.',
  'five minutes of action. then re-evaluate. now.',
  'the universe rewards motion, not analysis. move.',
];

export function getVerdict(input: string): string {
  const text = (input || '').trim();
  if (!text) return 'type a problem first.';

  for (const v of VERDICTS) {
    if (v.match.test(text)) {
      return v.lines[Math.floor(Math.random() * v.lines.length)];
    }
  }
  return FALLBACK_VERDICTS[Math.floor(Math.random() * FALLBACK_VERDICTS.length)];
}

export const SAMPLE_PROMPTS = [
  'should i send the message?',
  'should i quit my job?',
  'should i ship it tonight?',
  'i have too many ideas and do nothing.',
  'i\'m scared of looking stupid.',
  'i\'ve been planning this for 6 months.',
];
