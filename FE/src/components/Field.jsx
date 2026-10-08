import { TextInput } from "./fields/TextInput.jsx"
import { TextareaInput } from "./fields/TextareaInput.jsx"
import { SelectInput } from "./fields/SelectInput.jsx"
import { ToggleInput } from "./fields/ToggleInput.jsx"
import { ImageUpload } from "./fields/ImageUpload.jsx"

const inputsByType = {
  text: TextInput,
  textarea: TextareaInput,
  select: SelectInput,
  toggle: ToggleInput,
  file: ImageUpload
}

export const Field = ({ field, value, onChange, error }) => {
  const Input = inputsByType[field.type]
  if (!Input) return null

  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
      <Input field={field} value={value} onChange={onChange} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}