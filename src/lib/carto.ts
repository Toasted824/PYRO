const key = import.meta.env.VITE_CARTO_API_KEY as string | undefined

export const cartoApiKey = key && key.trim().length > 0 ? key.trim() : undefined

export function cartoTileUrl(style: string = 'light_all'): string {
  const base = `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`
  return cartoApiKey ? `${base}?key=${encodeURIComponent(cartoApiKey)}` : base
}

export function cartoErrorTileUrl(style: string = 'light_all'): string {
  const url = cartoTileUrl(style)
  // replace tile placeholder with a concrete tile for error fallback; use 'a' subdomain explicitly
  return url.replace('{s}.', 'a.').replace('{z}/{x}/{y}{r}.png', '12/0/0.png')
}
