import { RowItem } from "./RowItem.jsx"

export const RowRepeater = ({ schema, rows, onAdd, onRemove, onMove, onUpdate }) => (
  <section className="space-y-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-sm font-semibold uppercase text-muted">
        {schema.label} ({rows.length}/{schema.max})
      </h3>
      <button
        type="button"
        disabled={rows.length >= schema.max}
        onClick={onAdd}
        className="min-h-9 rounded bg-accent px-4 text-sm text-accent-fg disabled:opacity-40"
      >
        Add {schema.itemLabel}
      </button>
    </div>

    {rows.map((row, index) => (
      <RowItem
        key={row.id}
        fields={schema.fields}
        row={row}
        title={`${schema.itemLabel} ${index + 1}`}
        isFirst={index === 0}
        isLast={index === rows.length - 1}
        canRemove={rows.length > schema.min}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onMove={onMove}
      />
    ))}
  </section>
)