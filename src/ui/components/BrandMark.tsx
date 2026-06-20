interface BrandMarkProps {
  size?: number
  showWordmark?: boolean
}

// Rounded black square with a smaller white inner square; optional wordmark.
export function BrandMark({ size = 40, showWordmark = true }: BrandMarkProps) {
  return (
    <div className="brand">
      <span
        className="brand-mark"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <span className="brand-mark-inner" />
      </span>
      {showWordmark && <span className="brand-word">Shuffle Sense</span>}
    </div>
  )
}
