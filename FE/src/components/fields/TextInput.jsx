
export const TextInput = ({ field, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
  />
)