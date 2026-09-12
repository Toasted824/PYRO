import { Link } from 'react-router-dom'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-stone-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.href ? (
              <Link to={it.href} className="hover:text-stone-700 underline underline-offset-4">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-stone-700">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
