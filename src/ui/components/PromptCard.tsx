// The main card that shows the question you're supposed to answer.
import { useRef, useLayoutEffect } from 'react'
import type { Prompt } from '../../domain/types'

interface PromptCardProps {
  prompt: Prompt | null
}

const PLACEHOLDER = 'press deal to draw a prompt.'

export function PromptCard({ prompt }: PromptCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const text = prompt?.text ?? PLACEHOLDER

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return
    // Reset to CSS-driven size, then shrink until no word overflows its line.
    el.style.fontSize = ''
    const savedOverflow = el.style.overflow
    el.style.overflow = 'hidden'
    let size = parseFloat(getComputedStyle(el).fontSize)
    while (size > 14 && el.scrollWidth > el.clientWidth) {
      size -= 0.5
      el.style.fontSize = `${size}px`
    }
    el.style.overflow = savedOverflow
  }, [text])

  return (
    <article className="prompt-card">
      <div className="prompt-pills">
        <span className="pill pill-deck">{prompt?.label ?? 'Shuffle Sense'}</span>
        {prompt && <span className="pill pill-arch">{prompt.archetype}</span>}
      </div>
      <p className="prompt-text" ref={textRef}>{text}</p>
      <div className="prompt-foot">
        <span className="prompt-brand">Shuffle Sense</span>
      </div>
    </article>
  )
}
