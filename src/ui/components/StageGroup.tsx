import { PromptCard } from './PromptCard'
import { HintCard } from './HintCard'
import type { Prompt } from '../../domain/types'

interface StageGroupProps {
  prompt: Prompt | null
  dealKey: number
  hintOpen: boolean
  onToggleHint: () => void
}

export function StageGroup({ prompt, dealKey, hintOpen, onToggleHint }: StageGroupProps) {
  return (
    <div className={`stage-group${hintOpen ? ' open' : ''}`}>
      <HintCard hint={prompt?.hint ?? []} open={hintOpen} onToggle={onToggleHint} />
      <PromptCard prompt={prompt} dealKey={dealKey} />
    </div>
  )
}
