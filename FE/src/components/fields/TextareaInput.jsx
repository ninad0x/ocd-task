
export const TextareaInput = ({ field, value, onChange }) => (
  <div>
    <textarea
      value={value}
      maxLength={field.maxLength}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
    />
    {field.maxLength && (
      <p className="text-right text-xs text-gray-500">
        {value.length}/{field.maxLength}
      </p>
    )}
  </div>
)