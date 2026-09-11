import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PhotoGallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(c => (c === 0 ? images.length - 1 : c - 1)), [images.length])
  const next = useCallback(() => setCurrent(c => (c === images.length - 1 ? 0 : c + 1)), [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next, images.length])

  if (images.length === 0) return null

  return (
    <div className="photo-gallery">
      <img src={images[current]} alt={`${name} photo ${current + 1}`} className="gallery-image" />
      {images.length > 1 && (
        <>
          <button className="gallery-btn gallery-prev" onClick={prev}><ChevronLeft size={20} /></button>
          <button className="gallery-btn gallery-next" onClick={next}><ChevronRight size={20} /></button>
          <div className="gallery-dots">
            {images.map((_, i) => (
              <button key={i} className={`gallery-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
