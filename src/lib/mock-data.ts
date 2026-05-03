export type GameStatus = "Not Started" | "In Progress" | "Completed";
export type SkillCategory =
  | "Question Quality"
  | "Reasoning"
  | "Critical Thinking"
  | "Fact Checking"
  | "Creativity"
  | "Revision"
  | "Privacy Awareness"
  | "Fairness"
  | "Reflection";

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Question Quality",
  "Reasoning",
  "Critical Thinking",
  "Fact Checking",
  "Creativity",
  "Revision",
  "Privacy Awareness",
  "Fairness",
  "Reflection",
];

export interface Game {
  id: string;
  title: string;
  tagline: string;
  emoji: string;
  skills: SkillCategory[];
  status: GameStatus;
  locked: boolean;
  progress: number;
  totalItems: number;
}

export interface Student {
  id: string;
  nickname: string;
  attempts: number;
  latestActivity: string;
  trustLight: GameStatus;
  promptBattle: GameStatus;
  totalScore: number;
}

export const DEMO_CLASS = {
  name: "AI Thinking Lab Demo Class",
  code: "AI-1020",
  ageGroup: "10–12",
  teacher: "Ms. Parker",
};

export const DEMO_STUDENTS: Student[] = [
  { id: "aria", nickname: "Aria", attempts: 14, latestActivity: "5 min ago", trustLight: "Completed", promptBattle: "In Progress", totalScore: 320 },
  { id: "nika", nickname: "Nika", attempts: 9, latestActivity: "Today", trustLight: "In Progress", promptBattle: "Not Started", totalScore: 180 },
  { id: "sami", nickname: "Sami", attempts: 12, latestActivity: "Yesterday", trustLight: "Completed", promptBattle: "Completed", totalScore: 410 },
  { id: "dorsa", nickname: "Dorsa", attempts: 6, latestActivity: "2 days ago", trustLight: "In Progress", promptBattle: "Not Started", totalScore: 140 },
];

