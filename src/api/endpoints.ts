// ============================================================================
// Future FastAPI endpoint contract (not called yet).
// The mock client in `src/api/client.ts` mirrors these routes 1:1 so that
// swapping to a real `fetch()` against the FastAPI backend is mechanical.
// ============================================================================

export const API_ENDPOINTS = {
  auth: {
    studentLogin: "POST /api/v1/auth/student-login",
    teacherLogin: "POST /api/v1/auth/teacher-login",
    logout: "POST /api/v1/auth/logout",
    me: "GET /api/v1/auth/me",
  },
  student: {
    dashboard: "GET /api/v1/student/dashboard",
    games: "GET /api/v1/student/games",
    nextItem: "GET /api/v1/student/games/{gameSlug}/next",
    submitAttempt: "POST /api/v1/student/games/{gameSlug}/attempts",
    summary: "GET /api/v1/student/games/{gameSlug}/summary",
    journalList: "GET /api/v1/student/journal",
    journalCreate: "POST /api/v1/student/journal",
  },
  teacher: {
    dashboard: "GET /api/v1/teacher/dashboard",
    classes: "GET /api/v1/teacher/classes",
    createClass: "POST /api/v1/teacher/classes",
    classDetail: "GET /api/v1/teacher/classes/{classId}",
    studentReport: "GET /api/v1/teacher/students/{studentId}/report",
  },
} as const;
