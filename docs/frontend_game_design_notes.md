# Game Design Notes — Mission Framework

## From quizzes to missions
- **Trust Light → AI Detective: Trust Lab.** Students play an "AI Detective"
  who investigates 3 case files. Each case shows an AI answer and asks for
  a trust signal (Green / Yellow / Red), evidence chips, and optional
  detective notes. After submit, inline micro-feedback names the clues
  collected, awards Detective Meter points, and unlocks the next case.
- **Prompt Battle → Prompt Arena.** Students play a "Prompt Explorer" across
  3 rounds. Two prompts compete head-to-head with a VS divider; the player
  picks the stronger one, tags the criteria that make it stronger
  (clarity / audience / detail / style / goal), and can optionally upgrade
  the weaker prompt for bonus Prompt Power.

## Shared mission framework
`src/components/mission-shell.tsx` provides the consistent header for all
active games:
- Role pill (e.g. "Role: AI Detective")
- Mission title
- Step dots ("Case 2 of 3" / "Round 2 of 3")
- Meter bar (Detective Meter / Prompt Power)
- Back-to-games link

`src/components/micro-feedback.tsx` renders the post-submit panel:
- Tone-coded (correct / partial / review)
- Headline + explanation
- "Clues you spotted" chip list
- Points awarded toward the meter

Mission metadata lives in `MISSIONS` inside `src/lib/mock-data.ts`
(role, emoji, unit label, meter label, badge, suggested next mission, skills).

## Game mechanics used
- Multi-step in-page flow (no full-page reload between cases/rounds).
- Required-choice gating: submit button stays disabled until the player
  picks a signal/prompt **and** at least one piece of evidence.
- Inline micro-feedback that locks the inputs after submit.
- Visible meter that fills as the player progresses.
- Mission Report (`/student/summary`) with badge, accuracy, points, evidence
  count, and suggested next mission.

## Intentionally avoided
- Free-form AI chat or LLM calls.
- Speed pressure, streak shame, or timers.
- Inter-student leaderboards or social ranking.
- Combat / violence / gambling metaphors (the "battle" framing was replaced
  with an "arena" of compared prompts).
- Cartoonish styling — visuals stay clean and classroom-appropriate.

## Mapping to the future backend
The mission UI still consumes the same shapes from
`src/api/types.ts` and `src/api/client.ts`:
- Each "case" / "round" = one `GameAttempt` payload.
- Score, accuracy, evidence count = derived from the same attempt list.
- Badges and suggested-next-mission are presentation-only on the frontend
  and can later be served by `/games/{slug}/summary`.

## Future games that fit the same framework
- **AI Mistake Hunter** — role: Evidence Hunter; unit: Hunt; meter: Accuracy.
- **Question Master** — role: Reason Builder; unit: Quest; meter: Question Power.
- **Idea Factory** — role: Idea Investigator; unit: Spark; meter: Creativity.
- **Improve It** — role: Reviser; unit: Draft; meter: Revision Power.