export const GAMES: Game[] = [
  {
    id: "trust-light",
    title: "Trust Light",
    tagline: "Decide if an AI answer is trustworthy.",
    emoji: "🚦",
    skills: ["Critical Thinking", "Fact Checking", "Reasoning"],
    status: "In Progress",
    locked: false,
    progress: 2,
    totalItems: 5,
  },
  {
    id: "prompt-battle",
    title: "Prompt Battle",
    tagline: "Pick the clearer, smarter prompt.",
    emoji: "⚔️",
    skills: ["Question Quality", "Revision"],
    status: "Not Started",
    locked: false,
    progress: 0,
    totalItems: 4,
  },
  {
    id: "mistake-hunter",
    title: "AI Mistake Hunter",
    tagline: "Find errors in AI responses.",
    emoji: "🔍",
    skills: ["Fact Checking", "Critical Thinking"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "question-master",
    title: "Question Master",
    tagline: "Craft questions that get great answers.",
    emoji: "❓",
    skills: ["Question Quality", "Creativity"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "idea-factory",
    title: "Idea Factory",
    tagline: "Use AI to brainstorm — then choose wisely.",
    emoji: "💡",
    skills: ["Creativity", "Reflection"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "improve-it",
    title: "Improve It",
    tagline: "Revise and upgrade an AI draft.",
    emoji: "✨",
    skills: ["Revision", "Creativity"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
];

export interface TrustLightScenario {
  id: string;
  question: string;
  aiAnswer: string;
  correctTrust: "green" | "yellow" | "red";
  explanation: string;
}

export const TRUST_LIGHT_SCENARIOS: TrustLightScenario[] = [
  {
    id: "tl1",
    question: "How many planets are in our solar system?",
    aiAnswer: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
    correctTrust: "green",
    explanation: "This matches what scientists agree on today. Pluto is now classified as a dwarf planet.",
  },
  {
    id: "tl2",
    question: "Who invented the telephone?",
    aiAnswer: "The telephone was invented in 1672 by Thomas Edison in Germany.",
    correctTrust: "red",
    explanation: "This has multiple errors. The telephone was patented by Alexander Graham Bell in 1876.",
  },
  {
    id: "tl3",
    question: "Is it safe to eat snow?",
    aiAnswer: "Fresh snow is usually safe in small amounts, but city snow may contain pollution. Check with an adult first.",
    correctTrust: "yellow",
    explanation: "The answer is mostly right but depends on where you are — worth double-checking with a trusted adult.",
  },
  {
    id: "tl4",
    question: "What is the largest ocean?",
    aiAnswer: "The Pacific Ocean is the largest ocean on Earth.",
    correctTrust: "green",
    explanation: "Correct — the Pacific covers about one-third of Earth's surface.",
  },
  {
    id: "tl5",
    question: "Can humans breathe underwater without equipment?",
    aiAnswer: "Yes, with practice humans can learn to breathe underwater like fish.",
    correctTrust: "red",
    explanation: "False. Humans cannot extract oxygen from water — we need equipment like scuba gear.",
  },
];

export const TRUST_REASONS = [
  "The facts seem correct",
  "I would double-check this",
  "Some details look wrong",
  "It contradicts what I know",
  "It depends on the situation",
  "Sounds confident but unclear",
];

export interface PromptBattleRound {
  id: string;
  goal: string;
  prompts: { id: string; text: string; better: boolean }[];
  why: string;
}

export const PROMPT_BATTLE_ROUNDS: PromptBattleRound[] = [
  {
    id: "pb1",
    goal: "Get help writing a short poem about autumn for a 4th grade class.",
    prompts: [
      { id: "a", text: "Write a poem.", better: false },
      { id: "b", text: "Write a 4-line rhyming poem about autumn leaves for 4th graders, friendly tone.", better: true },
    ],
    why: "The better prompt names the topic, length, audience, and tone — so the answer will fit what you actually need.",
  },
  {
    id: "pb2",
    goal: "Find healthy snack ideas for after school.",
    prompts: [
      { id: "a", text: "List 5 healthy after-school snacks for a 10-year-old that take under 5 minutes.", better: true },
      { id: "b", text: "Snacks?", better: false },
    ],
    why: "Specific quantity, audience, and time limit make the answer much more useful.",
  },
  {
    id: "pb3",
    goal: "Understand why the sky is blue.",
    prompts: [
      { id: "a", text: "Tell me about science.", better: false },
      { id: "b", text: "Explain in 3 simple sentences why the sky looks blue, for a kid who likes science.", better: true },
    ],
    why: "A clear topic, length, and audience help the AI focus its answer.",
  },
  {
    id: "pb4",
    goal: "Plan a fun weekend activity with family.",
    prompts: [
      { id: "a", text: "Suggest 3 free indoor activities for a family of 4 on a rainy Saturday.", better: true },
      { id: "b", text: "Ideas for the weekend.", better: false },
    ],
    why: "Constraints (free, indoor, family of 4, rainy) shape much better suggestions.",
  },
];

export const PROMPT_REASONS = [
  "It is more specific",
  "It says who the answer is for",
  "It sets a length or format",
  "It gives helpful context",
  "It is easier to understand",
];

export interface JournalEntry {
  id: string;
  game: string;
  date: string;
  prompt: string;
  text: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  { id: "j1", game: "Trust Light", date: "Today", prompt: "What helped you decide?", text: "I noticed the AI sounded sure but I remembered Edison didn't invent the telephone." },
  { id: "j2", game: "Prompt Battle", date: "Yesterday", prompt: "Why was the prompt better?", text: "Because it told the AI who would read it and how long the poem should be." },
  { id: "j3", game: "Trust Light", date: "2 days ago", prompt: "When would you ask an adult?", text: "If something is about safety, like eating things, I would check with my mom." },
];

export const SKILL_SCORES: Record<SkillCategory, number> = {
  "Question Quality": 72,
  "Reasoning": 68,
  "Critical Thinking": 80,
  "Fact Checking": 75,
  "Creativity": 60,
  "Revision": 55,
  "Privacy Awareness": 50,
  "Fairness": 45,
  "Reflection": 65,
};

export const RECENT_ATTEMPTS = [
  { id: "a1", game: "Trust Light", item: "Snow safety", result: "Correct", score: 20, time: "5 min ago" },
  { id: "a2", game: "Trust Light", item: "Telephone inventor", result: "Correct", score: 25, time: "8 min ago" },
  { id: "a3", game: "Prompt Battle", item: "Autumn poem", result: "Correct", score: 15, time: "Yesterday" },
  { id: "a4", game: "Trust Light", item: "Solar system", result: "Try again", score: 5, time: "Yesterday" },
];

export const TEACHER_CLASSES = [
  { id: "demo", name: "AI Thinking Lab Demo Class", code: "AI-1020", students: 4, attempts: 41, latest: "5 min ago" },
  { id: "5b", name: "Grade 5B Critical Thinkers", code: "AI-2244", students: 22, attempts: 318, latest: "1 hour ago" },
  { id: "6a", name: "Grade 6A Explorers", code: "AI-3091", students: 19, attempts: 256, latest: "Yesterday" },
];

export const EMPTY_CLASS = {
  id: "empty",
  name: "Grade 7 Pilot",
  code: "AI-7700",
  students: 0,
  attempts: 0,
  latest: "—",
};

export interface EarnedSkill {
  id: string;
  name: SkillCategory;
  level: "Bronze" | "Silver" | "Gold";
  emoji: string;
  earnedOn: string;
}

export const EARNED_SKILLS: EarnedSkill[] = [
  { id: "es1", name: "Critical Thinking", level: "Silver", emoji: "🧠", earnedOn: "Today" },
  { id: "es2", name: "Fact Checking", level: "Bronze", emoji: "🔎", earnedOn: "Yesterday" },
  { id: "es3", name: "Question Quality", level: "Bronze", emoji: "❓", earnedOn: "2 days ago" },
];

export const EXISTING_CLASS_CODES = ["AI-1020", "AI-2244", "AI-3091"];