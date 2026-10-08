import { useState } from "react"
import { makeRow } from "../utils/formValues"

export const useRows = ({ min, max, fields }) => {
  const [rows, setRows] = useState(() => Array.from({ length: min }, () => makeRow(fields)))

  const addRow = () =>
    setRows((previous) => (previous.length >= max ? previous : [...previous, makeRow(fields)]))

  const removeRow = (id) =>
    setRows((previous) =>
      previous.length <= min ? previous : previous.filter((row) => row.id !== id)
    )

  const updateRow = (id, key, value) =>
    setRows((previous) =>
      previous.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    )

  const moveRow = (id, direction) =>
    setRows((previous) => {
      const index = previous.findIndex((row) => row.id === id)
      const target = index + direction
      if (target < 0 || target >= previous.length) return previous

      const next = [...previous]
      const [moved] = next.splice(index, 1)
      next.splice(target, 0, moved)
      return next
    })

  return { rows, addRow, removeRow, updateRow, moveRow }
}