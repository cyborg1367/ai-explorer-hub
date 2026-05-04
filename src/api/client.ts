// ============================================================================
// Mock API client — mirrors the future FastAPI surface defined in endpoints.ts.
// Every call returns a Promise<ApiResult<T>> with a small simulated latency so
// that components can render real loading / error / empty states today.
//
// Swap-out plan: replace each function body with a `fetch()` against the
// matching endpoint in `API_ENDPOINTS`. The shape of T is already pinned
// by `src/api/types.ts`, so component code does not need to change.
// ============================================================================

import {
  DEMO_CLASS,
  DEMO_STUDENTS,
  EARNED_SKILLS,
  EMPTY_CLASS,
  EXISTING_CLASS_CODES,
  GAMES,
  JOURNAL_ENTRIES,
  RECENT_ATTEMPTS,
  SKILL_CATEGORIES,
  SKILL_SCORES,
  TEACHER_CLASSES,
  type Student,
  type SkillCategory,
} from "@/lib/mock-data";
import type { ApiError, ApiResult } from "./types";

// ---- helpers ---------------------------------------------------------------

const DEFAULT_LATENCY = 320;

function delay<T>(value: T, ms = DEFAULT_LATENCY): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

function ok<T>(data: T): ApiResult<T> {
  return { ok: true, data };
}

function fail(error: ApiError): ApiResult<never> {
  return { ok: false, error };
}

// ---- shapes the UI consumes (mock-friendly subset of types.ts) -------------

export interface StudentDashboardVM {
  nickname: string;
  classCode: string;
  className: string;
  ageGroup: string;
  teacher: string;
  streakDays: number;
  totalScore: number;
  accuracy: number;
  activeGames: typeof GAMES;
  recentAttempts: typeof RECENT_ATTEMPTS;
  earnedCards: typeof EARNED_SKILLS;
}

export interface TeacherDashboardVM {
  teacherName: string;
  classes: Array<(typeof TEACHER_CLASSES)[number] | typeof EMPTY_CLASS>;
  totalStudents: number;
  totalAttempts: number;
  averageAccuracy: number;
  skillScores: Array<{ skill: SkillCategory; score: number }>;
}

export interface ClassDetailVM {
  classRoom: (typeof TEACHER_CLASSES)[number] | typeof EMPTY_CLASS;
  ageGroup: string;
  roster: Student[];
}

export interface StudentReportVM {
  student: Student;
  className: string;
  skillScores: Array<{ skill: SkillCategory; score: number }>;
  games: typeof GAMES;
  recentAttempts: typeof RECENT_ATTEMPTS;
  journalEntries: typeof JOURNAL_ENTRIES;
  parentSummary: string;
}

// ---- mock API surface ------------------------------------------------------

export const mockApi = {
  // POST /api/v1/auth/student-login
  studentLogin: async (input: { classCode: string; nickname: string }) => {
    await delay(null, 250);
    if (!/^AI-\d{4}$/.test(input.classCode)) {
      return fail({ code: "invalid_class_code", message: "Class code looks wrong. Ask your teacher.", field: "classCode" });
    }
    if (!input.nickname.trim()) {
      return fail({ code: "validation_error", message: "Pick a nickname so your teacher can recognise you.", field: "nickname" });
    }
    return ok({ token: "mock-student-token", nickname: input.nickname });
  },

  // GET /api/v1/student/dashboard
  getStudentDashboard: async (): Promise<ApiResult<StudentDashboardVM>> => {
    await delay(null);
    return ok({
      nickname: "Aria",
      classCode: DEMO_CLASS.code,
      className: DEMO_CLASS.name,
      ageGroup: DEMO_CLASS.ageGroup,
      teacher: DEMO_CLASS.teacher,
      streakDays: 4,
      totalScore: 320,
      accuracy: 0.86,
      activeGames: GAMES.filter((g) => !g.locked),
      recentAttempts: RECENT_ATTEMPTS,
      earnedCards: EARNED_SKILLS,
    });
  },

  // GET /api/v1/student/games
  getStudentGames: async () => {
    await delay(null);
    return ok(GAMES);
  },

  // GET /api/v1/student/journal
  getJournalEntries: async () => {
    await delay(null);
    return ok(JOURNAL_ENTRIES);
  },

  // GET /api/v1/teacher/dashboard
  getTeacherDashboard: async (): Promise<ApiResult<TeacherDashboardVM>> => {
    await delay(null);
    const classes = [...TEACHER_CLASSES, EMPTY_CLASS];
    const totalStudents = classes.reduce((s, c) => s + c.students, 0);
    const totalAttempts = classes.reduce((s, c) => s + c.attempts, 0);
    return ok({
      teacherName: "Ms. Parker",
      classes,
      totalStudents,
      totalAttempts,
      averageAccuracy: 0.78,
      skillScores: SKILL_CATEGORIES.map((skill) => ({ skill, score: SKILL_SCORES[skill] })),
    });
  },

  // GET /api/v1/teacher/classes/{classId}
  getClassDetail: async (classId: string): Promise<ApiResult<ClassDetailVM>> => {
    await delay(null);
    if (classId === "empty") {
      return ok({ classRoom: EMPTY_CLASS, ageGroup: "12–14", roster: [] });
    }
    const cls = TEACHER_CLASSES.find((c) => c.id === classId);
    if (!cls) return fail({ code: "not_found", message: "We could not find that class." });
    return ok({ classRoom: cls, ageGroup: DEMO_CLASS.ageGroup, roster: DEMO_STUDENTS });
  },

  // GET /api/v1/teacher/students/{studentId}/report
  getStudentReport: async (studentId: string): Promise<ApiResult<StudentReportVM>> => {
    await delay(null);
    const student = DEMO_STUDENTS.find((s) => s.id === studentId);
    if (!student) return fail({ code: "not_found", message: "Student report not found." });
    return ok({
      student,
      className: DEMO_CLASS.name,
      skillScores: SKILL_CATEGORIES.map((skill) => ({ skill, score: SKILL_SCORES[skill] })),
      games: GAMES.filter((g) => !g.locked),
      recentAttempts: RECENT_ATTEMPTS,
      journalEntries: JOURNAL_ENTRIES,
      parentSummary: `${student.nickname} is building strong critical thinking and fact-checking habits — noticing when AI sounds confident but is wrong, and asking clearer questions. Next focus: privacy awareness and fairness.`,
    });
  },

  // POST /api/v1/teacher/classes
  createClass: async (input: { name: string; ageGroup: string; code: string }) => {
    await delay(null, 600);
    if (!/^AI-\d{4}$/.test(input.code)) {
      return fail({ code: "validation_error", message: "Use the format AI-#### (e.g. AI-1020).", field: "code" });
    }
    if (EXISTING_CLASS_CODES.includes(input.code)) {
      return fail({ code: "duplicate_class_code", message: "This code is already used. Try regenerating it.", field: "code" });
    }
    if (input.name.trim().length < 3) {
      return fail({ code: "validation_error", message: "Class name needs at least 3 characters.", field: "name" });
    }
    return ok({ id: "new", ...input });
  },
};

export type MockApi = typeof mockApi;