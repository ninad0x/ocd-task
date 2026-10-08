import { useState } from "react"

const OTHER = "__other__"

export const SelectInput = ({ field, value, onChange }) => {
  const [isOther, setIsOther] = useState(false)

  const handleSelect = (selected) => {
    if (selected === OTHER) {
      setIsOther(true)
      onChange("")
    } else {
      setIsOther(false)
      onChange(selected)
    }
  }

  return (
    <div className="space-y-2">
      <select
        value={isOther ? OTHER : value}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
      >
        {field.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
        {field.allowOther && <option value={OTHER}>Other...</option>}
      </select>
      {isOther && (
        <input
          type="text"
          value={value}
          placeholder="Specify..."
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
        />
      )}
    </div>
  )
}