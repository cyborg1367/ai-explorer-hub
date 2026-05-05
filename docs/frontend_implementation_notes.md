# AI Thinking Lab — Frontend Implementation Notes

This iteration polished the prototype into a coherent, classroom-ready demo
that consumes the mock API layer everywhere and exposes complete UI states.
No real backend is connected.

## 1. Pages improved

| Page | What changed |
| --- | --- |
| `student.index.tsx` | Loads from `mockApi.getStudentDashboard()` with loading skeleton, error retry, and empty-state for "no attempts yet". Header stats (streak, score, accuracy) now come from the VM. |
| `student.games.tsx` | Loads from `mockApi.getStudentGames()`. Active and Coming-soon games are split into two clearly labeled sections, using `GameCard` and the new `LockedFeatureCard`. |
| `student.games.trust-light.tsx` | (already polished) — accessible labels for trust choices, helper tip, optional explanation, partial-credit logic. |
| `student.games.prompt-battle.tsx` | (already polished) — side-by-side prompt cards stack on tablet/mobile, optional improved-prompt input. |
| `student.feedback.tsx` | Tone-aware (success/partial/review) panel, skill chips, journal prompt, next-mission CTA. |
| `student.summary.tsx` | Completion screen with skill chips and clear next steps. |
| `student.journal.tsx` | Now submits via `mockApi.submitJournalEntry()` with loading, success, and validation-error states. Optimistic insert into "Past entries"; loading skeleton + empty state. |
| `teacher.index.tsx` | Loads from `mockApi.getTeacherDashboard()`. Teacher name, KPI cards, and skill summary all derived from the VM. |
| `teacher.class.$classId.tsx` | Loads from `mockApi.getClassDetail(classId)`. Adds a status filter (All / Not Started / In Progress / Completed) plus an empty-filter state, while preserving the empty-class onboarding state. |
| `teacher.create.tsx` | Real validation against `EXISTING_CLASS_CODES`, format check, loading + success states. |
| `teacher.student.$studentId.tsx` | Loads from `mockApi.getStudentReport(studentId)`. Empty states for "no attempts yet" and "no journal entries yet". Parent summary comes from the VM. |

## 2. Components created or refined

- **New:** `LockedFeatureCard` — quieter visual treatment for "coming soon" games.
- Existing reusables consumed across pages: `GameCard`, `StatusBadge`, `FeedbackPanel`, `EmptyState`, `LoadingState`, `ErrorState`, `KpiCard`, `RosterTable`, `JournalCard`, `FormField`, `ProgressCard`, `SkillCard`, `AppShell`, `TeacherSidebar`, `SiteHeader`.
- Shared loading/error pattern via the `useMockQuery` hook (`{ data, loading, error, refetch }`).

## 3. Mock API functions used

All page data flows through `src/api/client.ts`:

- `studentLogin` (login)
- `getStudentDashboard` (student dashboard)
- `getStudentGames` (game list)
- `getJournalEntries`, `submitJournalEntry` (journal) — `submitJournalEntry` is new this iteration
- `getTeacherDashboard` (teacher dashboard)
- `getClassDetail` (roster)
- `getStudentReport` (report)
- `createClass` (create-class form)

Trust Light and Prompt Battle still use the local mock arrays
(`TRUST_LIGHT_SCENARIOS`, `PROMPT_BATTLE_ROUNDS`) for in-game item flow; these
map cleanly to future `GET /games/{slug}/next` and
`POST /games/{slug}/attempts` calls — see `src/api/endpoints.ts`.

## 4. UI states implemented

Student
- Loading dashboard, loading games, loading journal
- "No attempts yet" empty state
- Locked / coming-soon game state
- Journal submission: validation error, saving, saved, optimistic display
- Game submission feedback: correct / partial / review

Teacher
- Loading dashboard, loading roster, loading report
- Empty class with no students (with code-share affordance)
- Roster filter that yields no matches → "no students match this filter" with reset
- Create class: format error, duplicate code error, loading, success
- Student report: no attempts, no journal entries
- Generic error state with retry on every queried page

## 5. Responsive notes

- Roster is wrapped in `overflow-x-auto` so it stays usable on tablet.
- Roster filter chips wrap below the heading on narrow widths.
- Prompt Battle prompt cards switch from `md:grid-cols-2` to a single column.
- Student dashboard hero collapses stats below the greeting on mobile.
- Teacher sidebar is hidden under `lg`; the `SiteHeader` shows on tablet/mobile.
- KPI grid: `sm:grid-cols-2 lg:grid-cols-4`.

## 6. Accessibility improvements

- Trust Light buttons carry text labels alongside color (Trust it / Check first / Don't trust) so meaning never depends on color alone.
- Form errors use `aria-invalid` and `role="alert"`-equivalent visible text.
- Loading skeletons set `role="status"` with `aria-label`.
- Focusable game cards use visible focus ring (`focus-visible:ring-2`).
- Roster filter uses `role="tablist"` / `aria-selected`.
- Status badges include both color and text.

## 7. Remaining frontend gaps

- Game item navigation still relies on local arrays; once `getNextGameItem` and `submitMockGameAttempt` round-trip to the API, paging should live in a small `useGameSession` hook.
- No persistent client store — refresh resets local state (acceptable for the demo).
- Keyboard navigation on the roster table is basic.
- Print/PDF export buttons on the student report are visual-only.
- Dark mode tokens exist but are not visually tuned.

## 8. What is needed before backend integration

1. Replace each `mockApi.*` body in `src/api/client.ts` with a `fetch()` against the matching URL in `src/api/endpoints.ts`.
2. Add a thin auth context that stores the JWT returned by `studentLogin` / `teacherLogin` and attaches it as `Authorization: Bearer …`.
3. Map FastAPI error responses to the existing `ApiError` discriminated union (`code`, `message`, `field`).
4. Promote in-game scenario fetching (`TRUST_LIGHT_SCENARIOS`, `PROMPT_BATTLE_ROUNDS`) to API calls.
5. Add a query-cache layer (e.g. TanStack Query) to replace `useMockQuery` while keeping the same `data / loading / error / refetch` contract.

## Assumptions and limitations

- All progress data is a static mock; "Continue" buttons restart from the first item.
- Teacher login accepts any input (UI mock).
- "Share with parents" / "Print PDF" are placeholders.
- Skill scores are a single shared mock across students.