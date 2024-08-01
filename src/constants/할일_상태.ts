// constants/status.ts
export const 할일_상태 = {
  보류: 'pending',
  진행중: 'in_progress',
  완료: 'completed',
} as const

export type T할일_상태 = (typeof 할일_상태)[keyof typeof 할일_상태]
