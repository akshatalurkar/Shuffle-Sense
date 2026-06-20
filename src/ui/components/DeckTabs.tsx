import type { BinId } from '../../domain/types'
import { bins } from '../../domain/bins'

interface DeckTabsProps {
  order: BinId[]
  active: BinId
  onSelect: (bin: BinId) => void
}

export function DeckTabs({ order, active, onSelect }: DeckTabsProps) {
  return (
    <div className="deck-tabs" role="tablist" aria-label="Question decks">
      {order.map((id) => {
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tab${isActive ? ' tab-active' : ''}`}
            onClick={() => onSelect(id)}
          >
            {bins[id].label}
          </button>
        )
      })}
    </div>
  )
}
