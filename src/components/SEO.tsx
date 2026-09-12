import { useEffect } from 'react'

type SEOProps = {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
  noIndex?: boolean
}

const SITE_URL = 'https://foodloop.org'
const DEFAULT_OG = `${SITE_URL}/og-image.svg`

export function SEO({ title, description, canonicalPath, ogImage, noIndex }: SEOProps) {
  const canonical = `${SITE_URL}${canonicalPath}`
  const image = ogImage || DEFAULT_OG

  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, value: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${selector}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, selector)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('twitter:card', 'summary_large_image', 'name')
    setMeta('twitter:title', title, 'name')
    setMeta('twitter:description', description, 'name')
    setMeta('twitter:image', image, 'name')

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (noIndex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, nofollow'
    } else if (robots) {
      robots.content = 'index, follow'
    }
  }, [title, description, canonical, image, noIndex])

  return null
}
