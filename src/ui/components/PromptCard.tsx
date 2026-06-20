import { BrandMark } from './BrandMark'
import type { Prompt } from '../../domain/types'

interface PromptCardProps {
  prompt: Prompt | null
  dealKey: number
}

const PLACEHOLDER = 'Press Deal to draw a prompt.'

// The hero card: deck/archetype pills, question text, footer mark.
export function PromptCard({ prompt, dealKey }: PromptCardProps) {
  return (
    <article className="prompt-card" key={dealKey}>
      <div className="prompt-pills">
        <span className="pill pill-deck">{prompt?.label ?? 'Shuffle Sense'}</span>
        {prompt && <span className="pill pill-arch">{prompt.archetype}</span>}
      </div>
      <p className="prompt-text">{prompt?.text ?? PLACEHOLDER}</p>
      <div className="prompt-foot">
        <BrandMark size={20} />
      </div>
    </article>
  )
}
