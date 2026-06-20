import { PromptCard } from './PromptCard'
import { HintCard } from './HintCard'
import type { Prompt } from '../../domain/types'

interface StageGroupProps {
  prompt: Prompt | null
  dealKey: number
  hintOpen: boolean
  onToggleHint: () => void
}

// Composes the hero, two faint backing cards, and the sliding hint card.
export function StageGroup({
  prompt,
  dealKey,
  hintOpen,
  onToggleHint,
}: StageGroupProps) {
  const hint = prompt?.hint ?? ''
  return (
    <div className={`stage-group${hintOpen ? ' open' : ''}`}>
      <HintCard hint={hint} open={hintOpen} onToggle={onToggleHint} />
      <div className="ghost ghost-2" aria-hidden="true" />
      <div className="ghost ghost-1" aria-hidden="true" />
      <PromptCard prompt={prompt} dealKey={dealKey} />
    </div>
  )
}
