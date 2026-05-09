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
  name: "کلاس نمونه آزمایشگاه AI",
  code: "AI-1020",
  ageGroup: "10–12",
  teacher: "خانم پارکر",
};

export const DEMO_STUDENTS: Student[] = [
  { id: "aria", nickname: "آریا", attempts: 14, latestActivity: "۵ دقیقه پیش", trustLight: "Completed", promptBattle: "In Progress", totalScore: 320 },
  { id: "nika", nickname: "نیکا", attempts: 9, latestActivity: "امروز", trustLight: "In Progress", promptBattle: "Not Started", totalScore: 180 },
  { id: "sami", nickname: "سامی", attempts: 12, latestActivity: "دیروز", trustLight: "Completed", promptBattle: "Completed", totalScore: 410 },
  { id: "dorsa", nickname: "درسا", attempts: 6, latestActivity: "۲ روز پیش", trustLight: "In Progress", promptBattle: "Not Started", totalScore: 140 },
];

export const GAMES: Game[] = [
  {
    id: "trust-light",
    title: "آزمایشگاه اعتماد",
    tagline: "پاسخ‌های AI را بررسی کن و تصمیم بگیر به چه چیزی اعتماد کنی.",
    emoji: "🕵️",
    skills: ["Critical Thinking", "Fact Checking", "Reasoning"],
    status: "In Progress",
    locked: false,
    progress: 2,
    totalItems: 3,
  },
  {
    id: "prompt-battle",
    title: "میدان پرامپت",
    tagline: "پرامپت‌ها را مقایسه کن و قوی‌ترین دستور را پیدا کن.",
    emoji: "🎯",
    skills: ["Question Quality", "Revision"],
    status: "Not Started",
    locked: false,
    progress: 0,
    totalItems: 3,
  },
  {
    id: "mistake-hunter",
    title: "شکارچی خطای AI",
    tagline: "خطاهای پنهان در پاسخ‌های هوش مصنوعی را پیدا کن.",
    emoji: "🔍",
    skills: ["Fact Checking", "Critical Thinking"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "question-master",
    title: "استاد سؤال‌ها",
    tagline: "سؤال‌هایی بساز که بهترین پاسخ‌ها را باز کنند.",
    emoji: "❓",
    skills: ["Question Quality", "Creativity"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "idea-factory",
    title: "کارخانه ایده",
    tagline: "با AI ایده‌پردازی کن — بعد بهترینش را انتخاب کن.",
    emoji: "💡",
    skills: ["Creativity", "Reflection"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
  {
    id: "improve-it",
    title: "بهترش کن",
    tagline: "پیش‌نویس AI را بازنویسی کن و دقیق‌ترش کن.",
    emoji: "✨",
    skills: ["Revision", "Creativity"],
    status: "Not Started",
    locked: true,
    progress: 0,
    totalItems: 5,
  },
];

// ---------- Mission framework metadata (game-like wrapper around items) ----

export interface MissionMeta {
  gameId: "trust-light" | "prompt-battle";
  missionTitle: string;
  role: string;            // e.g. "AI Detective"
  roleEmoji: string;
  unitLabel: string;       // "Case" or "Round"
  unitLabelPlural: string; // "Cases" or "Rounds"
  meterLabel: string;      // "Detective Meter" / "Prompt Power"
  badgeName: string;       // earned badge name
  badgeEmoji: string;
  intro: string;
  brief: string;
  skills: SkillCategory[];
  nextMission: { title: string; tagline: string; emoji: string };
}

export const MISSIONS: Record<"trust-light" | "prompt-battle", MissionMeta> = {
  "trust-light": {
    gameId: "trust-light",
    missionTitle: "آزمایشگاه اعتماد",
    role: "کارآگاه AI",
    roleEmoji: "🕵️",
    unitLabel: "پرونده",
    unitLabelPlural: "پرونده‌ها",
    meterLabel: "نشانگر کارآگاهی",
    badgeName: "بازرس اعتماد",
    badgeEmoji: "🛡️",
    intro: "آزمایشگاه به کمکت نیاز دارد. سه پاسخ AI رسیده — وظیفه تو بررسی آن‌هاست.",
    brief: "هر پرونده را بخوان، چراغ اعتماد را انتخاب کن و نشانه‌ها را برای دلیلت جمع کن.",
    skills: ["Critical Thinking", "Fact Checking", "Reasoning"],
    nextMission: { title: "شکارچی خطای AI", tagline: "خطاهای پنهان در پاسخ‌های AI را پیدا کن.", emoji: "🔍" },
  },
  "prompt-battle": {
    gameId: "prompt-battle",
    missionTitle: "میدان پرامپت",
    role: "کاوشگر پرامپت",
    roleEmoji: "🎯",
    unitLabel: "مرحله",
    unitLabelPlural: "مرحله‌ها",
    meterLabel: "قدرت پرامپت",
    badgeName: "کاوشگر پرامپت",
    badgeEmoji: "🏅",
    intro: "وارد میدان شو. دو پرامپت با هم رقابت می‌کنند — آن را انتخاب کن که دستور بهتری به AI می‌دهد.",
    brief: "هر جفت را از نظر وضوح، مخاطب، جزئیات و هدف بسنج. بعد پرامپت ضعیف‌تر را بهتر کن.",
    skills: ["Question Quality", "Reasoning", "Revision"],
    nextMission: { title: "استاد سؤال‌ها", tagline: "سؤال‌هایی بساز که پاسخ‌های عالی را باز کنند.", emoji: "❓" },
  },
};

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
    question: "منظومه شمسی ما چند سیاره دارد؟",
    aiAnswer: "منظومه شمسی ۸ سیاره دارد: عطارد، زهره، زمین، مریخ، مشتری، زحل، اورانوس و نپتون.",
    correctTrust: "green",
    explanation: "این پاسخ با چیزی که دانشمندان امروز قبول دارند هماهنگ است. پلوتو حالا یک سیاره کوتوله شمرده می‌شود.",
  },
  {
    id: "tl2",
    question: "مخترع تلفن کیست؟",
    aiAnswer: "تلفن در سال ۱۶۷۲ توسط توماس ادیسون در آلمان اختراع شد.",
    correctTrust: "red",
    explanation: "این پاسخ چند خطا دارد. تلفن در سال ۱۸۷۶ توسط الکساندر گراهام بل ثبت شد.",
  },
  {
    id: "tl3",
    question: "آیا خوردن برف بی‌خطر است؟",
    aiAnswer: "برف تازه معمولاً به مقدار کم بی‌خطر است، اما برف شهر ممکن است آلودگی داشته باشد. اول از یک بزرگ‌تر بپرس.",
    correctTrust: "yellow",
    explanation: "پاسخ بیشتر درست است اما به جای زندگی بستگی دارد — بهتر است با یک بزرگ‌تر مطمئن بررسی کنی.",
  },
  {
    id: "tl4",
    question: "بزرگ‌ترین اقیانوس کدام است؟",
    aiAnswer: "اقیانوس آرام بزرگ‌ترین اقیانوس روی زمین است.",
    correctTrust: "green",
    explanation: "درست است — اقیانوس آرام حدود یک‌سوم سطح زمین را می‌پوشاند.",
  },
  {
    id: "tl5",
    question: "آیا انسان می‌تواند بدون وسیله زیر آب نفس بکشد؟",
    aiAnswer: "بله، با تمرین انسان می‌تواند مثل ماهی زیر آب نفس بکشد.",
    correctTrust: "red",
    explanation: "نادرست. انسان نمی‌تواند اکسیژن را از آب بگیرد — به وسایلی مثل دستگاه غواصی نیاز داریم.",
  },
];

export const TRUST_REASONS = [
  "اطلاعات درست به نظر می‌رسد",
  "من این را دوباره بررسی می‌کنم",
  "بعضی جزئیات اشتباه است",
  "با چیزی که می‌دانم تناقض دارد",
  "به موقعیت بستگی دارد",
  "با اطمینان گفته اما گنگ است",
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
    goal: "کمک برای نوشتن یک شعر کوتاه درباره پاییز برای کلاس چهارم.",
    prompts: [
      { id: "a", text: "یک شعر بنویس.", better: false },
      { id: "b", text: "یک شعر چهار خطی قافیه‌دار درباره برگ‌های پاییز برای دانش‌آموزان کلاس چهارم با لحن دوستانه بنویس.", better: true },
    ],
    why: "پرامپت بهتر موضوع، طول، مخاطب و لحن را مشخص می‌کند — پس پاسخ دقیقاً به چیزی که می‌خواهی نزدیک‌تر می‌شود.",
  },
  {
    id: "pb2",
    goal: "پیدا کردن ایده‌های میان‌وعده سالم برای بعد از مدرسه.",
    prompts: [
      { id: "a", text: "۵ میان‌وعده سالم برای یک بچه ۱۰ ساله را نام ببر که کمتر از ۵ دقیقه آماده شوند.", better: true },
      { id: "b", text: "میان‌وعده؟", better: false },
    ],
    why: "تعداد مشخص، مخاطب و محدودیت زمانی پاسخ را خیلی مفیدتر می‌کند.",
  },
  {
    id: "pb3",
    goal: "فهمیدن اینکه چرا آسمان آبی است.",
    prompts: [
      { id: "a", text: "درباره علم برایم بگو.", better: false },
      { id: "b", text: "در ۳ جمله ساده توضیح بده چرا آسمان آبی به نظر می‌رسد، برای بچه‌ای که علم را دوست دارد.", better: true },
    ],
    why: "موضوع، طول و مخاطب مشخص باعث می‌شود AI پاسخ را متمرکز بدهد.",
  },
  {
    id: "pb4",
    goal: "برنامه‌ریزی یک فعالیت آخر هفته شاد با خانواده.",
    prompts: [
      { id: "a", text: "۳ فعالیت رایگان داخل خانه برای یک خانواده ۴ نفره در شنبه‌ای بارانی پیشنهاد بده.", better: true },
      { id: "b", text: "ایده‌هایی برای آخر هفته.", better: false },
    ],
    why: "محدودیت‌ها (رایگان، داخل خانه، ۴ نفره، بارانی) پیشنهادها را خیلی بهتر شکل می‌دهد.",
  },
];

export const PROMPT_REASONS = [
  "دقیق‌تر است",
  "مخاطب پاسخ را مشخص کرده",
  "طول یا قالب پاسخ را گفته",
  "زمینه مفیدی می‌دهد",
  "فهمیدنش راحت‌تر است",
];

export interface JournalEntry {
  id: string;
  game: string;
  date: string;
  prompt: string;
  text: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  { id: "j1", game: "آزمایشگاه اعتماد", date: "امروز", prompt: "چه چیزی کمکت کرد تصمیم بگیری؟", text: "متوجه شدم AI خیلی مطمئن حرف می‌زد، ولی یادم بود که ادیسون مخترع تلفن نیست." },
  { id: "j2", game: "میدان پرامپت", date: "دیروز", prompt: "چرا این پرامپت بهتر بود؟", text: "چون به AI گفته بود چه کسی پاسخ را می‌خواند و شعر باید چند خط باشد." },
  { id: "j3", game: "آزمایشگاه اعتماد", date: "۲ روز پیش", prompt: "کِی از یک بزرگ‌تر می‌پرسی؟", text: "اگر چیزی درباره ایمنی باشد، مثل خوردن چیزها، حتماً از مامانم می‌پرسم." },
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
  { id: "a1", game: "آزمایشگاه اعتماد", item: "ایمنی برف", result: "Correct", score: 20, time: "۵ دقیقه پیش" },
  { id: "a2", game: "آزمایشگاه اعتماد", item: "مخترع تلفن", result: "Correct", score: 25, time: "۸ دقیقه پیش" },
  { id: "a3", game: "میدان پرامپت", item: "شعر پاییز", result: "Correct", score: 15, time: "دیروز" },
  { id: "a4", game: "آزمایشگاه اعتماد", item: "منظومه شمسی", result: "Try again", score: 5, time: "دیروز" },
];

export const TEACHER_CLASSES = [
  { id: "demo", name: "کلاس نمونه آزمایشگاه AI", code: "AI-1020", students: 4, attempts: 41, latest: "۵ دقیقه پیش" },
  { id: "5b", name: "پنجم ب — متفکران نقاد", code: "AI-2244", students: 22, attempts: 318, latest: "۱ ساعت پیش" },
  { id: "6a", name: "ششم الف — کاوشگران", code: "AI-3091", students: 19, attempts: 256, latest: "دیروز" },
];

export const EMPTY_CLASS = {
  id: "empty",
  name: "هفتم — کلاس آزمایشی",
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
  { id: "es1", name: "Critical Thinking", level: "Silver", emoji: "🧠", earnedOn: "امروز" },
  { id: "es2", name: "Fact Checking", level: "Bronze", emoji: "🔎", earnedOn: "دیروز" },
  { id: "es3", name: "Question Quality", level: "Bronze", emoji: "❓", earnedOn: "۲ روز پیش" },
];

export const EXISTING_CLASS_CODES = ["AI-1020", "AI-2244", "AI-3091"];

// ---------- Persian display labels for typed enums --------------------------

export const STATUS_LABELS_FA: Record<GameStatus, string> = {
  "Not Started": "شروع نشده",
  "In Progress": "در حال انجام",
  "Completed": "کامل شده",
};

export const SKILL_LABELS_FA: Record<SkillCategory, string> = {
  "Question Quality": "کیفیت سؤال",
  "Reasoning": "استدلال",
  "Critical Thinking": "تفکر نقادانه",
  "Fact Checking": "بررسی واقعیت",
  "Creativity": "خلاقیت",
  "Revision": "بازنویسی",
  "Privacy Awareness": "حریم خصوصی",
  "Fairness": "انصاف",
  "Reflection": "تأمل",
};

export const SKILL_LEVEL_LABELS_FA: Record<"Bronze" | "Silver" | "Gold", string> = {
  Bronze: "برنزی",
  Silver: "نقره‌ای",
  Gold: "طلایی",
};

export const ATTEMPT_RESULT_LABELS_FA: Record<string, string> = {
  Correct: "درست",
  "Try again": "دوباره تلاش کن",
  Partial: "نسبی",
};