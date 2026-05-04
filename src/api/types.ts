// ============================================================================
// AI Thinking Lab — Frontend Data Contract
// ----------------------------------------------------------------------------
// These TypeScript interfaces describe every payload the UI consumes today
// from the mock layer and will consume tomorrow from the FastAPI backend.
// Field names are chosen to map naturally to Pydantic models on the server.
// ============================================================================

// ---------- Shared primitives -------------------------------------------------

export type ISODateString = string; // e.g. "2026-05-04T10:12:33Z"
export type UUID = string;

export type Role = "student" | "teacher";

export type GameSlug =
  | "trust-light"
  | "prompt-battle"
  | "mistake-hunter"
  | "question-master"
  | "idea-factory"
  | "improve-it";

export type GameStatus = "not_started" | "in_progress" | "completed" | "locked";

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

export type AttemptResult = "correct" | "partial" | "incorrect" | "needs_review";

export type SkillLevel = "Bronze" | "Silver" | "Gold";

// ---------- Identity ----------------------------------------------------------

export interface User {
  id: UUID;
  role: Role;
  displayName: string;
  createdAt: ISODateString;
}

export interface Teacher extends User {
  role: "teacher";
  email: string;
  schoolName?: string;
}

export interface StudentProfile extends User {
  role: "student";
  nickname: string;
  ageGroup: string; // e.g. "10-12"
  classId: UUID;
}

// ---------- Classes -----------------------------------------------------------

export interface ClassRoom {
  id: UUID;
  name: string;
  code: string; // e.g. "AI-1020"
  ageGroup: string;
  teacherId: UUID;
  teacherName: string;
  createdAt: ISODateString;
  studentCount: number;
  totalAttempts: number;
  latestActivityAt: ISODateString | null;
}

export interface ClassMembership {
  id: UUID;
  classId: UUID;
  studentId: UUID;
  joinedAt: ISODateString;
}

// ---------- Games -------------------------------------------------------------

export interface Game {
  gameSlug: GameSlug;
  title: string;
  description: string;
  emoji: string;
  status: GameStatus;
  completedCount: number;
  totalCount: number;
  latestAttemptAt: ISODateString | null;
  totalScore: number;
  skillHighlights: SkillCategory[];
}

export interface GameProgress {
  gameSlug: GameSlug;
  status: GameStatus;
  completedCount: number;
  totalCount: number;
  totalScore: number;
  latestAttemptAt: ISODateString | null;
}

// ---------- Trust Light -------------------------------------------------------

export type TrustLevel = "green" | "yellow" | "red";

export interface TrustLightItem {
  id: UUID;
  scenario: string;
  aiAnswer: string;
  /** Internal/mock only — the backend never returns this to the client. */
  expectedTrustLevel: TrustLevel;
  reasonOptions: string[];
  skillWeights: Partial<Record<SkillCategory, number>>;
  /** Internal/mock — sent back as `feedbackMessage` after submitting. */
  explanation: string;
}

export interface TrustLightAttemptPayload {
  gameSlug: "trust-light";
  itemId: UUID;
  trustLevel: TrustLevel;
  selectedReasons: string[];
  explanation?: string;
}

// ---------- Prompt Battle -----------------------------------------------------

export interface PromptOption {
  id: string;
  text: string;
}

export interface PromptBattleItem {
  id: UUID;
  mission: string;
  prompts: PromptOption[];
  /** Internal/mock only. */
  bestPromptId: string;
  reasonOptions: string[];
  skillWeights: Partial<Record<SkillCategory, number>>;
  /** Internal/mock — returned as `feedbackMessage`. */
  explanation: string;
}

export interface PromptBattleAttemptPayload {
  gameSlug: "prompt-battle";
  itemId: UUID;
  selectedPromptId: string;
  selectedReasons: string[];
  improvedPrompt?: string;
}

export type GameAttemptPayload =
  | TrustLightAttemptPayload
  | PromptBattleAttemptPayload;

// ---------- Attempts, feedback, scoring --------------------------------------

export interface SkillScore {
  skill: SkillCategory;
  score: number; // 0-100 average
}

