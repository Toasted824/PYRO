import { useEffect, useState } from 'react'

let pushFn: ((msg: string, type?: 'success' | 'info') => void) | null = null
export function pushToast(msg: string, type: 'success' | 'info' = 'success') {
  pushFn?.(msg, type)
}

export function ToastHost() {
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: string }[]>([])
  useEffect(() => {
    pushFn = (msg, type = 'success') => {
      const id = Date.now() + Math.random()
      setToasts(t => [...t, { id, msg, type }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
    }
    return () => { pushFn = null }
  }, [])
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none" role="status" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`pointer-events-auto px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-2 animate-[in_0.3s_ease] ${t.type === 'success' ? 'bg-stone-900 text-white border-stone-800' : 'bg-white text-stone-900 border-stone-200'}`}>
          <span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${t.type === 'success' ? 'bg-[#16A34A] text-white' : 'bg-amber-100 text-amber-700'}`}>{t.type === 'success' ? '✓' : '!'}</span>
          {t.msg}
        </div>
      ))}
      <style>{`@keyframes in { from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }`}</style>
    </div>
  )
}
