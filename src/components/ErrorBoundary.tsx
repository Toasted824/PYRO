import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#FFFBEB] grid place-items-center p-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 max-w-md text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 grid place-items-center mx-auto text-red-500 text-xl">!</div>
            <h1 className="mt-4 text-lg font-bold text-stone-900">Something went wrong</h1>
            <p className="mt-2 text-sm text-stone-600">The app hit an unexpected error. Try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="mt-4 bg-stone-900 hover:bg-black text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors">
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
