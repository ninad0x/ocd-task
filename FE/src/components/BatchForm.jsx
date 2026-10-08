import { useState } from "react"
import { SettingsPanel } from "./SettingsPanel.jsx"
import { RowRepeater } from "./RowRepeater.jsx"
import { useRows } from "../hooks/useRows.js"
import { buildInitialValues } from "../utils/formValues.js"

export const BatchForm = ({ config }) => {
  const [values, setValues] = useState(() => buildInitialValues(config.settings))
  const { rows, addRow, removeRow, updateRow, moveRow } = useRows(config.rows)

  const handleChange = (key, value) =>
    setValues((previous) => ({ ...previous, [key]: value }))

  return (
    <div className="space-y-8">
      <SettingsPanel schema={config.settings} values={values} onChange={handleChange} />
      <RowRepeater
        schema={config.rows}
        rows={rows}
        onAdd={addRow}
        onRemove={removeRow}
        onMove={moveRow}
        onUpdate={updateRow}
      />
    </div>
  )
}