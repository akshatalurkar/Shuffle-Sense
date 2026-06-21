import type { Prompt } from '../../domain/types'

interface RecentPromptsPanelProps {
  prompts: Prompt[]
}

export function RecentPromptsPanel({ prompts }: RecentPromptsPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">Recent Prompts</div>
      {prompts.length === 0 ? (
        <p className="panel-empty">No prompts yet.</p>
      ) : (
        <ul className="recent-list">
          {prompts.map((p, i) => (
            <li key={i} className="recent-item">
              {p.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