export interface SkillDelta {
  skill: SkillCategory;
  delta: number; // points earned in this attempt
}

export interface EarnedSkillCard {
  id: UUID;
  skill: SkillCategory;
  level: SkillLevel;
  emoji: string;
  earnedAt: ISODateString;
}

export type SafetyFlagKind =
  | "shared_personal_info"
  | "off_topic"
  | "inappropriate_language"
  | "needs_teacher_review";

export interface SafetyFlag {
  kind: SafetyFlagKind;
  message: string;
  severity: "info" | "warn" | "block";
}

export interface FeedbackResult {
  attemptId: UUID;
  gameSlug: GameSlug;
  itemId: UUID;
  result: AttemptResult;
  feedbackMessage: string;
  totalScore: number; // points earned this attempt
  maxScore: number; // max possible for this item
  skillScores: SkillDelta[];
  earnedCards: EarnedSkillCard[];
  safetyFlags: SafetyFlag[];
  nextItemId: UUID | null; // null when game is finished
}

export interface GameAttempt {
  id: UUID;
  gameSlug: GameSlug;
  itemId: UUID;
  itemLabel: string; // human-friendly e.g. "Snow safety"
  studentId: UUID;
  result: AttemptResult;
  score: number;
  createdAt: ISODateString;
}

// ---------- Journal -----------------------------------------------------------

export interface JournalEntry {
  id: UUID;
  studentId: UUID;
  gameSlug: GameSlug | null;
  gameTitle: string | null;
  prompt: string;
  text: string;
  createdAt: ISODateString;
}

export interface JournalEntryDraft {
  prompt: string;
  text: string;
  gameSlug?: GameSlug;
}

// ---------- Aggregate dashboards / reports -----------------------------------

export interface ClassSummary {
  classId: UUID;
  totalStudents: number;
  totalAttempts: number;
  averageAccuracy: number; // 0-1
  skillScores: SkillScore[];
  gameStatusBreakdown: Array<{
    gameSlug: GameSlug;
    title: string;
    notStarted: number;
    inProgress: number;
    completed: number;
  }>;
}

export interface RosterEntry {
  studentId: UUID;
  nickname: string;
  trustLightStatus: GameStatus;
  promptBattleStatus: GameStatus;
  totalAttempts: number;
  latestActivityAt: ISODateString | null;
  totalScore: number;
  reportUrl: string; // e.g. /teacher/student/{id}
}

export interface StudentDashboard {
  student: StudentProfile;
  classRoom: Pick<ClassRoom, "id" | "name" | "code" | "ageGroup" | "teacherName">;
  streakDays: number;
  totalScore: number;
  accuracy: number; // 0-1
  activeGames: Game[];
  recentAttempts: GameAttempt[];
  earnedCards: EarnedSkillCard[];
}

export interface TeacherDashboard {
  teacher: Teacher;
  classes: ClassRoom[];
  totalStudents: number;
  totalAttempts: number;
  latestActivityAt: ISODateString | null;
  classSkillSummary: SkillScore[];
  averageAccuracy: number;
}

export interface ClassDetail {
  classRoom: ClassRoom;
  roster: RosterEntry[];
  classSummary: ClassSummary;
}

export interface StudentReport {
  student: StudentProfile;
  classRoom: Pick<ClassRoom, "id" | "name" | "code">;
  gameProgress: GameProgress[];
  skillScores: SkillScore[];
  recentAttempts: GameAttempt[];
  journalEntries: JournalEntry[];
  parentFriendlySummary: string;
}

// ---------- Auth --------------------------------------------------------------

export interface StudentLoginPayload {
  classCode: string;
  nickname: string;
}

export interface TeacherLoginPayload {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string; // opaque, mocked
  expiresAt: ISODateString;
}

// ---------- API errors / async helpers ---------------------------------------

export type ApiErrorCode =
  | "invalid_class_code"
  | "duplicate_class_code"
  | "validation_error"
  | "not_found"
  | "unauthorized"
  | "rate_limited"
  | "server_error";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  field?: string;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
