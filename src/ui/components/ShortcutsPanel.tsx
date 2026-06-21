// Lists the keyboard shortcuts so you can keep your hands off the mouse.
const SHORTCUTS = [
  { label: 'Deal card', key: 'Space' },
  { label: 'Show hint', key: 'H' },
  { label: 'Start timer', key: 'P' },
  { label: 'Stop', key: 'S' },
]

export function ShortcutsPanel() {
  return (
    <div className="panel">
      <div className="panel-title">Shortcuts</div>
      <div className="shortcuts-list">
        {SHORTCUTS.map(({ label, key }) => (
          <div key={key} className="shortcut-row">
            <span className="shortcut-label">{label}</span>
            <kbd className="shortcut-key">{key}</kbd>
          </div>
        ))}
      </div>
    </div>
  )
}
