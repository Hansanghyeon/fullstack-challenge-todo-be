// constants/status.ts
export const 상수_할일상태 = {
  보류: 'pending',
  진행중: 'in_progress',
  완료: 'completed',
} as const

export type T할일상태 = (typeof 상수_할일상태)[keyof typeof 상수_할일상태]
