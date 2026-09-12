import type { DonationStatus } from '../../lib/types'

const STEPS: DonationStatus[] = ['AVAILABLE', 'CLAIMED', 'PICKED_UP']
const LABELS: Record<DonationStatus, string> = {
  AVAILABLE: 'Available',
  CLAIMED: 'Claimed',
  PICKED_UP: 'Picked up',
}

export function StatusStepper({ status, compact }: { status: DonationStatus; compact?: boolean }) {
  const idx = STEPS.indexOf(status)
  return (
    <div className={`flex items-center gap-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
      {STEPS.map((s, i) => {
        const active = i <= idx
        const isCurrent = i === idx
        return (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full grid place-items-center text-[11px] font-bold border-2 transition-all duration-300 ${active ? 'bg-leaf border-leaf text-white shadow' : 'bg-white border-stone-200 text-stone-400'} ${isCurrent ? 'ring-2 ring-leaf/25 scale-[1.04]' : ''}`}>
                {i < idx ? '✓' : i + 1}
              </div>
              <span className={`${active ? 'text-stone-900 font-semibold' : 'text-stone-400'} ${compact ? 'text-[10px]' : ''} text-center leading-none transition-colors duration-200`}>{LABELS[s]}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-[2px] flex-1 -mt-4 rounded transition-colors duration-300 ${i < idx ? 'bg-leaf' : 'bg-stone-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
