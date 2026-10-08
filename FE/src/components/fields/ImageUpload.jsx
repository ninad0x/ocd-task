import { useState } from "react"
import { resizeImage } from "../../utils/resizeImage.js"

export const ImageUpload = ({ field, value, onChange }) => {
  const [error, setError] = useState("")

  const handleFile = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setError("")
      onChange(await resizeImage(file))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept={field.accept === "image" ? "image/*" : field.accept}
        onChange={handleFile}
        className="block w-full text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-2 file:text-accent-fg"
      />
      {error && <p className="text-sm text-danger">{error}</p>}
      {value && (
        <div className="flex items-center gap-3">
          <img src={value.dataUrl} alt="Preview" className="h-24 w-24 rounded border border-line object-cover" />
          <p className="text-xs text-muted">{value.width}×{value.height}px</p>
        </div>
      )}
    </div>
  )
}