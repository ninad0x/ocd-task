
// fields (blueprint):  image: {type: "file"}, name: {type: "text"}, size: {type: "select", default: "1080x1080"}

// one row (real data): { id: "abc", image: null, name: "", size: "1080x1080" }

import { Field } from "./Field"

const buttonClass =
  "min-h-9 rounded border border-line px-3 text-sm hover:bg-page disabled:opacity-40"

export const RowItem = ({
  fields, row, title, isFirst, isLast, canRemove, onUpdate, onRemove, onMove,
}) => (
  <div className="rounded border border-line bg-surface p-3 sm:p-4">
    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="font-medium">{title}</h4>
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-label="Move up" disabled={isFirst} onClick={() => onMove(row.id, -1)} className={buttonClass}>↑</button>
        <button type="button" aria-label="Move down" disabled={isLast} onClick={() => onMove(row.id, 1)} className={buttonClass}>↓</button>
        <button type="button" disabled={!canRemove} onClick={() => onRemove(row.id)} className={`${buttonClass} text-danger`}>Remove</button>
      </div>
    </div>

    {Object.entries(fields).map(([key, definition]) => (
      <Field
        key={key}
        field={{ key, ...definition }}
        value={row[key]}
        onChange={(value) => onUpdate(row.id, key, value)}
      />
    ))}
  </div>
)