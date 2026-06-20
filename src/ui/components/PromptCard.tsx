import type { Prompt } from '../../domain/types'

interface PromptCardProps {
  prompt: Prompt | null
  dealKey: number
}

const PLACEHOLDER = 'press deal to draw a prompt.'

export function PromptCard({ prompt, dealKey }: PromptCardProps) {
  return (
    <article className="prompt-card" key={dealKey}>
      <div className="prompt-pills">
        <span className="pill pill-deck">{prompt?.label ?? 'Shuffle Sense'}</span>
        {prompt && <span className="pill pill-arch">{prompt.archetype}</span>}
      </div>
      <p className="prompt-text">{prompt?.text ?? PLACEHOLDER}</p>
      <div className="prompt-foot">
        <span className="prompt-brand">Shuffle Sense</span>
      </div>
    </article>
  )
}
